import { NextPage } from "next";
import Image from "next/image";
import NextImg from "@/public/images/nextjs.png";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "./components/PostCard";

const Home: NextPage = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <div className="relative w-48 h-48 md:w-96 md:h-96">
        <ul>
          {posts.map((post, idx) => {
            return <PostCard key={`${post._id}`} post={post} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
