

const StepBox = ({
  number,
  text
}: {
  number: string,
  text: string
}) => {

  return (
    <div className="flex items-center gap-3 p-6 rounded-sm shadow-lg w-full">
      <h3 className="font-poppins text-[24px] font-[700] text-[#8053FF]">
        {number}
      </h3>
      <p className="font-poppins text-[18px] font-medium text-[#231558]">
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
    <section className="px-24 py-28">
        <div className="flex items-center gap-48">
          <div className="flex-1">
            <h1 className="font-poppins text-[48px] font-[700] leading-[64px] tracking-[0.96px] text-[#231558]">
              Cara Menggunakan RoadMap Akademik Maba
            </h1>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {stepData.map((data) => (
              <StepBox number={data.number} text={data.text}/>
            ))}
          </div>
        </div>
    </section>
  )
}

export default Step