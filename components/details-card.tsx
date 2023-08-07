import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import picture from "@/public/vercel.svg"
import { Button } from "./ui/button"
import useRoadmapModal from "@/hooks/use-roadmap-modal"
import { useRouter } from "next/navigation"

const DetailsCard = ({
    detail
}: {
    detail: string
}) => {
  const { open, onOpen, onClose } = useRoadmapModal()
  const router = useRouter()

  const handleButton = () => {
    onClose()
    console.log(open)
    router.push(`/review?search=${detail}`)
  }
  return (
    <div className="rounded-lg flex flex-col p-6 space-y-3 shadow-special2 border break-inside-avoid flex-1" onClick={() => onOpen()}>
        <AspectRatio className="w-full rounded-lg flex justify-center items-center border" ratio={16 / 7}>
            <Image src={picture} alt="photo" className="object-cover rounded-lg"/>
        </AspectRatio>
        <h2 className="font-roboto text-black font-bold text-lg">
            {detail}
        </h2>
        <p className="font-poppins text-sm font-normal text-[#425466]"> 
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem
        </p>
        <div className="flex items-center justify-center w-full">
            <Button type="reset"  className="w-full rounded-md" onClick={handleButton}>
                See Review
            </Button>
        </div>
    </div>
  )
}

export default DetailsCard