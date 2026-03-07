import { Button } from "@/components/ui/button";
import { Logo } from "../Logo";

export const Banner = () => (
  <div className="h-74 relative bg-[url(/banner.jpg)] bg-cover bg-position-[center_65%] bg-no-repeat rounded-b-3xl">
    <div className="absolute bg-black/25 w-full h-full rounded-b-3xl"></div>
    <div className="flex flex-col justify-between h-full p-5 relative">
      <div className="absolute top-4">
        <Logo />
      </div>


      <div className="h-full flex items-end justify-between mb-10">
        <div className="flex flex-col text-white font-main">
          <p className="text-2xl font-semibold truncate">Olá, Sanchez</p>
          <p className="text-sm text-gray-light">Bora treinar hoje?</p>
        </div>
        <div className="flex items-end font-main">
          <Button className="text-white cursor-pointer font-semibold rounded-full text-sm">Bora!</Button>
        </div>
      </div>
    </div>
  </div>
)
