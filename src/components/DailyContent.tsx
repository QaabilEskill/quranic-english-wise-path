import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import TextToSpeech from './TextToSpeech';

interface Hadith {
  id: string;
  hadith_text: string;
  translation: string;
  source: string;
  explanation: string;
}

interface Dua {
  id: string;
  arabic_text: string;
  english_translation: string;
  transliteration: string;
  category: string;
  occasion: string;
}

const DailyContent = () => {
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);
  const [dailyDua, setDailyDua] = useState<Dua | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyContent();
  }, []);

  const loadDailyContent = async () => {
    try {
      // Get a random hadith (simulating daily hadith)
      const { data: hadithData } = await supabase
        .from('daily_hadith')
        .select('*')
        .limit(1)
        .single();

      // Get a random dua
      const { data: duaData } = await supabase
        .from('duas')
        .select('*')
        .eq('category', 'daily')
        .limit(1)
        .single();

      setDailyHadith(hadithData);
      setDailyDua(duaData);
    } catch (error) {
      console.error('Error loading daily content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="islamic-card animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="islamic-card animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Daily Hadith */}
      <Card className="islamic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Daily Hadith
          </CardTitle>
          <CardDescription>Learn English through daily Hadith study</CardDescription>
        </CardHeader>
        <CardContent>
          {dailyHadith ? (
            <div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm italic flex-1">
                    "{dailyHadith.translation}"
                  </p>
                  <TextToSpeech text={dailyHadith.translation} />
                </div>
                {dailyHadith.source && (
                  <p className="text-xs text-muted-foreground">- {dailyHadith.source}</p>
                )}
              </div>
              {dailyHadith.explanation && (
                <div className="bg-primary/10 rounded-lg p-3 mb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm mb-1">Explanation:</h5>
                      <p className="text-xs text-muted-foreground">{dailyHadith.explanation}</p>
                    </div>
                    <TextToSpeech text={dailyHadith.explanation} />
                  </div>
                </div>
              )}
              <Button className="w-full islamic-button" onClick={loadDailyContent}>
                <BookOpen className="w-4 h-4 mr-2" />
                Get Another Hadith
              </Button>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm italic mb-2">
                "The believer is not one who eats his fill while his neighbor goes hungry."
              </p>
              <p className="text-xs text-muted-foreground">- Prophet Muhammad (SAW)</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Duas */}
      <Card className="islamic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Daily Duas
          </CardTitle>
          <CardDescription>Practice English through Islamic supplications</CardDescription>
        </CardHeader>
        <CardContent>
          {dailyDua ? (
            <div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm mb-2 arabic-text flex-1">{dailyDua.arabic_text}</p>
                  <TextToSpeech text={dailyDua.english_translation} />
                </div>
                {dailyDua.transliteration && (
                  <p className="text-xs italic text-muted-foreground mb-2">
                    {dailyDua.transliteration}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  "{dailyDua.english_translation}"
                </p>
                {dailyDua.occasion && (
                  <p className="text-xs text-primary mt-2">
                    Occasion: {dailyDua.occasion}
                  </p>
                )}
              </div>
              <Button className="w-full islamic-button" onClick={loadDailyContent}>
                <Heart className="w-4 h-4 mr-2" />
                Get Another Dua
              </Button>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm mb-2 arabic-text">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً</p>
              <p className="text-xs text-muted-foreground">
                "Our Lord, give us good in this world..."
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyContent;