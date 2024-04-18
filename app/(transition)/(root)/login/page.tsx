"use client";

import { NextPage } from "next";

import { redirect } from "next/navigation";

import { useIsLoggedIn } from "@/utils/supabase/AuthProvider";
import { Login } from "../../../../src/components/features/Auth/Login";

const AuthPage: NextPage = () => {
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-muted px-4 pt-8">
      <Login />
    </div>
  );
};

export default AuthPage;
