import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Flame } from "lucide-react";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Please Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You need to be logged in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary mr-1" />
                  <span className="text-2xl font-bold">{user.xp}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-secondary mr-1" />
                  <span className="text-2xl font-bold">{user.level}</span>
                </div>
                <p className="text-sm text-muted-foreground">Level</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Flame className="h-5 w-5 text-orange-500 mr-1" />
                  <span className="text-2xl font-bold">{user.streak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}