import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import TextToSpeech from './TextToSpeech';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChatInterface = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingDemoMessages, setRemainingDemoMessages] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history
    loadChatHistory();
    // Set initial demo messages count
    if (!userProfile?.has_paid_access) {
      setRemainingDemoMessages(Math.max(0, 5 - (userProfile?.demo_messages_used || 0)));
    }
  }, [userProfile]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_type', 'ai_tutor')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      const formattedMessages: Message[] = [];
      data?.forEach(record => {
        formattedMessages.push({
          role: 'user',
          content: record.message,
          timestamp: new Date(record.created_at!)
        });
        formattedMessages.push({
          role: 'assistant',
          content: record.response,
          timestamp: new Date(record.created_at!)
        });
      });

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading || !user) return;

    // Check demo limit
    if (!userProfile?.has_paid_access && (remainingDemoMessages === 0)) {
      toast({
        title: "Demo Limit Reached",
        description: "Please upgrade to continue chatting with the AI tutor.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const response = await fetch(
        `https://zixdilsnjchnyreybyqu.supabase.co/functions/v1/ai-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            message: currentMessage,
            conversationHistory: messages.slice(-10) // Send last 10 messages for context
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a few minutes and try again.');
        }
        throw new Error(data.error || 'Failed to get AI response');
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update remaining demo messages
      if (data.remainingDemoMessages !== null) {
        setRemainingDemoMessages(data.remainingDemoMessages);
      }

      toast({
        title: "Message sent",
        description: "AI tutor has responded to your message.",
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isPaidUser = userProfile?.has_paid_access;
  const canSendMessage = isPaidUser || (remainingDemoMessages || 0) > 0;

  return (
    <Card className="islamic-card h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            AI Islamic English Tutor
          </div>
          {!isPaidUser && (
            <Badge variant="outline">
              {remainingDemoMessages} demo messages left
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Assalamu Alaikum! Welcome to QaabilEskill AI Tutor!</h3>
              <p className="text-muted-foreground">
                Ask questions about English grammar, Islamic vocabulary, or practice conversations. All responses include voice playback!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm whitespace-pre-wrap flex-1">{message.content}</p>
                      {message.role === 'assistant' && (
                        <TextToSpeech text={message.content} />
                      )}
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t">
          {!canSendMessage ? (
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Demo limit reached. Upgrade to continue chatting!
              </p>
              <Button variant="outline" size="sm">
                Upgrade Now
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about English grammar, Islamic vocabulary, or practice conversation..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !currentMessage.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;