import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

//Get single product
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    console.log("------------------------API------------------------");
    console.log(product);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
