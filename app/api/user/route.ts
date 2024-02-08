import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient({});

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

    const newUser = await client.user.create({
      data: {
        account,
        password: hashedPassword,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        account: true,
      },
    });

    console.log(newUser);

    return NextResponse.json({
      message: "hello bcs4 get data",
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
  return NextResponse.json({
    message: "hello bcs4 get data",
  });
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
