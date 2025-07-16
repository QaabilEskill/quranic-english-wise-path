import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AIChatInterface from '@/components/AIChatInterface';
import LeaderboardComponent from '@/components/LeaderboardComponent';
import LessonsDisplay from '@/components/LessonsDisplay';
import StoriesDisplay from '@/components/StoriesDisplay';
import { 
  Building, 
  MessageCircle, 
  BookOpen, 
  Trophy, 
  Calendar,
  Heart,
  Users,
  Star,
  ArrowLeft,
  Play,
  Clock,
  CheckCircle
} from 'lucide-react';

const Learn = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen cream-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={handleBack} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Building className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">QaabilEskill</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Level {userProfile?.current_level || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-medium">{userProfile?.total_points || 0} Points</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Assalamu Alaikum,</p>
              <p className="font-medium">{userProfile?.full_name || user?.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Your Islamic English Learning Journey
          </h2>
          <p className="text-muted-foreground">
            "Read! In the name of your Lord who created." - Quran 96:1
          </p>
        </div>

        {/* Learning Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="daily">Daily Content</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">Ask Anything, Practice Speaking</h3>
              <p className="text-muted-foreground">Practice English speaking with Islamic context.<br />Learn words and just talk – no pressure.</p>
            </div>
            <AIChatInterface />
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <LessonsDisplay />
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <StoriesDisplay />
          </TabsContent>

          {/* Daily Content Tab */}
          <TabsContent value="daily" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Daily Hadith
                  </CardTitle>
                  <CardDescription>Learn English through daily Hadith study</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm italic mb-2">
                      "The believer is not one who eats his fill while his neighbor goes hungry."
                    </p>
                    <p className="text-xs text-muted-foreground">- Prophet Muhammad (SAW)</p>
                  </div>
                  <Button className="w-full islamic-button">
                    View Today's Hadith
                  </Button>
                </CardContent>
              </Card>

              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    Daily Duas
                  </CardTitle>
                  <CardDescription>Practice English through Islamic supplications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm mb-2 arabic-text">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً</p>
                    <p className="text-xs text-muted-foreground">
                      "Our Lord, give us good in this world..."
                    </p>
                  </div>
                  <Button className="w-full islamic-button">
                    Learn Today's Dua
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">Your Progress = Your Growth</h3>
              <p className="text-muted-foreground">You're doing great! Learn daily and earn points as you grow.</p>
            </div>
            <LeaderboardComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;