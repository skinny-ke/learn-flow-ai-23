import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  Calculator,
  Calendar,
  CheckCircle,
  GraduationCap,
  Trophy,
  Users,
  Zap,
  Star,
  TrendingUp,
  Shield,
  Smartphone
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Brain,
      title: "AI Study Assistant",
      description: "Get personalized help with explanations, summaries, and practice questions powered by AI.",
      color: "text-accent"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Earn XP, unlock badges, and compete on leaderboards to make learning fun and engaging.",
      color: "text-secondary"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Integrated calendar with AI-powered study reminders and personalized learning paths.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed analytics and performance insights.",
      color: "text-success"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers, join study groups, and learn together in a supportive environment.",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Privacy-first platform designed specifically for students with robust security measures.",
      color: "text-danger"
    }
  ];

  const stats = [
    { label: "Active Students", value: "50K+", icon: Users },
    { label: "Courses Available", value: "200+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Learning Hours", value: "1M+", icon: Brain }
  ];

  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Access to basic courses",
        "5 AI questions per day",
        "Progress tracking",
        "Mobile app access"
      ],
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Student Pro",
      price: "$9.99/month",
      description: "Everything you need to excel",
      features: [
        "Unlimited AI assistance",
        "Advanced analytics",
        "Priority support",
        "Offline content access",
        "Custom study plans",
        "Certificate generation"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Family Plan",
      price: "$19.99/month",
      description: "Perfect for families",
      features: [
        "Up to 5 student accounts",
        "Parent dashboard",
        "Progress monitoring",
        "Bulk course access",
        "Family challenges",
        "Premium support"
      ],
      buttonText: "Choose Family",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                SDG 4 - Quality Education
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Boost Your Learning
                </span>
                <br />
                <span className="text-foreground">Journey Today</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Transform your education with AI-powered learning, gamified experiences, 
                and comprehensive progress tracking. Join thousands of students achieving their academic goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-lg px-8 py-6 shadow-glow"
                >
                  <Link to="/auth/register">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Start Learning Free
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/10"
                >
                  <Link to="#demo">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>30-day free trial</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-3xl shadow-elevated p-8 border"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Math Quiz</h3>
                        <p className="text-sm text-muted-foreground">Algebra Basics</p>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <Zap className="w-3 h-3 mr-1" />
                      +50 XP
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-background/50 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">What is the value of x in: 2x + 5 = 13?</p>
                      <div className="space-y-2">
                        {['x = 3', 'x = 4', 'x = 5', 'x = 6'].map((option, index) => (
                          <div 
                            key={index}
                            className={`p-2 rounded border transition-colors ${
                              index === 1 ? 'bg-success/20 border-success' : 'border-border hover:bg-muted'
                            }`}
                          >
                            <span className="text-sm">{option}</span>
                            {index === 1 && <CheckCircle className="inline w-4 h-4 ml-2 text-success" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-secondary to-secondary-glow text-secondary-foreground px-3 py-2 rounded-full text-sm font-medium shadow-soft"
                >
                  🎉 Perfect Score!
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -bottom-6 -left-4 bg-gradient-to-r from-accent to-accent-glow text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-soft"
                >
                  <Trophy className="inline w-4 h-4 mr-1" />
                  Level Up!
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-primary to-accent w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need to 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with proven educational methodologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-elevated transition-all duration-300 border-border/50 hover:border-primary/20 card-gradient">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Choose Your 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Learning Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade when you're ready. All plans include our core learning features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-secondary to-secondary-glow text-secondary-foreground px-4 py-1 shadow-glow">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full relative ${
                  plan.popular 
                    ? 'border-primary shadow-glow bg-gradient-to-b from-card to-primary/5' 
                    : 'border-border/50 card-gradient'
                }`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent shadow-glow' 
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                      asChild
                    >
                      <Link to="/auth/register">
                        {plan.buttonText}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students already boosting their academic performance with our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-elevated"
                asChild
              >
                <Link to="/auth/register">
                  Start Your Free Trial
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}