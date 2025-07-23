import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

interface StatsCardProps {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
}

export function StatsCard({ totalTasks, completedTasks, activeTasks }: StatsCardProps) {
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Active',
      value: activeTasks,
      icon: Clock,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Progress',
      value: `${Math.round(completionRate)}%`,
      icon: TrendingUp,
      color: 'text-primary-glow',
      bgColor: 'bg-primary/5'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-glass hover:shadow-depth transition-all duration-300 hover:scale-105 animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            </div>
            
            {stat.title === 'Progress' && totalTasks > 0 && (
              <div className="mt-3">
                <Progress 
                  value={completionRate} 
                  className="h-2 bg-muted/50"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}