import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "@/app/lib/prismaClient";
import { verifyToken } from "@/app/lib/verifyToken";

export const POST = async (request: NextRequest) => {
  try {
    const { account, password } = await request.json();

    console.log(account);
    console.log(password);

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

    console.log(existUser);

    if (existUser) {
      return NextResponse.json(
        {
          message: "Already exist account",
        },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await client.user.create({
      data: {
        account,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ account }, process.env.JWT_SECRET!);
    return NextResponse.json({
      token,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const user = await verifyToken(request);

    return NextResponse.json(user.account);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  return NextResponse.json({
    message: "hello bcs4 put data",
  });
};

export const DELETE = async (request: NextRequest) => {
  return NextResponse.json({
    message: "hello bcs4 delete",
  });
};
