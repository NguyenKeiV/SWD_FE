import Banner from "../components/Banner/Banner"
import RecruitmentMethod from "../components/EecruitmentMethod/RecruitmentMethod"
import Header from "../components/Header/Header"
import HotMajor from "../components/HotMajors/HotMajor"
import Reason from "../components/Reasons/Reason"
import Schoolarship from "../components/Schoolarship/Schoolarship"
import StudentFee from "../components/StudentFee/StudentFee"
const HomePage = () => {
  return (
    <div >
      <Header/>
      <Banner/>
      <Reason/>
      <HotMajor/>
      <Schoolarship/>
      <StudentFee/>
      <RecruitmentMethod/>
    </div>
  )
}

export default HomePage
