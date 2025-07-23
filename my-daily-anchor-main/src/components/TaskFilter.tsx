import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, List, Filter } from 'lucide-react';

interface TaskFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TaskFilter({ filter, onFilterChange, taskCounts }: TaskFilterProps) {
  const filters = [
    { key: 'all' as const, label: 'All Tasks', icon: List, count: taskCounts.all },
    { key: 'active' as const, label: 'Active', icon: Circle, count: taskCounts.active },
    { key: 'completed' as const, label: 'Completed', icon: CheckCircle, count: taskCounts.completed },
  ];

  return (
    <Card className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-glass">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Filter Tasks</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label, icon: Icon, count }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'glass'}
              size="sm"
              onClick={() => onFilterChange(key)}
              className="flex items-center gap-2"
            >
              <Icon className="w-3 h-3" />
              <span>{label}</span>
              <Badge 
                variant="secondary" 
                className="bg-background/50 text-foreground border-0 text-xs px-1.5 py-0.5"
              >
                {count}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}