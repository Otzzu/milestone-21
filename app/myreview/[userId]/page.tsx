"use client"

import ReviewBox from '@/components/review-box'
import { ReviewWithUserProps } from '@/types'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ReviewHeaderAnimation from '@/components/review-header-animation'

const MyReviewPage = ({
  params
}:{
  params: { userId: string }
}) => {
  const supabase = useSupabaseClient()
  const [reviews, setReviews] = useState<ReviewWithUserProps[]>([])

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

  useEffect(() => {
    const fecthReview = async () => {
        const { data, error } = await supabase
          .from("review")
          .select("*, user_id!inner(*)")
          .eq("user_id.id", params.userId)
        
        if (error) {
            console.log(error)
            toast.error("Error fetching data")
        } else {
            setReviews(data)
        }
    }

    fecthReview()
  } ,[])


  
  return (
    <div className='px-7 md:px-10 lg:px-24 py-12'>
      <ReviewHeaderAnimation title='My Review' desc='Review-review yang anda buat'/>
      <ReviewBox data={reviews} handleDelete={handleDelete}/>
    </div>
  )
}

export default MyReviewPage