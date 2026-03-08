"use client";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type SignInWithGoogleProps = {
  variant?: "secondary" | "outline";
};

export const SignInWithGoogle = ({ variant = "secondary" }: SignInWithGoogleProps) => {
  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    if (error) {
      console.error(error.message);
    }
  };

  const isOutline = variant === "outline";

  return (
    <Button
      type="button"
      variant={isOutline ? "outline" : "secondary"}
      className={
        isOutline
          ? "cursor-pointer font-semibold font-inter w-full rounded-full border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          : "text-black cursor-pointer font-semibold bg-white font-inter rounded-full w-full"
      }
      onClick={handleGoogleLogin}
    >
      <Image src="/icons/google.svg" alt="Google" width={20} height={20} /> Fazer login com Google
    </Button>
  );
};
