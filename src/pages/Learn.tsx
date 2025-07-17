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
import DailyContent from '@/components/DailyContent';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Professional Header */}
      <header className="glass-card border-0 border-b border-border/20 backdrop-blur-xl bg-card/60">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button onClick={handleBack} variant="ghost" size="sm" className="hover:-translate-y-0.5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">QaabilEskill</h1>
                  <p className="text-xs text-muted-foreground">Islamic Learning Platform</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Stats Cards */}
              <div className="flex items-center gap-4">
                <div className="glass-card p-3 bg-yellow-500/10 border-yellow-500/20">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Level</p>
                      <p className="font-bold text-sm">{userProfile?.current_level || 1}</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-3 bg-primary/10 border-primary/20">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Points</p>
                      <p className="font-bold text-sm">{userProfile?.total_points || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Assalamu Alaikum,</p>
                <p className="font-semibold text-foreground">{userProfile?.full_name || user?.email}</p>
              </div>

              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Welcome Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block p-2 rounded-full bg-primary/10 mb-6">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-5xl font-bold mb-4 gradient-text">
            Your Islamic English Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            "Read! In the name of your Lord who created." - Quran 96:1
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Professional Learning Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-5 max-w-4xl w-full">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Stories
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Rankings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-primary">Ask Anything, Practice Speaking</h3>
                  <p className="text-muted-foreground">Practice English speaking with Islamic context. Learn words and just talk – no pressure.</p>
                </div>
              </div>
            </div>
            <AIChatInterface />
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-blue-600">Structured Learning Path</h3>
                  <p className="text-muted-foreground">Follow our carefully designed curriculum with Islamic English lessons.</p>
                </div>
              </div>
            </div>
            <LessonsDisplay />
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-purple-600">Inspiring Islamic Stories</h3>
                  <p className="text-muted-foreground">Learn English through meaningful stories from Islamic history and values.</p>
                </div>
              </div>
            </div>
            <StoriesDisplay />
          </TabsContent>

          {/* Daily Content Tab */}
          <TabsContent value="daily" className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 mb-6">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-orange-600">Daily Spiritual Learning</h3>
                  <p className="text-muted-foreground">Start each day with Quranic verses, Hadith, and Duas in English.</p>
                </div>
              </div>
            </div>
            <DailyContent />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10 mb-6">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-yellow-600">Your Progress = Your Growth</h3>
                  <p className="text-muted-foreground">You're doing great! Learn daily and earn points as you grow in knowledge.</p>
                </div>
              </div>
            </div>
            <LeaderboardComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;