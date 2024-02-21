"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignIn: NextPage = () => {
  const router = useRouter()
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeAccount = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!account || !password) return;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/auth`,
        {
          account,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.status === 200){
        localStorage.setItem('token',response.data.token)
        router.replace('/')
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-20 rounded-md shadow-md">
        <h1 className="text-xl">Sign In</h1>
        <form className="flex mt-4" onSubmit={onSignIn}>
          <div className="flex flex-col gap-2">
            <input
              className="input-style"
              type="text"
              placeholder="Account"
              value={account}
              onChange={changeAccount}
            />
            <input
              className="input-style"
              type="password"
              placeholder="Password"
              value={password}
              onChange={changePassword}
            />
          </div>

          <input
            className="self-end btn-style ml-2"
            type="submit"
            value={"Sign In"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
