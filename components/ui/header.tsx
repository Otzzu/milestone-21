import { cn } from "@/lib/utils"

const Header = ({
    title,
    desc,
    textAlign
}: {
    title: string,
    desc: string,
    textAlign: "center" | "left"
}) => {
  
  return (
    <div className="w-full">
        <h1 className={cn("font-poppins text-[32px] sm:text-[44px] lg:text-[64px] font-[700] text-[#23155B] tracking-tight text-left", textAlign === "left" ? "md:text-left" : "md:text-center")}>
          {title}
        </h1>
        <p className={cn("font-poppins text-[13px] sm:text-[16px] lg:text-[20px] font-normal leading-9 text-left", textAlign === "left" ? "md:text-left" : "md:text-center")}>
            {desc}
        </p>
    </div>
  )
}

export default Header