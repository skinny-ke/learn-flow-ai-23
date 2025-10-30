import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Clock, Star, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  difficulty: string;
  duration_minutes: number;
  xp_reward: number;
  is_published: boolean;
}

export default function Quiz() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [publishedQuizzes, setPublishedQuizzes] = useState<Quiz[]>([]);
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data: published } = await supabase
        .from("quizzes")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      setPublishedQuizzes(published || []);

      if (isTeacher) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          const { data: myQuizzesData } = await supabase
            .from("quizzes")
            .select("*")
            .eq("created_by", currentUser.id)
            .order("created_at", { ascending: false });

          setMyQuizzes(myQuizzesData || []);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const renderQuizCard = (quiz: Quiz, index: number, showManage = false) => (
    <motion.div
      key={quiz.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-elevated transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Brain className="h-6 w-6 text-primary" />
            <div className="flex gap-2">
              <Badge>{quiz.difficulty}</Badge>
              {!quiz.is_published && <Badge variant="outline">Draft</Badge>}
            </div>
          </div>
          <CardTitle>{quiz.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{quiz.subject}</p>
          {quiz.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{quiz.duration_minutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-secondary" />
              <span>{quiz.xp_reward} XP</span>
            </div>
          </div>
          <Button 
            className="w-full" 
            onClick={() => navigate(`/quiz/${quiz.id}`)}
          >
            {showManage ? "Manage Quiz" : "Start Quiz"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
            <p className="text-muted-foreground">Test your knowledge and earn XP</p>
          </div>
          {isTeacher && (
            <Button onClick={() => navigate("/quiz/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          )}
        </div>
      </motion.div>

      {isTeacher ? (
        <Tabs defaultValue="published" className="space-y-6">
          <TabsList>
            <TabsTrigger value="published">Published Quizzes</TabsTrigger>
            <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="space-y-6">
            {publishedQuizzes.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No published quizzes yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedQuizzes.map((quiz, index) => renderQuizCard(quiz, index))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-quizzes" className="space-y-6">
            {myQuizzes.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  You haven't created any quizzes yet. Click "Create Quiz" to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myQuizzes.map((quiz, index) => renderQuizCard(quiz, index, true))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedQuizzes.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No quizzes available yet
              </CardContent>
            </Card>
          ) : (
            publishedQuizzes.map((quiz, index) => renderQuizCard(quiz, index))
          )}
        </div>
      )}
    </div>
  );
}