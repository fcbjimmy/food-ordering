"use client";
import Image from "next/image";
import Link from "next/link";
import { AiFillGoogleSquare, AiFillFacebook } from "react-icons/ai";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* Box */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full">
        {/* Image */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        {/* Form */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="text-xl font-bold">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md items-center"
            onClick={() => signIn("google")}
          >
            <AiFillGoogleSquare className="text-3xl text-orange-600" />
            <span>Sign in with Google</span>
          </button>
          <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md items-center">
            <AiFillFacebook className="text-3xl text-blue-600" />
            <span>Sign in with Facebook</span>
          </button>{" "}
          <p className="text-sm">
            Have a problem?
            <Link className="underline" href="/">
              {" "}
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
