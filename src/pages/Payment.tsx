import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, ArrowLeft, CreditCard, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setScreenshot(file);
    }
  };

  const handleSubmitPayment = async () => {
    if (!screenshot) {
      toast({
        title: "Screenshot Required",
        description: "Please upload a payment screenshot before submitting",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Payment Screenshot Submitted!",
        description: "We'll verify your payment within 24 hours and activate your account. You'll receive an email confirmation.",
      });
      setUploading(false);
      navigate('/dashboard');
    }, 2000);
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

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
              <h1 className="text-xl font-bold text-primary">QaabilEskill Payment</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Instructions */}
          <div className="space-y-6">
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="bg-muted/50 rounded-lg p-6 mb-4">
                    <h3 className="text-2xl font-bold text-primary mb-2">₹500</h3>
                    <p className="text-sm text-muted-foreground">One-time payment for lifetime access</p>
                  </div>
                  
                  {/* QR Code Placeholder */}
                  <div className="bg-white p-6 rounded-lg border-2 border-dashed border-border">
                    <div className="w-48 h-48 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">QR Code</p>
                        <p className="text-xs text-muted-foreground">Scan to Pay ₹500</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code with any UPI app to make payment
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Payment Methods Accepted:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      UPI (Google Pay, PhonePe, Paytm)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Bank Transfer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Credit/Debit Card
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2">What you get:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Unlimited AI conversations</li>
                    <li>• Islamic vocabulary lessons</li>
                    <li>• 10-level quiz system</li>
                    <li>• 100+ Islamic stories</li>
                    <li>• Daily Hadith & Duas in English</li>
                    <li>• Progress tracking & leaderboard</li>
                    <li>• Lifetime access (no subscription)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle>Need Help with Payment?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">WhatsApp Support</p>
                      <p className="text-sm text-muted-foreground">Quick help via WhatsApp</p>
                    </div>
                  </a>
                  
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">+91 12345 67890</p>
                    </div>
                  </a>
                  
                  <a
                    href="mailto:support@qaabileskill.com"
                    className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@qaabileskill.com</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Screenshot */}
          <div>
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle>Upload Payment Screenshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-screenshot">Payment Screenshot *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a clear screenshot of your payment confirmation
                    </p>
                    <Input
                      id="payment-screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="soft-input"
                    />
                  </div>

                  {screenshot && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">File selected: {screenshot.name}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Make payment of ₹500 using the QR code above</li>
                      <li>Take a screenshot of the payment confirmation</li>
                      <li>Upload the screenshot using the button above</li>
                      <li>Click "Submit Payment Proof" button</li>
                      <li>We'll verify and activate your account within 24 hours</li>
                    </ol>
                  </div>

                  <Button
                    onClick={handleSubmitPayment}
                    disabled={!screenshot || uploading}
                    className="w-full islamic-button"
                  >
                    {uploading ? 'Submitting...' : 'Submit Payment Proof'}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      By proceeding, you agree to our terms of service and privacy policy.
                    </p>
                  </div>
                </div>

                {/* Success Message Placeholder */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2">After Payment Verification:</h4>
                  <ul className="space-y-1 text-sm text-primary/80">
                    <li>• Email confirmation will be sent</li>
                    <li>• Your account will be upgraded to Premium</li>
                    <li>• All features will be unlocked immediately</li>
                    <li>• You can start learning right away!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="text-center mt-12">
          <div className="bg-white/60 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-2">
              "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect."
            </p>
            <p className="text-sm italic text-muted-foreground">
              - Quran 65:2-3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;