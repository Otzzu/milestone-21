"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import reviewImg from "@/public/reviewImg.png"
import { Button } from "@/components/ui/button"

const Review = () => {
  const router = useRouter()

  return (
    <section className="flex justify-between items-center pr-24">
        <div className="flex-[1.3]">
            <Image alt="image" src={reviewImg} className="object-contain"/>
        </div>
        <div className="flex-1 space-y-10">
            <h1 className="font-poppins text-[52px] font-[700] tracking-tight text-[#23155B] leading-[64px]">
                <span className="text-[#8053FF]">
                    Review {' '}
                </span>
                by <br/> Kating
            </h1>
            <p className="font-poppins text-[18px] leading-7">
                Cerita pengalaman kating mengikuti berbagai macam kegiatan di ITB baik kepanitiaan terpusat, UKM, dan lain sebagainya. Melalui review nyata dari kating diharapkan bisa membantu para maba untuk mengatur rencana mereka semasa kuliah.
            </p>
            <div>
                <Button size="lg" onClick={() => router.push("/review")}>
                    Get Started
                </Button>
            </div>
        </div>
    </section>
  )
}

export default Review