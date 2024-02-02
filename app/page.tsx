import { NextPage } from "next";
import Image from "next/image";
import NextImg from '@/public/images/nextjs.png'

const Home: NextPage = () => {
  return (
    <div>
      <div className="relative w-48 h-48 md:w-96 md:h-96">
        <Image
          src={NextImg}
          alt="NextImg"
          fill={true}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default Home;
