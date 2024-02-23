import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export const PUT = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const account = formData.get("account") as string | null;
    const imageFile = formData.get("imageFile") as File | null;

    if (!account || !imageFile) {
      return NextResponse.json(
        {
          message: "Not exist data",
        },
        { status: 400 }
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
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    fs.writeFileSync(`./public/images/${imageFile.name}`, buffer);

    const updatedUser = await client.user.update({
      where: {
        account,
      },
      data: {
        profileImage: imageFile.name,
      },
    });

    return NextResponse.json(updatedUser);
    
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
