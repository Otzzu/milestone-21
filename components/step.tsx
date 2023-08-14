"use client"

import { motion } from "framer-motion"

const StepBox = ({
  number,
  text
}: {
  number: string,
  text: string
}) => {

  return (
    <div className="flex items-center gap-3 p-6 rounded-sm shadow-lg w-full">
      <h3 className="font-poppins text-[16px] sm:text-[18px] lg:text-[24px] font-[700] text-[#8053FF]">
        {number}
      </h3>
      <p className="font-poppins text-[12px] sm:text-[14px] lg:text-[18px] font-medium text-[#231558]">
        {text}
      </p>
    </div>
  )
}

const Step = () => {
  const stepData = [{
    number: "01",
    text: "Masuk ke halaman menu Road Map"
  }, {
    number: "02",
    text: "Isi survey dan jawab semua pertanyaan yang ada"
  }, {
    number: "03",
    text: "Tekan tombol generate dan tunggu proses pembuatan Road Map selesai"
  }, {
    number: "04",
    text: "Road Map telah jadi dan manfaatkanlah informasi yang telah disajikan"
  }]

  return (
    <section className="px-7 md:px-10 lg:px-24 py-12 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-center gap-10 sm:gap-20 min-[1100px]:gap-24 lg:gap-48">
          <motion.div 
            className="w-[80%] md:w-full"
            initial={{ opacity: 0, translateX: "-80%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 3, type: "spring", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="font-poppins text-[28px] sm:text-[34px] lg:text-[48px] font-[700] leading-[38px] sm:leading-[44px] lg:leading-[64px] tracking-[0.96px] text-[#231558]">
              Cara Menggunakan RoadMap Akademik Maba
            </h1>
          </motion.div>
          <div className="flex flex-col gap-4 w-full">
            {stepData.map((data, index) => (
              <motion.div
                initial={{ opacity: 0, translateX: "80%" }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 2, type: "spring", delay: ((index / 10) * 1.1)}}
                viewport={{ once: true }}
                key={data.number}
              >
                <StepBox key={data.number} number={data.number} text={data.text}/>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default Step