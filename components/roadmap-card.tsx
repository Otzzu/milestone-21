import useRoadmapModal from "@/hooks/use-roadmap-modal"
import { Separator } from "./ui/separator"
import { RoadmapModalData } from "@/types"
import { motion } from "framer-motion"

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
    <motion.div 
      className="flex flex-col rounded-lg shadow-special w-full flex-1 p-3 md:p-4 max-h-fit space-y-2 md:space-y-3 overflow-hidden" onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: 0,  duration: 0.3, ease: "easeInOut"}}
    >
        <h3 className="font-roboto text-black font-extrabold text-base md:text-lg">
            SEMESTER {data.semester}
        </h3>
        <Separator />
        <div className="w-full h-full overflow-hidden">
          <p className="font-poppins text-xs md:text-sm font-normal text-[#425466] line-clamp-5">
            {data.desc}
          </p>
        </div>
    </motion.div>
  )
}

export default RoadmapCard