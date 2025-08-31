import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react";

export default function Calendar() {
  const events = [
    { id: 1, title: "Math Quiz", time: "10:00 AM", type: "quiz", color: "bg-blue-500" },
    { id: 2, title: "Science Class", time: "2:00 PM", type: "class", color: "bg-green-500" },
    { id: 3, title: "Study Session", time: "4:00 PM", type: "study", color: "bg-purple-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className={`w-3 h-3 rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </p>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Events This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-sm text-muted-foreground">Upcoming Quizzes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}