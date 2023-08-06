"use client"

import { useState } from "react"
import ReviewCard from "./review-card"
import { Button } from "./ui/button"
import { ReviewWithUserProps } from "@/types"

interface ReviewBoxProps {
  handleDelete: (review: ReviewWithUserProps) => void,
  handleTag: (tag: string) => void,
  data: ReviewWithUserProps[]
}

const CardList: React.FC<ReviewBoxProps>  = ({
  data, 
  handleDelete,
  handleTag
}) => {
  return (
    <div className="columns-3 mt-20 space-y-6 gap-6 w-full">
      {data.map((item) => (
        <ReviewCard key={item.id} data={item} handleDelete={() => handleDelete(item)} handleTag={handleTag}/>
      ))}
    </div>
  )
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  data,
  handleDelete,
  handleTag
}) => {
  const reviewPerPage = 10
  const [page, setPage] = useState(1)

  const handleShowMore = () => {
    setPage((prev) => prev + 1)
  }



  return (
    <div className="flex flex-col items-center w-full">
      <CardList data={data.slice(0, reviewPerPage * page)} handleDelete={handleDelete} handleTag={handleTag}/>
      <div className="flex justify-center items-center w-full mt-12">
        {page * reviewPerPage < data.length ? (
          <Button size="lg" onClick={handleShowMore}>
            Show More
          </Button>
        ): (
          <></>
        )}
        
      </div>
    </div>
  )
}

export default ReviewBox