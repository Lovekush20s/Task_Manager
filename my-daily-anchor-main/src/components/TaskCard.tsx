import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Check, Edit2, Trash2, Calendar, Flag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'low': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  return (
    <Card className={`group relative overflow-hidden border-border/50 bg-gradient-card backdrop-blur-sm transition-all duration-300 hover:shadow-depth hover:scale-[1.02] hover:-translate-y-1 ${
      task.completed ? 'opacity-70' : ''
    }`}>
      <div className="absolute inset-0 bg-gradient-glass opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1 border-primary/50 data-[state=checked]:bg-gradient-primary data-[state=checked]:border-primary"
          />
          
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-input/50 border-border/50 focus:border-primary"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') handleCancel();
                  }}
                />
                <div className="flex gap-2">
                  <Button variant="glass" size="sm" onClick={handleSave}>
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className={`font-medium text-foreground transition-colors ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}>
                  {task.title}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge className={`${getPriorityColor(task.priority)} text-white border-0 text-xs px-2 py-1`}>
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority}
                  </Badge>
                  
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {!isEditing && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="glass"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Created {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}