import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string, priority: 'low' | 'medium' | 'high', dueDate?: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority, dueDate || undefined);
      setTitle('');
      setDueDate('');
      setPriority('medium');
    }
  };

  return (
    <Card className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-depth">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Sparkles className="w-5 h-5 text-primary animate-glow" />
          Add New Task
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-input/50 border-border/50 focus:border-primary focus:shadow-neon transition-all duration-300"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🟢 Low</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="high">🔴 High</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-input/50 border-border/50 focus:border-primary"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            variant="default"
            disabled={!title.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}