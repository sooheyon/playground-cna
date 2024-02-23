import { allPosts } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
import { NextPage } from "next";
import Image from "next/image";

interface PostLayoutProps {
  params: { slug: string };
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

const PostLayout: NextPage<PostLayoutProps> = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug:${params.slug}`);

  return (
    <article>
      {post.thumbnail && (
        <Image
          alt={post.title}
          width={512}
          height={512}
          src={`/images/${post.thumbnail}`}
        />
      )}
      <div>
        <h2>{post.title}</h2>
        <time dateTime={post.date}>
          {format(parseISO(post.date), "yyyy. M. d.")}
        </time>
        <div>{post.description}</div>
      </div>
      <div dangerouslySetInnerHTML={{__html:post.body.html}}></div>
    </article>
  );
};

export default PostLayout;
