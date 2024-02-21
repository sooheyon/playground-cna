"use client";
import { NextPage } from "next";
import CreateTodo from "./components/CreateTodo";
import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "@prisma/client";
import TodoCard from "./components/TodoCard";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log(token);

      if (!token) {
        setTodos([
          {
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            content: "hi",
            userId: 1,
            isDone: false,
          },
        ]);
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/todo`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const todosMap = todos.map((todo, idx) => {
    return <TodoCard key={idx} todo={todo} setTodos={setTodos}/>;
  });

  return (
    <div className="flex flex-col items-center max-w-screen-md mx-auto h-screen bg-blue-100">
      <CreateTodo todos={todos} setTodos={setTodos} />
      <ul>{todosMap}</ul>
    </div>
  );
};

export default Home;
