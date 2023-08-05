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
    <div>
        <h1 className={cn("font-poppins text-[64px] font-[700] text-[#23155B] tracking-tight", textAlign === "left" ? "text-left" : "text-center")}>
          {title}
        </h1>
        <p className={cn("font-poppins text-[20px] font-normal leading-9", textAlign === "left" ? "text-left" : "text-center")}>
            {desc}
        </p>
    </div>
  )
}

export default Header