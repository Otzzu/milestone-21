"use client"

import ReviewBox from "@/components/review-box"
import Header from "@/components/ui/header"
import { Input } from "@/components/ui/input"
import useCreateReviewModal from "@/hooks/use-create-review-modal"
import { ReviewWithUserProps } from "@/types"

import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { MoonLoader } from "react-spinners"

interface ReviewPageProps {
  searchParams?: { search?: string }
}

const ReviewPage: React.FC<ReviewPageProps> = ({ searchParams }) => {
  const [reviews, setReviews] = useState<ReviewWithUserProps[]>([])
  const supabase = useSupabaseClient()
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
    <div className="flex flex-col px-24 py-12">
        <div className="flex items-center justify-center">
            <div className="flex flex-col max-w-[750px] space-y-16 items-center justify-center">
                <Header textAlign="center" title="Review" desc="Berisi review-review kating mengenai berbagai macam kegiatan di ITB, baik kepanitian, unit, dan lain sebagaianya" />

                <div className="relative w-[85%] mx-auto">
                    <Input className="rounded-full border-[#6F6F6F] py-6 font-roboto text-[18px] px-8 placeholder:text-gray-400" placeholder="search review or tags" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <div className="cursor-pointer absolute rounded-full p-2 bg-[#111B47] right-2 top-[7px]" onClick={() => handleSearch()}>
                        {loading ? (
                          <MoonLoader color="white" size={15} />
                        ): (
                          <Search className="h-5 w-5 text-white"/>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <ReviewBox data={reviews} handleDelete={handleDelete} handleTag={handleTag}/>
        
    </div>
  )
}

export default ReviewPage