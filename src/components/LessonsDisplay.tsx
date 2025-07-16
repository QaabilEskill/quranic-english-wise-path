import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import TextToSpeech from './TextToSpeech';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  level: number;
  category: string;
  is_islamic_themed: boolean;
}

const LessonsDisplay = () => {
  const { userProfile } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('level', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLessonUnlocked = (lessonLevel: number) => {
    return lessonLevel <= (userProfile?.current_level || 1);
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="islamic-card animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setSelectedLesson(null)}
          variant="outline" 
          className="mb-6"
        >
          ← Back to Lessons
        </Button>
        
        <Card className="islamic-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{selectedLesson.title}</CardTitle>
                <CardDescription className="text-lg">{selectedLesson.description}</CardDescription>
                <div className="flex gap-2 mt-4">
                  <Badge variant="default">Level {selectedLesson.level}</Badge>
                  <Badge variant="outline">{selectedLesson.category}</Badge>
                  {selectedLesson.is_islamic_themed && (
                    <Badge variant="secondary">Islamic Content</Badge>
                  )}
                </div>
              </div>
              <TextToSpeech text={selectedLesson.content} size="default" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {selectedLesson.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson) => {
        const unlocked = isLessonUnlocked(lesson.level);
        
        return (
          <Card key={lesson.id} className={`islamic-card ${unlocked ? 'hover:shadow-lg transition-shadow' : 'opacity-60'}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{lesson.title}</span>
                <Badge variant={unlocked ? "default" : "secondary"}>
                  {unlocked ? "Unlocked" : "Locked"}
                </Badge>
              </CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Level {lesson.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>5-10 minutes</span>
                </div>
                {lesson.is_islamic_themed && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <span>🕌 Islamic Content</span>
                  </div>
                )}
              </div>
              <Button 
                className="w-full" 
                variant={unlocked ? "default" : "secondary"}
                disabled={!unlocked}
                onClick={() => unlocked && setSelectedLesson(lesson)}
              >
                {unlocked ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Lesson
                  </>
                ) : (
                  "Locked"
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LessonsDisplay;