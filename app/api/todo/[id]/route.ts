import { client } from "@/app/lib/prismaClient";
import { verifyToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await verifyToken(request);
    const { content } = await request.json();

    const { id } = params;

    if (isNaN(+id) || !content) {
      return NextResponse.json(
        {
          message: "Wrong data",
        },
        {
          status: 400,
        }
      );
    }

    const existTodo = await client.todo.findUnique({
      where: {
        id: +id,
      },
    });

    if (!existTodo) {
      return NextResponse.json(
        {
          message: "Not exist Todo",
        },
        { status: 400 }
      );
    }

    if (user.id !== existTodo.userId) {
      return NextResponse.json(
        {
          message: "Can not access",
        },
        {
          status: 400,
        }
      );
    }

    const updatedTodo = await client.todo.update({
      where: {
        id: +id,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(updatedTodo);
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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await verifyToken(request);
    const { id } = params;

    if (isNaN(+id)) {
      return NextResponse.json(
        {
          message: "",
        },
        {
          status: 400,
        }
      );
    }

    const existTodo = await client.todo.findUnique({
      where: {
        id: +id,
      },
    });

    if (!existTodo) {
      return NextResponse.json(
        {
          message: "",
        },
        {
          status: 400,
        }
      );
    }

    if (user.id !== existTodo.userId) {
      return NextResponse.json(
        {
          message: "Can not access",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({ success: true });
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
