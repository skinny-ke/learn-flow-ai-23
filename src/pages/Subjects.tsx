import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Calculator as CalcIcon, Flask, Globe, Palette } from "lucide-react";

export default function Subjects() {
  const subjects = [
    { id: 1, name: "Mathematics", icon: CalcIcon, progress: 85, lessons: 24, color: "bg-blue-500" },
    { id: 2, name: "Science", icon: Flask, progress: 72, lessons: 18, color: "bg-green-500" },
    { id: 3, name: "English", icon: BookOpen, progress: 91, lessons: 32, color: "bg-purple-500" },
    { id: 4, name: "History", icon: Globe, progress: 68, lessons: 16, color: "bg-orange-500" },
    { id: 5, name: "Art", icon: Palette, progress: 55, lessons: 12, color: "bg-pink-500" },
    { id: 6, name: "Computer Science", icon: Brain, progress: 78, lessons: 20, color: "bg-indigo-500" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Subjects</h1>
        <p className="text-muted-foreground">Explore all available courses and track your progress</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{subject.lessons} lessons</p>
                      </div>
                    </div>
                    <Badge>{subject.progress}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={subject.progress} className="h-2" />
                  <Button className="w-full">Continue Learning</Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}