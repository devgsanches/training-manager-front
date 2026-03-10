import Image from "next/image";

export const Logo = ({ black }: { black?: boolean }) => (
  <Image src={black ? '/logo-fit-ai-black.svg' : '/logo-fit-ai-white.svg'} alt="Logo" width={44} height={19} priority />
)
