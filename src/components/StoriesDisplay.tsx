import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import TextToSpeech from './TextToSpeech';

interface Story {
  id: string;
  title: string;
  content: string;
  level: string;
  moral_lesson: string;
  vocabulary_focus: string[];
}

const StoriesDisplay = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const { data, error } = await supabase
        .from('islamic_stories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="islamic-card animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded"></div>
              <div className="flex gap-2 mt-2">
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (selectedStory) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setSelectedStory(null)}
          variant="outline" 
          className="mb-6"
        >
          ← Back to Stories
        </Button>
        
        <Card className="islamic-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{selectedStory.title}</CardTitle>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">{selectedStory.level}</Badge>
                  <Badge variant="secondary">
                    <Heart className="w-3 h-3 mr-1" />
                    Moral Story
                  </Badge>
                </div>
              </div>
              <TextToSpeech text={selectedStory.content} size="default" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {selectedStory.content}
              </p>
            </div>
            
            {selectedStory.moral_lesson && (
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Moral Lesson
                </h4>
                <p className="text-sm">{selectedStory.moral_lesson}</p>
              </div>
            )}
            
            {selectedStory.vocabulary_focus && selectedStory.vocabulary_focus.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Key Vocabulary
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStory.vocabulary_focus.map((word, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">Learn English with Islamic Stories</h3>
        <p className="text-muted-foreground">Beautiful stories with moral lessons in simple English</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="islamic-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{story.title}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline">{story.level}</Badge>
                <Badge variant="secondary">5-8 min read</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                {story.content.substring(0, 150)}...
              </p>
              
              {story.vocabulary_focus && story.vocabulary_focus.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Key words:</p>
                  <div className="flex flex-wrap gap-1">
                    {story.vocabulary_focus.slice(0, 4).map((word, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {word}
                      </Badge>
                    ))}
                    {story.vocabulary_focus.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{story.vocabulary_focus.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full islamic-button"
                onClick={() => setSelectedStory(story)}
              >
                <Play className="w-4 h-4 mr-2" />
                Read Story
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoriesDisplay;