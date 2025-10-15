import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import { Heart, User, Stethoscope, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { connectToDatabase } from "@/lib/mongodb";

type UserRole = "user" | "doctor" | "hospital_admin";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    
    // Navigate based on role
    const dashboardRoutes = {
      user: "/dashboard/user",
      doctor: "/dashboard/doctor",
      hospital_admin: "/dashboard/hospital",
    };
    
    navigate(dashboardRoutes[role]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 gradient-hero">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Info */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  MindWave
                </span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Your Mental Well-Being Journey Starts Here
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands who trust MindWave for compassionate AI support, professional therapy connections, 
                and meaningful progress tracking.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Privacy-First Platform</h3>
                    <p className="text-sm text-muted-foreground">Your data is encrypted and never shared</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Licensed Professionals</h3>
                    <p className="text-sm text-muted-foreground">Connect with verified therapists</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hospital Partnerships</h3>
                    <p className="text-sm text-muted-foreground">Trusted by leading healthcare providers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth Form */}
            <Card className="p-8 shadow-soft">
              <Tabs value={isLogin ? "login" : "register"} onValueChange={(v) => setIsLogin(v === "login")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>I am a...</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={role === "user" ? "default" : "outline"}
                          onClick={() => setRole("user")}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <User className="w-5 h-5" />
                          <span className="text-xs">User</span>
                        </Button>
                        <Button
                          type="button"
                          variant={role === "doctor" ? "default" : "outline"}
                          onClick={() => setRole("doctor")}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <Stethoscope className="w-5 h-5" />
                          <span className="text-xs">Doctor</span>
                        </Button>
                        <Button
                          type="button"
                          variant={role === "hospital_admin" ? "default" : "outline"}
                          onClick={() => setRole("hospital_admin")}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <Building2 className="w-5 h-5" />
                          <span className="text-xs">Hospital</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                      Login
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      <button type="button" className="text-primary hover:underline">
                        Forgot password?
                      </button>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>I am a...</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={role === "user" ? "default" : "outline"}
                          onClick={() => setRole("user")}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <User className="w-5 h-5" />
                          <span className="text-xs">User</span>
                        </Button>
                        <Button
                          type="button"
                          variant={role === "doctor" ? "default" : "outline"}
                          onClick={() => setRole("doctor")}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <Stethoscope className="w-5 h-5" />
                          <span className="text-xs">Doctor</span>
                        </Button>
                        <Button
                          type="button"
                          variant={role === "hospital_admin" ? "default" : "outline"}
                          onClick={() => setRole("hospital_admin")}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <Building2 className="w-5 h-5" />
                          <span className="text-xs">Hospital</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                      Create Account
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By registering, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
