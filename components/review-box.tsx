"use client"

import ReviewCard from "./review-card"
import { Button } from "./ui/button"
import { ReviewWithUserProps } from "@/types"

interface ReviewBoxProps {
  handleDelete: (review: ReviewWithUserProps) => void,
  data: ReviewWithUserProps[]
}

const CardList: React.FC<ReviewBoxProps>  = ({
  data, 
  handleDelete
}) => {
  return (
    <div className="columns-3 mt-20 space-y-6 gap-6 w-full">
      {data.map((item) => (
        <ReviewCard key={item.id} data={item} handleDelete={() => handleDelete(item)}/>
      ))}
    </div>
  )
}



const ReviewBox: React.FC<ReviewBoxProps> = ({
  data,
  handleDelete
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <CardList data={data} handleDelete={handleDelete}/>
      <div className="flex justify-center items-center w-full mt-12">
        <Button size="lg">
          Show More
        </Button>
      </div>
    </div>
  )
}

export default ReviewBox