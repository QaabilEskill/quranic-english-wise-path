import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, BookOpen, Users, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen cream-gradient">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Welcome to QaabilEskill
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn to Speak English – the Islamic Way. Master English conversation skills 
            through interactive AI practice and structured lessons.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/auth">
              <Button size="lg" className="islamic-button">
                Start Learning Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="islamic-card text-center">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>AI Practice Buddy</CardTitle>
              <CardDescription>
                Practice English conversation with our Islamic AI tutor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Chat with AI in real-time and improve your speaking confidence
              </p>
            </CardContent>
          </Card>

          <Card className="islamic-card text-center">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Structured Lessons</CardTitle>
              <CardDescription>
                30-day learning program with instructor's voice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn English step-by-step with Islamic context
              </p>
            </CardContent>
          </Card>

          <Card className="islamic-card text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>1:1 Faculty Classes</CardTitle>
              <CardDescription>
                Premium one-on-one sessions with top instructors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get personalized guidance from expert faculty members
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-muted-foreground">Create your account and start your journey</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Practice with AI</h3>
              <p className="text-sm text-muted-foreground">Chat with our AI tutor and build confidence</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Take Lessons</h3>
              <p className="text-sm text-muted-foreground">Follow structured learning modules</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Level Up</h3>
              <p className="text-sm text-muted-foreground">Earn points and climb the leaderboard</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of learners who are improving their English the Islamic way
          </p>
          <Link to="/auth">
            <Button size="lg" className="islamic-button">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
