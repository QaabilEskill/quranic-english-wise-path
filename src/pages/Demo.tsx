import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Send, ArrowLeft, Lock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Demo = () => {
  const { user, userProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);
  const [messagesUsed, setMessagesUsed] = useState(0);

  useEffect(() => {
    if (userProfile) {
      setMessagesUsed(userProfile.demo_messages_used || 0);
    }
  }, [userProfile]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Add welcome message
    setConversation([
      {
        type: 'ai',
        content: `Assalamu Alaikum! Welcome to QaabiEskill demo! 🕌\n\nI'm your Islamic English tutor. I'll help you learn proper English while incorporating Islamic values and explanations.\n\nTry sending me a message like:\n• "I go mosque"\n• "I want learn Quran"\n• "How I say Alhamdulillah in English?"\n\nYou have ${3 - messagesUsed} demo messages remaining.`
      }
    ]);
  }, [user, navigate, messagesUsed]);

  const getDemoResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Example responses for different types of messages
    if (lowerMessage.includes('mosque') || lowerMessage.includes('masjid')) {
      return `MashAllah! Let me help you with that sentence.\n\n✅ Correct way: "I went to the mosque" or "I am going to the mosque"\n\n🕌 **Islamic Context:**\n• Mosque = Masjid in Arabic\n• MashAllah = "As Allah has willed" (expression of appreciation)\n\n**Grammar tip:** Use past tense "went" for completed actions, present continuous "am going" for ongoing actions.`;
    }
    
    if (lowerMessage.includes('quran') || lowerMessage.includes('read')) {
      return `SubhanAllah! Beautiful intention, brother/sister.\n\n✅ Better way to say: "I want to learn the Quran" or "I am studying the Quran"\n\n📖 **Islamic Context:**\n• SubhanAllah = "Glory be to Allah"\n• The Quran = Al-Quran (the Holy Book)\n\n**Vocabulary tip:** "Learn" for gaining knowledge, "study" for focused reading with understanding.`;
    }
    
    if (lowerMessage.includes('alhamdulillah') || lowerMessage.includes('thank')) {
      return `Alhamdulillah for your question!\n\n✅ You can say: "All praise is due to Allah" or "Thank God"\n\n💚 **Islamic Phrases in English:**\n• Alhamdulillah = "All praise to Allah"\n• Bismillah = "In the name of Allah"\n• InshaAllah = "If Allah wills"\n\n**Cultural tip:** Many Muslims prefer saying the Arabic phrase as it carries deeper spiritual meaning.`;
    }
    
    // General response for other messages
    return `JazakAllahu Khair for your message!\n\n✅ Let me help improve your English: "${userMessage}"\n\nBetter way: I'll provide corrections based on Islamic context and proper grammar.\n\n🌟 **Learning tip:** Practice speaking about daily Islamic activities like:\n• Prayer times (Salah)\n• Reading Quran\n• Going to mosque\n• Islamic greetings\n\n**JazakAllahu Khair** = "May Allah reward you with good"`;
  };

  const handleSendMessage = async () => {
    if (!message.trim() || messagesUsed >= 3 || loading) return;

    setLoading(true);
    
    // Add user message to conversation
    const newConversation = [...conversation, { type: 'user' as const, content: message }];
    setConversation(newConversation);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getDemoResponse(message);
      setConversation(prev => [...prev, { type: 'ai' as const, content: aiResponse }]);
      
      // Update messages used
      const newMessagesUsed = messagesUsed + 1;
      setMessagesUsed(newMessagesUsed);
      
      // Update profile in database (simplified for demo)
      if (newMessagesUsed >= 3) {
        toast({
          title: "Demo Completed!",
          description: "You've used all 3 demo messages. Unlock full access to continue learning!",
        });
      }
      
      setLoading(false);
    }, 1500);

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isMaxMessages = messagesUsed >= 3;

  return (
    <div className="min-h-screen cream-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/dashboard')} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Building className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">QaabiEskill Demo</h1>
            </div>
          </div>
          <Badge variant={isMaxMessages ? "destructive" : "default"}>
            {3 - messagesUsed} messages left
          </Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Demo Info */}
        <Card className="islamic-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Demo Mode - Islamic English Tutor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Experience our AI tutor that helps you learn English through Islamic context. 
              Try asking questions about grammar, Islamic phrases, or daily Muslim life in English.
            </p>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="islamic-card">
          <CardHeader>
            <CardTitle>Chat with AI Tutor</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Conversation */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                      <span className="text-sm text-muted-foreground">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isMaxMessages 
                    ? "Demo completed! Upgrade for unlimited access" 
                    : "Ask me about English grammar with Islamic context..."
                }
                disabled={isMaxMessages || loading}
                className="soft-input"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isMaxMessages || loading}
                className="islamic-button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Lock Message */}
            {isMaxMessages && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h4 className="font-medium mb-2">Demo Completed!</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  You've experienced our Islamic English tutor! Unlock full access for unlimited conversations,
                  lessons, quizzes, and more Islamic learning content.
                </p>
                <Button onClick={() => navigate('/payment')} className="islamic-button">
                  Unlock Full Access - ₹500
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Example Messages */}
        <Card className="islamic-card mt-6">
          <CardHeader>
            <CardTitle>Try These Example Messages:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Grammar Help:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "I go mosque every Friday"</li>
                  <li>• "How I say good morning Islamic way?"</li>
                  <li>• "I want learn Arabic language"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Islamic Phrases:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "What means Alhamdulillah?"</li>
                  <li>• "How to say Bismillah in English?"</li>
                  <li>• "Explain MashAllah meaning"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;