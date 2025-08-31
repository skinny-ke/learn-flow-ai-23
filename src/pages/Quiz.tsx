import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Star, Trophy } from "lucide-react";

export default function Quiz() {
  const quizzes = [
    { id: 1, title: "Algebra Basics", subject: "Mathematics", difficulty: "Easy", duration: 15, xp: 50 },
    { id: 2, title: "Chemical Reactions", subject: "Science", difficulty: "Medium", duration: 20, xp: 75 },
    { id: 3, title: "Grammar Rules", subject: "English", difficulty: "Easy", duration: 10, xp: 40 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and earn XP</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
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
                  <Badge>{quiz.difficulty}</Badge>
                </div>
                <CardTitle>{quiz.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{quiz.subject}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-secondary" />
                    <span>{quiz.xp} XP</span>
                  </div>
                </div>
                <Button className="w-full">Start Quiz</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}