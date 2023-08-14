"use client"

import Image from "next/image"
import profile from "@/public/profile.jpg"
import { useUser } from "@supabase/auth-helpers-react"
import { MoreVertical } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ReviewWithUserProps } from "@/types"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { useRouter } from "next/navigation"

interface ReviewCardProps {
    data: ReviewWithUserProps,
    handleDelete?: () => void,
    handleTag?: (tag: string) => void,
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    data, 
    handleDelete,
    handleTag
}) => {
  const user = useUser()!
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(true)
  const router = useRouter()

  const onChange = (open: boolean) => {
    if (!open) {
        setOpen(false)
    }
  }

  const handleTag2 = (tag: string) => {
    router.push(`/review?search=${tag}`)
  }


  const handleProfileClick = () => {
    router.push(`/profilereview/${data.user_id.id}`)
  }

  return (
    <>
    <AlertDialog key={data.id} open={open} onOpenChange={onChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure to delete this review?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your review and remove the data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={() => {
                        setTimeout(() => {
                            setMounted(false) 
                        }, 200)
                        setTimeout(() => {
                            handleDelete && handleDelete()
                        }, 1000)
                        }
                    }
                >
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    <AnimatePresence>
    {mounted && (
    <motion.div 
        className="flex-1 break-inside-avoid p-5 md:p-6 flex flex-col bg-[#D3C8FF] bg-opacity-[0.35] shadow-special rounded-xl space-y-4 h-fit min-w-[300px]"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ delay: 0.7, type: "spring", duration: 1.5 }}
        viewport={{ once: true }}
    >
        <div className="flex space-x-3 items-center relative" >
            <div className="flex items-center justify-center cursor-pointer" onClick={handleProfileClick}>
                <Image alt="profile" src={data.user_id.avatar_url || profile} className="object-contain rounded-full" width={40} height={40}/>
            </div>
            {data.user_id.faculty ? (
                <div className="flex flex-col">
                    <h3 className="font-roboto text-black font-[500] text-[15px] md:text-base cursor-pointer" onClick={handleProfileClick}>
                        {data.user_id.full_name || data.user_id.email}
                    </h3>
                    <p className="font-roboto text-[11px] md:text-xs text-[#78858F] cursor-pointer" onClick={handleProfileClick}>
                        {`${data.user_id.faculty} ${data.user_id.major ? "- " + data.user_id.major : ""}`}
                    </p>
                </div>
            ):(
                <h3 className="font-roboto text-black font-[500] text-[15px] md:text-base cursor-pointer" onClick={handleProfileClick}>
                    {data.user_id.full_name || data.user_id.email}
                </h3>
            )}
            
            {user?.id === data.user_id.id ? (
                <div className="absolute flex justify-center items-center right-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-fit">
                        <DropdownMenuItem className="text-base md:text-xs" onClick={() => {setOpen(true)}}>
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ): (<></>)}    
        </div>
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
                {data.tags?.map((tag, index) => (
                    <Badge key={tag} variant={index % 2 === 0 ? "default" : "secondary"} onClick={() => handleTag ? handleTag(tag) : handleTag2(tag)} className="cursor-pointer">
                        {tag}
                    </Badge>
                ))}
            </div>

            <p className="font-poppins text-[13px] md:text-sm font-normal text-[#425466]">
                {data.content}
            </p>
        </div>
    </motion.div>
    )}
    </AnimatePresence>
    </>
  )
}

export default ReviewCard