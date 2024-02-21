import { Todo } from "@prisma/client";
import axios from "axios";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

interface TodoCardProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard: FC<TodoCardProps> = ({ todo, setTodos }) => {
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  const [updateContent, setUpdateContent] = useState<string>(todo.content);
  const [content, setContent] = useState<string>(todo.content);

  const onIsDone = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}/is-done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      if (!updateContent || !token || updateContent === content) return;

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}`,
        { content: updateContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditToggle(false);
      setContent(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTodos((prev)=> prev.filter((item)=> item.id !== todo.id))
    } catch (error) {
      console.error(error);
    }
  };

  const onEditToggle = () => {
    setEditToggle(!editToggle);
  };

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateContent(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <li className="flex flex-row bg-red-100 justify-between items-center">
      {editToggle ? (
        <form onSubmit={onEdit}>
          <input
            type="text"
            className="input-style"
            onChange={onChangeContent}
            value={content}
          />
          <input type="submit" value={"저장"} />
        </form>
      ) : (
        <button className={`${isDone && "line-through"}`} onClick={onIsDone}>
          {todo.content}
        </button>
      )}

      <div className="flex flex-row gap-2 ml-4">
        <button className="btn-style" onClick={onEditToggle}>
          {editToggle ? "취소" : "수정"}
        </button>
        <button className="btn-style" onClick={onDelete}>삭제</button>
      </div>
    </li>
  );
};

export default TodoCard;
