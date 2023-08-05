"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"

const Hero = () => {
  const router = useRouter()

  return (
    <section className="flex justify-center items-center px-24 py-40">
      <div className="flex flex-col max-w-[750px] gap-6">  
        <Header title="Perkenalkan RoadMap" desc="RoadMap adalah penuntun pintar bagi mahasiswa baru yang ingin merencanakan masa depan akademis mereka dengan baik" textAlign="center"/>
        <div className="flex items-center justify-center">
          <Button size="lg" onClick={() => router.push("/roadmap")}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero