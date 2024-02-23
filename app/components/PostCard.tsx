"use client"
import { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <li>
      <Link href={post.url ?? ''}>
      <div>
        <Image
          alt={post.title}
          width={128}
          height={128}
          src={`/images/${post.thumbnail ?? "nextjs.png"}`}
        />
      </div>
      <div>
        <h2>{post.title}</h2>
        <time>{format(parseISO(post.date),"yy. M. d.")}</time>
        <div>{post.description}</div>
      </div>
      </Link>
    </li>
  );
};

export default PostCard;
