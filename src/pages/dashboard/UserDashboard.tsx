import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Calendar,
  MessageCircle,
  Heart,
  BookOpen,
  Settings,
  TrendingUp,
  Smile,
  Video,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<string>("calm");

  const sidebarItems = [
    { icon: Home, label: "Home", path: "/dashboard/user" },
    { icon: Calendar, label: "My Appointments", path: "/dashboard/user/appointments" },
    { icon: MessageCircle, label: "AI Chatbot", path: "/dashboard/user/chat" },
    { icon: Heart, label: "Mood Tracker", path: "/dashboard/user/mood" },
    { icon: BookOpen, label: "Resources", path: "/dashboard/user/resources" },
    { icon: Settings, label: "Settings", path: "/dashboard/user/settings" },
  ];

  const moodColors: Record<string, string> = {
    calm: "bg-[hsl(197,92%,81%)]",
    anxious: "bg-[hsl(48,96%,76%)]",
    low: "bg-[hsl(0,93%,84%)]",
    happy: "bg-[hsl(142,76%,80%)]",
    neutral: "bg-[hsl(220,14%,92%)]",
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-muted/30 p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MindWave
          </span>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/auth")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">
              How are you feeling today? Let's check in on your well-being journey.
            </p>
          </div>

          {/* Current Mood Badge */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Mood</p>
                <div className="flex items-center gap-3">
                  <Badge className={`${moodColors[currentMood]} text-foreground border-0 text-base px-4 py-1`}>
                    <Smile className="w-4 h-4 mr-2" />
                    {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    7-day streak 🔥
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update Mood
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/dashboard/user/appointments")}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Next Appointment</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Dr. Emily Chen - Tomorrow, 2:00 PM
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Video className="w-4 h-4 mr-2" />
                Join Session
              </Button>
            </Card>

            <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/dashboard/user/chat")}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">AI Chat Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Available 24/7 for supportive conversations
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Start Chat
              </Button>
            </Card>

            <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/dashboard/user/mood")}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Mood Trends</h3>
              <p className="text-sm text-muted-foreground mb-3">
                View your emotional patterns over time
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Card>
          </div>

          {/* Weekly Progress */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Weekly Progress</h3>
              <Button variant="ghost" size="sm">View Details</Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Mood Entries</span>
                  <span className="font-medium">5 / 7 days</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Therapy Sessions</span>
                  <span className="font-medium">2 / 2 scheduled</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Mindfulness Minutes</span>
                  <span className="font-medium">45 / 60 min</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Recent Insights */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Insights</h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Positive Trend</p>
                  <p className="text-xs text-muted-foreground">
                    Your mood has been steadily improving over the past week. Great progress!
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <Smile className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Pattern Detected</p>
                  <p className="text-xs text-muted-foreground">
                    You tend to feel calmer after your morning meditation sessions.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
