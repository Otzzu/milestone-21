import { Database } from "@/types_db"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

const ActivityCard = ({
    data
}:{
    data: Database["public"]["Tables"]["activities"]["Row"]
}) => {
  const router = useRouter()

  return (
    <motion.div  
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ delay: 0.5, type: "spring", duration: 1.5 }}
        viewport={{ once: true }}
    >
        <motion.div
            onClick={() => router.push(`/activity/${data.id}`)}
            className="break-inside-avoid w-full p-4 md:p-6 shadow-special rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0,  duration: 0.3, ease: "easeInOut"}}

        >
            <div className="flex items-center space-x-3 md:space-x-4">
                <div className="flex-[1.3]">
                    <AspectRatio className="relative w-full rounded-lg flex justify-center items-center border" ratio={10 / 8} >
                        <Image src={data.img || "/loading.jpg"} alt="" className="object-fill rounded-lg" fill/>
                    </AspectRatio>
                </div>
                <div className="flex flex-col space-y-2 flex-[2.5]">
                    <h2 className="font-roboto text-black font-bold text-base md:text-lg">
                        {data.name}
                    </h2>
                    <Separator/>
                    <p className="font-poppins text-[13px] md:text-sm font-normal text-[#425466] text-justify line-clamp-[5]">
                        {data.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default ActivityCard