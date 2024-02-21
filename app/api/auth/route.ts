import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/lib/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    const { account, password } = await request.json();

    if (!account || !password) {
      return NextResponse.json(
        {
          message: "Not exist data",
        },
        {
          status: 400,
        }
      );
    }

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!existUser) {
      return NextResponse.json(
        {
          message: "Not exist user",
        },
        {
          status: 400,
        }
      );
    }

    const verifiedPassword = bcrypt.compareSync(password, existUser.password);

    if (!verifiedPassword) {
      return NextResponse.json(
        { maessage: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ account }, process.env.JWT_TOKEN!);

    return NextResponse.json({
      token,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
};
