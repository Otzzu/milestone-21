"use client"

import ReviewBox from "@/components/review-box"
import Header from "@/components/ui/header"
import { Input } from "@/components/ui/input"
import useCreateReviewModal from "@/hooks/use-create-review-modal"
import useRoadmapModal from "@/hooks/use-roadmap-modal"
import { ReviewWithUserProps } from "@/types"

import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { MoonLoader } from "react-spinners"

interface ReviewPageProps {
  searchParams?: { search?: string }
}

const ReviewPage: React.FC<ReviewPageProps> = ({ searchParams }) => {
  const [reviews, setReviews] = useState<ReviewWithUserProps[]>([])
  const supabase = useSupabaseClient()
  const { onClose } = useRoadmapModal()
  const { open: openCreate } = useCreateReviewModal()
  const [search, setSearch] = useState<string>(searchParams?.search || "")
  const [loading, setLoading] = useState<boolean>(false)
  
  const handleDelete = async (review: ReviewWithUserProps) => {
    const { error } = await supabase
        .from('review')
        .delete()
        .eq('id', review.id)
      
    if (error) {
        console.log(error)
        toast.error("Delete failed")     
    } else {
        toast.success("Delete success")
        setReviews((prev) => prev.filter((item) => item.id !== review.id))
    }
  }

  const handleSearch = async (tag?: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from("review")
      .select("*, user_id!inner(*)")
      .or(`content.ilike.%${tag || search}%,tags.cs.{"${tag || search}"}`)
    
    const { data: data1, error: error1 } = await supabase
      .from("review")
      .select("*, user_id!inner(*)")
      .or(`email.ilike.%${tag || search}%,full_name.ilike.%${tag || search}%`, { foreignTable: "user_id" })

    if (error || error1) {
      // console.log(error || error1)
      toast.error("Error fetching the data")
    } else {
      setReviews(Array.from(new Set(data.concat(data1).map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item)))
    }
    setLoading(false)
  }

  const handleTag = async (tag: string) => {
    setSearch(tag)
    handleSearch(tag)
  }

  useEffect(() => {
    if (search) {
      onClose()
      handleSearch(search)
    }

  }, [])
  
  useEffect(() => {
    const fetctReview = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("review")
        .select("*, user_id(*)")
        .order("created_at", { ascending: true })
  
      if (error) {
        console.log(error)
        toast.error("Error fetching the data")
      } else {
        setReviews(data as any)
      }
      setLoading(false)
    }
  
    fetctReview()
  }, [openCreate])
  
  return (
    <div className="flex flex-col px-7 md:px-10 lg:px-24 py-12 space-y-16">
        <div className="flex items-center justify-center">
            <div className="flex flex-col w-full md:w-[70%] space-y-14 items-center justify-center">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, translateY: "-120%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.5, type: "spring", duration: 1.5 }}
              >
                <Header textAlign="center" title="Review" desc="Berisi review-review kating mengenai berbagai macam kegiatan di ITB, baik kepanitian, unit, dan lain sebagainya" />
              </motion.div>
              <motion.div 
                className="relative w-full sm:w-[90%] md:w-[80%] mr-auto md:mx-auto"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", duration: 1.5 }}
              >
                  <Input className="rounded-full border-[#6F6F6F] py-4 md:py-6 font-roboto text-base md:text-[18px] px-4 md:px-8 placeholder:text-gray-400" placeholder="search review or tags" value={search} onChange={(e) => setSearch(e.target.value)}/>
                  <div className="cursor-pointer absolute rounded-full p-1 md:p-2 bg-[#111B47] right-1.5 md:right-2 top-[6px] md:top-[7px]" onClick={() => handleSearch()}>
                      {loading ? (
                        <>
                          <div className="hidden md:block">
                            <MoonLoader color="white" size={15} />
                          </div>
                          <div className="block md:hidden">
                            <MoonLoader  color="white" size={11} />
                          </div>
                        </>
                      ): (
                        <Search className="h-3.5 w-3.5 md:h-5 md:w-5 text-white"/>
                      )}
                  </div>
              </motion.div>
            </div>
        </div>
        <ReviewBox data={reviews} handleDelete={handleDelete} handleTag={handleTag}/>
    </div>
  )
}

export default ReviewPage