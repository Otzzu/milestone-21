import useRoadmapModal from "@/hooks/use-roadmap-modal"
import { Separator } from "./ui/separator"
import { RoadmapModalData } from "@/types"

const RoadmapCard = ({
  data
}:{
  data: RoadmapModalData
}) => {
  const { onOpen, setData } = useRoadmapModal()

  const onClick = () => {
    setData(data)
    onOpen()
  }

  return (
    <div className="flex flex-col rounded-lg shadow-special w-full p-4 max-h-fit space-y-3 overflow-hidden hover:scale-[1.01] transition" onClick={onClick}>
        <h3 className="font-roboto text-black font-extrabold text-lg">
            SEMESTER {data.semester}
        </h3>
        <Separator />
        <div className="w-full h-full overflow-hidden">
          <p className="font-poppins text-sm font-normal text-[#425466] line-clamp-5">
            {data.desc}
          </p>
        </div>
    </div>
  )
}

export default RoadmapCard