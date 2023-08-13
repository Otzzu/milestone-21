"use client"

import { motion } from "framer-motion"
import Header from "./ui/header"

const ReviewHeaderAnimation = ({
    title,
    desc,
    delay
}:{
    title: string,
    desc: string,
    delay?: number
}) => {
  return (
    <div>
        <motion.div
        className="w-full"
        initial={{ opacity: 0, translateX: "-80%" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: delay || 0.6, type: "spring", duration: 1.5 }}
      >
        <Header title={title} desc={desc} textAlign='left'/>
      </motion.div>
    </div>
  )
}

export default ReviewHeaderAnimation