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
  Zap,
  BarChart3,
  GraduationCap,
  FileText
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SubjectProgress {
  id: string;
  subject_name: string;
  progress: number;
  total_time_minutes: number;
}

interface QuizResult {
  id: string;
  score: number;
  total_questions: number;
  subject: string;
  completed_at: string;
  time_taken_seconds: number;
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
  is_published: boolean;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
  const [teacherQuizzes, setTeacherQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);

      // Fetch subject progress
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subject_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (subjectsError) throw subjectsError;
      setSubjects(subjectsData || []);

      // Fetch recent quiz results
      const { data: quizzesData, error: quizzesError } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (quizzesError) throw quizzesError;
      setRecentQuizzes(quizzesData || []);

      // Fetch teacher's quizzes if teacher/admin
      if (user.role === 'teacher' || user.role === 'admin') {
        const { data: teacherQuizzesData, error: teacherQuizzesError } = await supabase
          .from('quizzes')
          .select('id, title, subject, is_published')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });

        if (teacherQuizzesError) throw teacherQuizzesError;
        setTeacherQuizzes(teacherQuizzesData || []);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading dashboard",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Role-specific content
  const isStudent = user.role === 'student';
  const isParent = user.role === 'parent';
  const isTeacher = user.role === 'teacher';

  const subjectColors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
    "bg-pink-500", "bg-yellow-500", "bg-red-500", "bg-indigo-500"
  ];

  const achievements = [
    { title: "First Quiz Master", description: "Complete your first quiz with 100%", earned: recentQuizzes.some(q => (q.score / q.total_questions) * 100 === 100), icon: "🏆" },
    { title: "Week Warrior", description: "Study for 7 consecutive days", earned: user.streak >= 7, icon: "🔥" },
    { title: "Active Learner", description: "Complete 5 quizzes", earned: recentQuizzes.length >= 5, icon: "🧮" },
    { title: "Subject Explorer", description: "Study 3 different subjects", earned: subjects.length >= 3, icon: "⚡" }
  ];

  const todayTip = "Remember to take breaks every 25 minutes while studying. Your brain needs rest to process and retain information effectively!";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return "Today";
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const totalStudyHours = Math.floor(subjects.reduce((acc, s) => acc + s.total_time_minutes, 0) / 60);

  // Parent-specific data (placeholder for future implementation)
  const childrenProgress = [
    { name: "Child 1", level: 1, xp: 0, streak: 0, avgScore: 0 },
  ];

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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back, {user.name}! 👋
              </h1>
              <Badge className="bg-white/20 text-white border-white/30">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <p className="text-white/90 text-lg">
              {isStudent && `You're on a ${user.streak}-day learning streak! Keep it up!`}
              {isParent && "Track your children's progress and learning journey"}
              {isTeacher && "Monitor your classes and students' performance"}
            </p>
            {isStudent && (
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
            )}
          </div>
          <div className="mt-6 md:mt-0">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.div>

      {/* Student Dashboard */}
      {isStudent && (
        <>
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
              { label: "Subjects", value: subjects.length, icon: BookOpen, color: "text-primary" },
              { label: "Quizzes Taken", value: recentQuizzes.length, icon: Brain, color: "text-accent" },
              { label: "Study Hours", value: totalStudyHours, icon: Clock, color: "text-secondary" },
              { label: "Achievements", value: achievements.filter(a => a.earned).length, icon: Trophy, color: "text-success" }
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
                  {subjects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No subjects started yet. Visit the Subjects page to begin learning!</p>
                      <Button asChild className="mt-4">
                        <a href="/subjects">Browse Subjects</a>
                      </Button>
                    </div>
                  ) : (
                    subjects.map((subject, index) => (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${subjectColors[index % subjectColors.length]}`} />
                            <span className="font-medium">{subject.subject_name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">Study time: {subject.total_time_minutes} minutes</p>
                      </div>
                    ))
                  )}
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
                  {recentQuizzes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No quizzes taken yet. Start your first quiz to see results here!</p>
                      <Button asChild className="mt-4">
                        <a href="/quiz">Start a Quiz</a>
                      </Button>
                    </div>
                  ) : (
                    recentQuizzes.map((quiz) => {
                      const scorePercentage = Math.round((quiz.score / quiz.total_questions) * 100);
                      return (
                        <div key={quiz.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                          <div className="flex-1">
                            <h4 className="font-medium">{quiz.subject} Quiz</h4>
                            <p className="text-sm text-muted-foreground">{quiz.subject} • {formatDate(quiz.completed_at)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className={scorePercentage >= 80 ? "bg-success/20 text-success" : "bg-muted"}>
                              {scorePercentage}%
                            </Badge>
                            <span className="text-sm text-muted-foreground">{quiz.score}/{quiz.total_questions}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
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
            ].map((action) => {
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
        </>
      )}

      {/* Parent Dashboard */}
      {isParent && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {childrenProgress.map((child, index) => (
              <motion.div
                key={child.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      {child.name}'s Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <Trophy className="h-6 w-6 mx-auto mb-1 text-primary" />
                        <div className="text-2xl font-bold">Lvl {child.level}</div>
                        <div className="text-xs text-muted-foreground">Level</div>
                      </div>
                      <div className="text-center">
                        <Zap className="h-6 w-6 mx-auto mb-1 text-accent" />
                        <div className="text-2xl font-bold">{child.xp}</div>
                        <div className="text-xs text-muted-foreground">XP</div>
                      </div>
                      <div className="text-center">
                        <Flame className="h-6 w-6 mx-auto mb-1 text-secondary" />
                        <div className="text-2xl font-bold">{child.streak}</div>
                        <div className="text-xs text-muted-foreground">Streak</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Average Score</span>
                        <span className="text-sm text-muted-foreground">{child.avgScore}%</span>
                      </div>
                      <Progress value={child.avgScore} className="h-2" />
                    </div>
                    <Button className="w-full" variant="outline">
                      View Detailed Report
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Activity
                </CardTitle>
                <CardDescription>Combined learning activity across all children</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Activity chart coming soon</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {/* Teacher Dashboard */}
      {isTeacher && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Quizzes
                </CardTitle>
                <CardDescription>Manage and track your created quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                {teacherQuizzes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>You haven't created any quizzes yet.</p>
                    <Button asChild className="mt-4">
                      <a href="/quiz/create">Create Your First Quiz</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teacherQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                        <div className="flex-1">
                          <h4 className="font-medium">{quiz.title}</h4>
                          <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                        </div>
                        <Badge variant={quiz.is_published ? "default" : "secondary"}>
                          {quiz.is_published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <Button asChild className="h-auto p-6 flex flex-col items-center gap-2 bg-gradient-to-r from-primary to-primary-glow">
              <a href="/quiz/create">
                <FileText className="h-8 w-8" />
                <span>Create New Quiz</span>
              </a>
            </Button>
            <Button asChild className="h-auto p-6 flex flex-col items-center gap-2 bg-gradient-to-r from-accent to-accent-glow">
              <a href="/quiz">
                <Brain className="h-8 w-8" />
                <span>Manage Quizzes</span>
              </a>
            </Button>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Quiz Statistics
                  </CardTitle>
                  <CardDescription>Summary of your quiz creation activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{teacherQuizzes.length}</div>
                      <div className="text-xs text-muted-foreground">Total Quizzes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{teacherQuizzes.filter(q => q.is_published).length}</div>
                      <div className="text-xs text-muted-foreground">Published</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">{teacherQuizzes.filter(q => !q.is_published).length}</div>
                      <div className="text-xs text-muted-foreground">Drafts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}