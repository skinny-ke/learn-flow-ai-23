import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Brain,
  Calendar,
  Clock,
  Flame,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
        <Button asChild>
          <a href="/auth/login">Sign In</a>
        </Button>
      </div>
    );
  }

  const subjects = [
    { name: "Mathematics", progress: 85, nextLesson: "Calculus Basics", color: "bg-blue-500" },
    { name: "Science", progress: 72, nextLesson: "Chemical Reactions", color: "bg-green-500" },
    { name: "English", progress: 91, nextLesson: "Creative Writing", color: "bg-purple-500" },
    { name: "History", progress: 68, nextLesson: "World War II", color: "bg-orange-500" }
  ];

  const recentQuizzes = [
    { title: "Algebra Quiz", score: 95, subject: "Mathematics", date: "Today", xp: 50 },
    { title: "Chemistry Basics", score: 88, subject: "Science", date: "Yesterday", xp: 45 },
    { title: "Grammar Test", score: 92, subject: "English", date: "2 days ago", xp: 48 }
  ];

  const achievements = [
    { title: "First Quiz Master", description: "Complete your first quiz with 100%", earned: true, icon: "🏆" },
    { title: "Week Warrior", description: "Study for 7 consecutive days", earned: true, icon: "🔥" },
    { title: "Math Genius", description: "Score 90%+ on 5 math quizzes", earned: false, icon: "🧮" },
    { title: "Speed Learner", description: "Complete 10 lessons in one day", earned: false, icon: "⚡" }
  ];

  const todayTip = "Remember to take breaks every 25 minutes while studying. Your brain needs rest to process and retain information effectively!";

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-white/90 text-lg">
              You're on a {user.streak}-day learning streak! Keep it up!
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">{user.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">Level {user.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">{user.streak} Day Streak</span>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <Star className="h-5 w-5" />
              Today's Learning Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{todayTip}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Courses", value: subjects.length, icon: BookOpen, color: "text-primary" },
          { label: "Quizzes Taken", value: 42, icon: Brain, color: "text-accent" },
          { label: "Study Hours", value: 127, icon: Clock, color: "text-secondary" },
          { label: "Achievements", value: user.badges.length, icon: Trophy, color: "text-success" }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="text-center hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-6">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Subject Progress
              </CardTitle>
              <CardDescription>Your learning progress across all subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjects.map((subject, index) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Next: {subject.nextLesson}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Quizzes
              </CardTitle>
              <CardDescription>Your latest quiz attempts and scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentQuizzes.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="flex-1">
                    <h4 className="font-medium">{quiz.title}</h4>
                    <p className="text-sm text-muted-foreground">{quiz.subject} • {quiz.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      {quiz.score}%
                    </Badge>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                      +{quiz.xp} XP
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your learning milestones and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    achievement.earned
                      ? "bg-gradient-to-r from-success/10 to-success/5 border-success/20 shadow-success"
                      : "bg-muted/30 border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? "text-success" : "text-muted-foreground"}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="mt-2 bg-success text-success-foreground">
                          Earned!
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Start Quiz", href: "/quiz", icon: Brain, color: "from-primary to-primary-glow" },
          { label: "Browse Subjects", href: "/subjects", icon: BookOpen, color: "from-accent to-accent-glow" },
          { label: "View Calendar", href: "/calendar", icon: Calendar, color: "from-secondary to-secondary-glow" },
          { label: "Study Groups", href: "/groups", icon: Users, color: "from-success to-success-glow" }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              asChild
              className={`h-auto p-6 flex flex-col items-center gap-2 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 shadow-soft`}
            >
              <a href={action.href}>
                <Icon className="h-8 w-8" />
                <span>{action.label}</span>
              </a>
            </Button>
          );
        })}
      </motion.div>
    </div>
  );
}