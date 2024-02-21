"use client";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Header: FC = () => {
  const [account, setAccount] = useState<string>("");

  const getMe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccount(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSignOut = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <header className="bg-red-100 p-4 flex flex-row justify-between">
      <p>{account ? `${account}님 환영합니다` : "None"}</p>

      <div className="flex flex-row gap-4">
        {account ? (
          <button className="btn-style" onClick={onClickSignOut}>
            로그아웃
          </button>
        ) : (
          <>
            <Link className="btn-style" href={"/sign-in"}>
              로그인
            </Link>
            <Link className="btn-style" href={"/sign-up"}>
              가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
