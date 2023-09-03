import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

//FETCH Products
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const featured = searchParams.get("featured");
  try {
    if (featured === "yes") {
      const products = await prisma.product.findMany({
        where: {
          isFeatured: true,
        },
      });
      return new NextResponse(JSON.stringify(products), { status: 200 });
    } else {
      const products = await prisma.product.findMany();
      return new NextResponse(JSON.stringify(products), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
