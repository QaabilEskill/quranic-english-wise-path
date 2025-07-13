import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
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

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are an Islamic English tutor AI assistant. Your role is to:
1. Help users improve their English language skills
2. Provide corrections and explanations for grammar, vocabulary, and pronunciation
3. Explain Islamic/Arabic terms and phrases in English
4. Use Islamic context and examples when teaching English
5. Be respectful, patient, and encouraging
6. Provide Quranic verses or Hadith translations when relevant
7. Help with Islamic vocabulary and phrases

Always respond in a helpful, educational manner while maintaining Islamic values and etiquette.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

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