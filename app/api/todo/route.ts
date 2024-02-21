import { client } from "@/app/lib/prismaClient";
import { verifyToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const user = await verifyToken(request);

    const todo = await client.todo.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todo);
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

export const POST = async (request: NextRequest) => {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        {
          message: "Not exist token",
        },
        {
          status: 400,
        }
      );
    }

    const user = await verifyToken(request);

    const todo = await client.todo.create({
      data: {
        content,
        userId: user.id,
      },
    });

    return NextResponse.json(todo);
    
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
