
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TextToSpeechProps {
  text: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, size = 'sm', variant = 'ghost' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const playText = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Use browser's built-in speech synthesis as fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          toast({
            title: "Speech Error",
            description: "Failed to play text using browser speech synthesis",
            variant: "destructive"
          });
        };
        
        speechSynthesis.speak(utterance);
      } else {
        toast({
          title: "Not Supported",
          description: "Text-to-speech is not supported in your browser",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error playing text:', error);
      toast({
        title: "Error",
        description: "Failed to convert text to speech",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={playText}
      variant={variant}
      size={size}
      disabled={isLoading || isPlaying}
      className="p-1 h-auto"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </Button>
  );
};

export default TextToSpeech;
