import React, { createContext, useState, useContext, ReactNode } from "react";
export interface Todo {
  id: number;
  title: string;
}
export interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, newTitle: string) => void;
  removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };
  const updateTodo = (id: number, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      })
    );
  };
  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
