"use client"

import { motion } from "framer-motion"

import Header from "@/components/ui/header"

interface ProfileHeaderAnimationProps {
  title: string,
  desc: string
}

const ProfileHeaderAnimation: React.FC<ProfileHeaderAnimationProps> = ({
  title,
  desc
}) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, translateX: "-80%" }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: 0.6, type: "spring", duration: 1.5 }}
    >
      <Header title={title} desc={desc} textAlign='left'/>
    </motion.div>
  )
}

export default ProfileHeaderAnimation