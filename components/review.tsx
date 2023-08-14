"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import reviewImg from "@/public/reviewImg.png"
import { Button } from "@/components/ui/button"

const Review = () => {
  const router = useRouter()

  return (
    <section className="flex flex-col md:flex-row justify-between md:space-x-5 items-center px-7 md:pr-10 lg:pr-24 py-10">
        <motion.div 
            className="flex-1 lg:flex-[1.3]"
            initial={{ opacity: 0, translateX: "-80%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 2, type: "spring", delay: 0.4 }}
            viewport={{ once: true }}
        >
            <Image alt="image" src={reviewImg} className="object-contain"/>
        </motion.div>
        <div className="flex-1 space-y-4 lg:space-y-10">
            <motion.div
                className="w-full"
                initial={{ opacity: 0, translateX: "80%" }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 2, type: "spring", delay: 0.1 }}
                viewport={{ once: true }}
            >
                <h1 className="font-poppins text-[32px] sm:text-[42px] lg:text-[52px] font-[700] tracking-tight text-[#23155B] leading-[64px]">
                    <span className="text-[#8053FF]">
                        Review {' '}
                    </span>
                    by <br className="hidden md:block"/> Kating
                </h1>
            </motion.div>
            <motion.div
                className="w-full"
                initial={{ opacity: 0, translateX: "80%" }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 2, type: "spring", delay: 0.2 }}
                viewport={{ once: true }}
            >
                <p className="font-poppins text-[13px] sm:text-[14px] lg:text-[18px] leading-7">
                    Cerita pengalaman kating mengikuti berbagai macam kegiatan di ITB baik kepanitiaan terpusat, UKM, dan lain sebagainya. Melalui review nyata dari kating diharapkan bisa membantu para maba untuk mengatur rencana mereka semasa kuliah.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, translateX: "60%" }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 2, type: "spring", delay: 0.4 }}
                viewport={{ once: true }}
            >
                <Button size="lg" onClick={() => router.push("/review")}>
                    Get Started
                </Button>
            </motion.div>
        </div>
    </section>
  )
}

export default Review