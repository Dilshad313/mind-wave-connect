import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain,
  Calendar,
  MessageCircle,
  TrendingUp,
  Shield,
  Heart,
  Star,
  ChevronRight,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Track your emotional patterns with empathetic AI that understands and supports your journey.",
    },
    {
      icon: Calendar,
      title: "Book Licensed Professionals",
      description: "Connect with verified therapists and schedule secure video sessions at your convenience.",
    },
    {
      icon: MessageCircle,
      title: "24/7 Chat Support",
      description: "Access supportive AI conversations anytime you need someone to talk to about how you're feeling.",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visualize your mental health journey with beautiful charts that reveal patterns and growth.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Teacher",
      content: "MindWave helped me recognize patterns in my anxiety I never noticed before. The AI chat feels genuinely supportive.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "Being able to book therapy sessions so easily and track my mood daily has been transformative for my mental health.",
      rating: 5,
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Clinical Psychologist",
      content: "As a mental health professional, I'm impressed by how thoughtfully MindWave balances AI support with human care.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Empowering Minds Through AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your Journey to Better Mental Well-Being Starts Here
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Track your emotions, connect with licensed professionals, and access AI-powered support anytime. 
              You're not alone in this journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-glow"
              >
                Get Started Free
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/features")}
              >
                Explore Features
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              🔒 Privacy-first platform • HIPAA-compliant practices • No commitment required
            </p>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Support Your Mental Health
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Evidence-informed tools designed to help you understand your emotions and connect with professional care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover-lift bg-card border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Built on Trust, Privacy, and Professional Care
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Privacy-First AI</h3>
                    <p className="text-sm text-muted-foreground">
                      Your conversations are encrypted and never shared. We follow HIPAA-compliant practices to protect your data.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Evidence-Based Approach</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI provides supportive guidance while always encouraging professional help for serious concerns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Licensed Professionals</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with verified therapists and psychiatrists who are here to support your journey to wellness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-soft" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white shadow-lifted flex items-center justify-center">
                    <Heart className="w-10 h-10 text-primary fill-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">Your well-being matters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Thousands on Their Wellness Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Real stories from people who found support through MindWave
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-card border-border/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands who are taking control of their mental health with AI-powered insights and professional support.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-glow"
          >
            Get Started Now
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
