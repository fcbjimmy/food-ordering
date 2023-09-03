import { NextAuthOptions, getServerSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./connect";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

//session token is only storing name,email and image of the gmail
//so we need to add the isAdmin property and then when we sign in
//we will be able to check the isAdmin in the API with the below config

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: { email: token.email! },
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
};

// to get user and status in server components and apis
export const getAuthSession = () => getServerSession(authOptions);
