import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

//FETCH Orders
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  //not good for finding if user is admin coz it will cost alot database queries, instead use the session token strategy in auth.ts
  // const user = await prisma.user(findUnique({ where: { email: session?.user.email } }));
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      } else {
        const orders = await prisma.order.findMany({
          where: { userEmail: session.user.email! },
        });
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }
  }
};
