import { Logo } from "../Logo";
import Link from "next/link";

type BannerProps = {
  userName?: string;
  todayWorkoutPlanId?: string
};


export const Banner = async ({ userName, todayWorkoutPlanId }: BannerProps) => {

  return (
    <div className="h-74 relative bg-[url(/banner.jpg)] bg-cover bg-position-[center_65%] bg-no-repeat rounded-b-3xl" >
      <div className="absolute bg-black/25 w-full h-full rounded-b-3xl"></div>
      <div className="flex flex-col justify-between h-full p-4 relative">
        <div className="absolute top-4">
          <Logo />
        </div>
        <div className="h-full flex items-end justify-between mb-10">
          <div className="flex flex-col text-white font-main">
            <p className="text-2xl font-semibold truncate">Olá, {userName ?? 'usuário'}</p>
            <p className="text-sm text-primary-foreground/90">Bora treinar hoje?</p>
          </div>
          <div className="flex items-end font-main">
            {todayWorkoutPlanId && <Link href={`/workout-plan/${todayWorkoutPlanId}`} className="text-white cursor-pointer font-semibold rounded-full text-sm bg-primary px-4 py-2">Bora!</Link>
            }
          </div>
        </div>
      </div>
    </div >
  )
}
