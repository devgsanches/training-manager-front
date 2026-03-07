"use client";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SignInWithGoogle = () => {
  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <Button className="text-black cursor-pointer font-semibold bg-white font-inter w-58 rounded-full" onClick={handleGoogleLogin}>
      <Image src="/icons/google.svg" alt="Google" width={20} height={20} /> Fazer login com Google
    </Button>
  );
};
