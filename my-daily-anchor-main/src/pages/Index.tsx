import { useState, useEffect } from 'react';
import { Scene3D } from '@/components/3d/Scene3D';
import { TaskForm } from '@/components/TaskForm';
import { TaskCard } from '@/components/TaskCard';
import { TaskFilter } from '@/components/TaskFilter';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Sparkles, Rocket, Zap } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: 'low' | 'medium' | 'high', dueDate?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task Added! ✨",
      description: `"${title}" has been added to your tasks.`,
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task Reactivated! 🔄" : "Task Completed! 🎉",
        description: `"${task.title}" marked as ${task.completed ? 'active' : 'completed'}.`,
      });
    }
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
    
    toast({
      title: "Task Updated! ✏️",
      description: "Your task has been successfully updated.",
    });
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    
    if (task) {
      toast({
        title: "Task Deleted! 🗑️",
        description: `"${task.title}" has been removed.`,
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active': return !task.completed;
      case 'completed': return task.completed;
      default: return true;
    }
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Scene3D />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-neon animate-glow">
              <Rocket className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              3D Task Manager
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience task management in a whole new dimension. Organize, prioritize, and accomplish your goals with style.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-glow" />
              <span>Beautiful 3D Interface</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              <span>Real-time Updates</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <StatsCard 
            totalTasks={taskCounts.all}
            completedTasks={taskCounts.completed}
            activeTasks={taskCounts.active}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form & Filter */}
          <div className="space-y-6 animate-slideIn">
            <TaskForm onAddTask={addTask} />
            <TaskFilter 
              filter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
          </div>

          {/* Right Column - Tasks */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                {filter === 'all' && 'All Tasks'}
                {filter === 'active' && 'Active Tasks'}
                {filter === 'completed' && 'Completed Tasks'}
                <span className="text-lg text-muted-foreground">({filteredTasks.length})</span>
              </h2>
              
              {tasks.length > 0 && (
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('tasks');
                    setTasks([]);
                    toast({
                      title: "All Tasks Cleared! 🧹",
                      description: "Your task list has been reset.",
                    });
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="p-4 bg-gradient-card rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-glass">
                    <Sparkles className="w-8 h-8 text-primary animate-glow" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {filter === 'completed' ? 'No completed tasks yet' : 'No tasks yet'}
                  </h3>
                  <p className="text-muted-foreground">
                    {filter === 'completed' 
                      ? 'Complete some tasks to see them here!' 
                      : 'Add your first task to get started on your productivity journey!'
                    }
                  </p>
                </div>
              ) : (
                filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TaskCard
                      task={task}
                      onToggle={toggleTask}
                      onEdit={editTask}
                      onDelete={deleteTask}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
