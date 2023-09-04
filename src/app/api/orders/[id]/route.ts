import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const data = await request.json();
    console.log(data);
    await prisma.order.update({
      where: { id: id },
      data: { status: data },
    });
    return NextResponse.json(
      { message: "Order has been update" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
