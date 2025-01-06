import React, { useState } from 'react';
import EmailVerification from '@/components/EmailVerification';
import { Input } from '@/components/ui/input';
import {
  Clock,
  Ellipsis,
  Paperclip,
  Plus,
  PlusCircle,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuth } from '@/hooks/use-auth';
import AddTaskDialog from './dialog/AddTask';
import { useTodos } from '@/hooks/use-todos';
import { Progress } from '../ui/progress';

function MainPage() {
  const { user } = useAuth();
  const { todos, loading, deleteTodo } = useTodos(user?.uid);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 md:space-y-4 my-4">
      <EmailVerification />

      <AddTaskDialog open={open} setOpen={setOpen} />

      <div className="flex items-center justify-between gap-2">
        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-muted-foreground" />
          <Input className="pl-10" type="search" placeholder="Search task..." />
        </div>
        <Button
          onClick={() => setOpen(true)}
          title={
            user?.isAnonymous &&
            "You can't add task because it's anonymous mode."
          }
          disabled={user?.isAnonymous}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {loading && <div>Loading...</div>}

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-md w-full cursor-pointer hover:opacity-90 duration-200"
          >
            <div className="truncate w-96">
              <h6 className="text-sm md:text-base font-medium truncate">
                {todo.title}
              </h6>
              <small className="text-muted-foreground text-xs md:text-sm">
                {todo.description}
              </small>
            </div>
            <div className="flex-1 flex items-center gap-2 md:gap-4">
              <div
                className={`px-5 py-1 rounded-lg border ${
                  todo.isCompleted
                    ? 'border-green-500 text-green-500'
                    : 'border-red-500 text-red-500'
                }`}
              >
                {todo.isCompleted ? 'Completed' : 'Not Completed'}
              </div>
              <div className="px-5 py-1 rounded-lg bg-purple-200 hover:bg-purple-200/80 dark:bg-purple-500 dark:text-white">
                {todo.status}
              </div>
              <div className="px-5 py-1 rounded-lg bg-red-200 hover:bg-red-200/80 dark:bg-red-500 dark:text-white">
                {todo.priority}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="text-sm">12 days left</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <Ellipsis className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTodo(todo.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
        <div
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 justify-center border-2 border-dashed border-border hover:border-ring/40 px-4 py-2 md:py-3 rounded-md w-full cursor-pointer duration-200"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm md:text-base">Add New Task</span>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
