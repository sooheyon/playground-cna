"use client";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, FC, FormEvent, useState } from "react";

const Header: FC = () => {
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");

  const onClickMetaMask = async () => {
    if (!window.ethereum) return; // no metamask

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/user`,
      {
        account: accounts[0],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    setUser(response.data);
    setNickname(response.data.nickname);
  };

  const onClickModalOpen = () => {
    setIsOpen(true);
  };

  const onClickModalClose = () => {
    setIsOpen(false);
  };

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onSubmitUpdateNickname = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!user || !nickname || nickname === user.nickname) return;

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/user`,
        {
          account: user.account,
          nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      setUser(response.data);
      setNickname(response.data.nickname);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || !user) return;
      const formData = new FormData();

      formData.append("account", user.account);
      formData.append("imageFile", e.target.files[0]);

      const response = await axios.put<User>(
        `${process.env.NEXT_PUBLIC_URL}/api/user/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser(response.data)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="bg-blue-100">
        {user ? (
          <div className="flex justify-end items-center">
            <div>
              <label className="cursor-pointer" htmlFor="uploadFile">
                <Image
                  src={`/images/${user.profileImage}`}
                  alt={user.profileImage}
                  width={40}
                  height={40}
                />
              </label>
              <input
                id="uploadFile"
                type="file"
                className="hidden"
                onChange={onChangeUploadImage}
                accept="image/*"
              />
            </div>
            <button
              className="w-28 text-left truncate ml-2"
              onClick={onClickModalOpen}
            >
              {user.nickname}
            </button>
          </div>
        ) : (
          <button onClick={onClickMetaMask}>METAMASK 🦊</button>
        )}
      </header>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <form
            className="p-8 flex flex-col bg-gray-100"
            onSubmit={onSubmitUpdateNickname}
          >
            <button className="self-end" onClick={onClickModalClose}>
              X
            </button>
            <input
              className="my-4"
              type="text"
              value={nickname}
              onChange={onChangeNickname}
            />
            <input type="submit" value="수정" />
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
