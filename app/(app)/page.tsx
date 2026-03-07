import { getHomeData } from "../_lib/api/fetch-generated"
import { Banner } from "./_components/Banner"
import dayjs from "dayjs"

const HomePage = async () => {
  const homeData = await getHomeData(dayjs().format('YYYY-MM-DD'))

  console.log({ homeData });

  if (homeData.status === 200) {
    const { data } = homeData

    console.log(data.todayWorkoutDay);

  }

  return (
    <div>
      <Banner />
    </div>
  )
}

export default HomePage

