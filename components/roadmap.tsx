import RoadmapCard from '@/components/roadmap-card'
import { Separator } from '@/components/ui/separator'

const RoadMap = () => {
  return (
    <div className='mt-5 flex flex-col space-y-4'>
      <div className='flex flex-col space-y-4'>
        <h1 className='font-roboto text-black font-extrabold text-2xl'>
          TAHUN PERTAMA
        </h1>
        <div className='flex justify-center items-center space-x-6'>
          <RoadmapCard/>
          <RoadmapCard/>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col space-y-4'>
        <h1 className='font-roboto text-black font-extrabold text-2xl'>
          TAHUN KEDUA
        </h1>
        <div className='flex justify-center items-center space-x-6'>
          <RoadmapCard/>
          <RoadmapCard/>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col space-y-4 w-full items-center justify-center'>
        <h1 className='font-poppins text-gray-500 font-bold text-2xl'>
          COMING SOON
        </h1>
      </div>
    </div>
  )
}

export default RoadMap