"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp: NextPage = () => {
  const router = useRouter()
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeAccount = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSignUp = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!account || !password) return;

      const response = await axios.post(
        "http://localhost:3000/api/user",
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

      if(response.data){
        router.replace('/')
      }



      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-20 rounded-md shadow-md">
        <h1 className="text-xl">Sign Up</h1>
        <form className="flex mt-4" onSubmit={onSignUp}>
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
            value={"Sign Up"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
