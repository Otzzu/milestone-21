"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"

const Hero = () => {
  const router = useRouter()

  return (
    <section className="flex justify-start md:justify-center items-center px-7 md:px-10 lg:px-24 py-32 lg:py-40">
      <div className="flex flex-col w-full md:w-[70%] gap-6">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, translateY: "-120%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 0.6, type: "spring", duration: 1 }}
        >
          <Header title="Perkenalkan RoadMap" desc="RoadMap adalah penuntun pintar bagi mahasiswa baru yang ingin merencanakan masa depan akademis mereka dengan baik" textAlign="center"/>
        </motion.div>  
        <motion.div 
          className="flex items-center justify-start md:justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", duration: 1 }}
        >
          <Button size="lg" onClick={() => router.push("/roadmap")}>
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero