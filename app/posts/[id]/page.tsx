"use client"
import { NextPage } from "next";
import { useParams } from "next/navigation";

const Post:NextPage =()=>{
  const {id} = useParams()
  return <div>ID: {id}</div>
}

export default Post