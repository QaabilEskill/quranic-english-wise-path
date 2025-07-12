import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, BookOpen, Heart, Play, CreditCard, LogOut, Star, Trophy, Users } from 'lucide-react';

const Dashboard = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleStartDemo = () => {
    navigate('/demo');
  };

  const handlePayment = () => {
    navigate('/payment');
  };

  const handleFullAccess = () => {
    navigate('/learn');
  };

  return (
    <div className="min-h-screen cream-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">QaabiEskill</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Assalamu Alaikum,</p>
              <p className="font-medium">{userProfile?.full_name || user?.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Welcome to Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            "And Allah has extracted you from the wombs of your mothers not knowing a thing,<br />
            and He made for you hearing and vision and intellect that perhaps you would be grateful."
          </p>
          <p className="text-sm italic text-muted-foreground">- Quran 16:78</p>
        </div>

        {/* User Status */}
        <div className="flex justify-center mb-8">
          <Card className="islamic-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Level {userProfile?.current_level || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-medium">{userProfile?.total_points || 0} Points</span>
              </div>
              <Badge variant={userProfile?.has_paid_access ? "default" : "secondary"}>
                {userProfile?.has_paid_access ? "Premium Member" : "Free Trial"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Demo Card */}
          <Card className="islamic-card hover:glow-effect transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Try Our Demo</CardTitle>
              <CardDescription className="text-lg">
                Experience 3 free AI conversations to see how our Islamic English tutor works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">What you'll get:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 3 free AI conversations</li>
                  <li>• Islamic English corrections</li>
                  <li>• Arabic phrase explanations</li>
                  <li>• Preview of our teaching style</li>
                </ul>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Messages used: {userProfile?.demo_messages_used || 0} / 3
                </p>
                <Button 
                  onClick={handleStartDemo} 
                  className="w-full islamic-button"
                  disabled={userProfile?.demo_messages_used >= 3}
                >
                  {userProfile?.demo_messages_used >= 3 ? 'Demo Completed' : 'Start Demo'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment/Access Card */}
          <Card className="islamic-card hover:glow-effect transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 sky-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                {userProfile?.has_paid_access ? (
                  <Users className="w-8 h-8 text-white" />
                ) : (
                  <CreditCard className="w-8 h-8 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {userProfile?.has_paid_access ? 'Full Access' : 'Unlock Full Access'}
              </CardTitle>
              <CardDescription className="text-lg">
                {userProfile?.has_paid_access 
                  ? 'Welcome to the complete QaabiEskill experience'
                  : 'Get unlimited access to all our Islamic English learning features'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">
                  {userProfile?.has_paid_access ? 'You have access to:' : 'Full access includes:'}
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Unlimited AI conversations</li>
                  <li>• Islamic vocabulary lessons</li>
                  <li>• 10-level quiz system</li>
                  <li>• 100+ Islamic stories</li>
                  <li>• Daily Hadith & Duas</li>
                  <li>• Leaderboard & progress tracking</li>
                </ul>
              </div>
              <div className="text-center">
                {userProfile?.has_paid_access ? (
                  <Button onClick={handleFullAccess} className="w-full islamic-button">
                    Start Learning
                  </Button>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-primary mb-4">₹500</p>
                    <Button onClick={handlePayment} className="w-full islamic-button">
                      Make Payment
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Islamic Quote */}
        <div className="text-center mt-12">
          <div className="bg-white/60 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-2">
              "And say: My Lord, increase me in knowledge."
            </p>
            <p className="text-sm italic text-muted-foreground">
              - Quran 20:114
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">
            Why Choose QaabiEskill?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Islamic Integration</h4>
              <p className="text-sm text-muted-foreground">
                Learn English through Islamic values, stories, and everyday situations
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Personalized Learning</h4>
              <p className="text-sm text-muted-foreground">
                AI tutor adapts to your level and provides Islamic context for better understanding
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Community Driven</h4>
              <p className="text-sm text-muted-foreground">
                Join a community of Muslims learning English together with Islamic values
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;