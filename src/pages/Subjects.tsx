import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Calculator as CalcIcon, Beaker, Globe, Palette, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface SubjectProgress {
  id: string;
  subject_name: string;
  progress: number;
  total_time_minutes: number;
}

const subjectIcons: Record<string, any> = {
  Mathematics: CalcIcon,
  Science: Beaker,
  English: BookOpen,
  History: Globe,
  Art: Palette,
  "Computer Science": Brain,
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-500",
  Science: "bg-green-500",
  English: "bg-purple-500",
  History: "bg-orange-500",
  Art: "bg-pink-500",
  "Computer Science": "bg-indigo-500",
};

const defaultSubjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Art",
  "Computer Science",
];

export default function Subjects() {
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchSubjects();
    }
  }, [user]);

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("subject_progress")
      .select("*")
      .order("subject_name");

    if (error) {
      toast({ title: "Error loading subjects", variant: "destructive" });
    } else {
      setSubjects(data || []);
    }
  };

  const initializeSubject = async (subjectName: string) => {
    if (!user) return;

    const { error } = await supabase.from("subject_progress").insert({
      user_id: user.id,
      subject_name: subjectName,
      progress: 0,
      total_time_minutes: 0,
    });

    if (error) {
      toast({ title: "Error initializing subject", variant: "destructive" });
    } else {
      toast({ title: `${subjectName} added to your subjects` });
      fetchSubjects();
    }
  };

  const updateProgress = async (id: string, currentProgress: number) => {
    const newProgress = Math.min(currentProgress + 10, 100);
    
    const { error } = await supabase
      .from("subject_progress")
      .update({ progress: newProgress })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating progress", variant: "destructive" });
    } else {
      toast({ title: "Progress updated!" });
      fetchSubjects();
    }
  };

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

      {subjects.length === 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground mb-4">
              Start by adding subjects to track your progress
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {defaultSubjects.map((subject) => (
                <Button
                  key={subject}
                  variant="outline"
                  onClick={() => initializeSubject(subject)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {subject}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => {
          const Icon = subjectIcons[subject.subject_name] || BookOpen;
          const color = subjectColors[subject.subject_name] || "bg-gray-500";
          
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
                      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{subject.subject_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {subject.total_time_minutes} min studied
                        </p>
                      </div>
                    </div>
                    <Badge>{subject.progress}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={subject.progress} className="h-2" />
                  <Button 
                    className="w-full"
                    onClick={() => updateProgress(subject.id, subject.progress)}
                    disabled={subject.progress >= 100}
                  >
                    {subject.progress >= 100 ? "Completed" : "Continue Learning"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}