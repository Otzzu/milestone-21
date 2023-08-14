"use client"

import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import picture from "@/public/vercel.svg"
import { Button } from "./ui/button"
import useRoadmapModal from "@/hooks/use-roadmap-modal"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Database } from "@/types_db"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import toast from "react-hot-toast"

const DetailsCard = ({
    detail
}: {
    detail: string
}) => {
  const { open, onOpen, onClose } = useRoadmapModal()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [data, setData] = useState<Database["public"]["Tables"]["activities"]["Row"] | undefined>()

  const handleReviewButton = () => {
    onClose()
    // console.log(open)
    router.push(`/review?search=${data?.tag}`)
  }

  const handleDetailsButton = () => {
    onClose()
    router.push(`/activity/${data?.id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("activities")
            .select("*")
            .eq("name", detail)
            .single()

        if (error) {
            console.log(error)
            toast.error("Fetching data failed")
        } else {
            const { data: imgUrl } = supabase
                .storage
                .from("images")
                .getPublicUrl(data.img)
            data.img = imgUrl.publicUrl
            setData(data)
        }
    }

    fetchData()
  }, [])

  return (
    <div className="rounded-lg flex flex-col p-4 min-[1100px]:p-6 space-y-3 shadow-special2 border break-inside-avoid flex-1" onClick={() => onOpen()}>
        <AspectRatio className="relative w-full rounded-lg flex justify-center items-center border" ratio={16 / 8}>
            <Image src={data?.img || "/loading.jpg"} alt="photo" className="object-fill rounded-lg" fill/>
        </AspectRatio>
        <h2 className="font-roboto text-black font-bold text-base md:text-lg">
            {data?.name}
        </h2>
        <p className="font-poppins text-[13px] md:text-sm font-normal text-[#425466] text-justify line-clamp-[10]"> 
            {data?.desc || "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem"}
        </p>
        <div className="flex items-center justify-center w-full space-x-2">
            <Button type="reset" variant="outline"  className="w-full rounded-md text-[13px] md:text-base" onClick={handleReviewButton}>
                See Review
            </Button>
            <Button type="reset"  className="w-full rounded-md text-[13px] md:text-base" onClick={handleDetailsButton}>
                See Details
            </Button>
        </div>
    </div>
  )
}

export default DetailsCard