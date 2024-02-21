"use client";
import { Todo } from "@prisma/client";
import axios from "axios";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

interface CreateTodoProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const CreateTodo: FC<CreateTodoProps> = ({ todos, setTodos }) => {
  const [content, setContent] = useState<string>("");

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onCreateTodo = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      if (!token || !content) return;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/todo`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prev) => {
        return [response.data, ...prev];
      });
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onCreateTodo}>
      <input
        className="input-style"
        type="text"
        value={content}
        onChange={onChangeContent}
      />
      <input className="btn-style ml-2" type="submit" value="입력" />
    </form>
  );
};

export default CreateTodo;
