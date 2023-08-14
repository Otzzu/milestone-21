"use client"

import ReviewBox from '@/components/review-box'
import { ReviewWithUserProps } from '@/types'
import { Database } from '@/types_db'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import useRoadmapModal from '@/hooks/use-roadmap-modal'

const ActivityPage = ({
    params
}:{
    params: { activityId: string }
}) => {
  const [data, setData] = useState<Database["public"]["Tables"]["activities"]["Row"] | undefined>()
  const [reviews, setReviews] = useState<ReviewWithUserProps[]>([])
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { onClose } = useRoadmapModal()

  useEffect(() => {
    onClose()
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("activities")
            .select("*")
            .eq("id", params.activityId)
            .single()

        if (error) {
            console.log(error)
            toast.error("Fetching activity data failed")
        } else {
            const { data: reviews, error: errorReviews } = await supabase
                .from("review")
                .select("*, user_id!inner(*)")
                .or(`content.ilike.%${data.tag}%,tags.cs.{"${data.tag}"}`)

            const { data: imgUrl } = supabase
                .storage
                .from("images")
                .getPublicUrl(data.img)
            data.img = imgUrl.publicUrl
            setData(data)

            if (errorReviews){
                console.log(errorReviews)
                toast.error("Fetching reviews data failed")
            } else {
                setReviews(reviews)
            }
        }
    }

    fetchData()
  }, [])

  const handleDelete = async (review: ReviewWithUserProps) => {
    const { error } = await supabase
        .from('review')
        .delete()
        .eq('id', review.id)
        .limit(5)
      
    if (error) {
        console.log(error)
        toast.error("Delete failed")     
    } else {
        toast.success("Delete success")
        setReviews((prev) => prev.filter((item) => item.id !== review.id))
    }
  }

  return (
    <div className='px-7 md:px-10 lg:px-24 py-12'>
        <div className='flex flex-col'>
            <motion.div
                className="w-full"
                initial={{ opacity: 0, translateX: "-80%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.6, type: "spring", duration: 2 }}
            >
                <AspectRatio className="w-full rounded-lg flex justify-center items-center border-2" ratio={16 / 8}>
                    <Image src={data?.img || "/loading.jpg"} alt="photo" className="object-fill rounded-lg" fill/>
                </AspectRatio>
            </motion.div>
            <Separator className='my-4'/>
            <div className='flex flex-col space-y-4'>
                <motion.h1 
                    className='font-roboto text-black font-bold text-xl md:text-3xl'
                    initial={{ opacity: 0, translateX: "-80%" }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 0.2, type: "spring", duration: 2 }}
                    viewport={{ once: true }}
                >
                    {data?.name}
                </motion.h1>
                <motion.p 
                    className='font-poppins text-md md:text-lg font-normal text-[#425466] text-justify'
                    initial={{ opacity: 0, translateX: "-80%" }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 0.2, type: "spring", duration: 2 }}
                    viewport={{ once: true }}
                >
                    {data?.desc}
                </motion.p>
            </div>
            <Separator className='my-4'/>
            <div className='flex flex-col'>
                <motion.h1 
                    className='font-roboto text-black font-bold text-xl md:text-3xl mb-10'
                    initial={{ opacity: 0, translateX: "-80%" }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 0.2, type: "spring", duration: 2 }}
                    viewport={{ once: true }}
                >
                    Review
                </motion.h1>
                <ReviewBox data={reviews} handleDelete={handleDelete}/>
                <motion.div 
                    className='w-full flex items-center justify-center'
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", duration: 2 }}
                    viewport={{ once: true }}
                >
                    <Button size="lg" onClick={() => router.push(`/review?search=${data?.tag}`)}>
                        See More Reviews
                    </Button>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default ActivityPage