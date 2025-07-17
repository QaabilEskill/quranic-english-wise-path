
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate Gemini API key
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { message, conversationHistory } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    // Check if user has paid access or demo messages left
    const { data: profile } = await supabase
      .from('profiles')
      .select('has_paid_access, demo_messages_used')
      .eq('user_id', user.id)
      .single();

    if (!profile?.has_paid_access && (profile?.demo_messages_used || 0) >= 5) {
      return new Response(JSON.stringify({ 
        error: 'Demo limit reached. Please upgrade to continue chatting.' 
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare conversation context for Gemini
    let conversationText = `You are an Islamic English tutor AI assistant. Your role is to:
1. Help users improve their English language skills
2. Provide corrections and explanations for grammar, vocabulary, and pronunciation
3. Explain Islamic/Arabic terms and phrases in English
4. Use Islamic context and examples when teaching English
5. Be respectful, patient, and encouraging
6. Provide Quranic verses or Hadith translations when relevant
7. Help with Islamic vocabulary and phrases

Always respond in a helpful, educational manner while maintaining Islamic values and etiquette.\n\n`;

    // Add conversation history
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: any) => {
        if (msg.role === 'user') {
          conversationText += `User: ${msg.content}\n`;
        } else {
          conversationText += `Assistant: ${msg.content}\n`;
        }
      });
    }

    // Add current message
    conversationText += `User: ${message}\nAssistant: `;

    console.log('Sending request to Gemini API...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: conversationText
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', response.status, response.statusText, errorData);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a few minutes.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else if (response.status === 401 || response.status === 403) {
        return new Response(JSON.stringify({ 
          error: 'Invalid API key. Please check your Gemini API configuration.' 
        }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ 
          error: `Gemini API error: ${errorData.error?.message || response.statusText}` 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const data = await response.json();
    console.log('Gemini API Response:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Invalid response structure from Gemini API:', data);
      throw new Error('Invalid response from Gemini API');
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Save conversation to database
    await supabase
      .from('chat_history')
      .insert({
        user_id: user.id,
        message: message,
        response: aiResponse,
        session_type: 'ai_tutor'
      });

    // Update demo messages count if not paid user
    if (!profile?.has_paid_access) {
      await supabase
        .from('profiles')
        .update({ 
          demo_messages_used: (profile?.demo_messages_used || 0) + 1 
        })
        .eq('user_id', user.id);
    }

    console.log('Successfully processed chat request');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      remainingDemoMessages: profile?.has_paid_access ? null : Math.max(0, 5 - ((profile?.demo_messages_used || 0) + 1))
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
