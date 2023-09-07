import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { intentId: string } }
) => {
  const { intentId } = params;
  console.log(
    "------------------------------------intentId------------------------------------"
  );
  console.log(intentId);

  try {
    // await prisma.order.update({
    //   where: {
    //     intent_id: intentId,
    //   },
    //   data: { status: "Being prepared!" },
    // });
    // return new NextResponse(
    //   JSON.stringify({ message: "Order has been updated" }),
    //   { status: 200 }
    // );

    await prisma.order.update({
      where: { intent_id: intentId },
      data: { status: "Being prepared!" },
    });

    return NextResponse.json(
      { message: "Order placed! Order is being prepared!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
