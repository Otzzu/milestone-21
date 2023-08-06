import { Separator } from "./ui/separator"

const RoadmapCard = () => {
  return (
    <div className="flex flex-col rounded-lg shadow-special w-full p-4 max-h-fit space-y-3 overflow-hidden hover:scale-[1.01] transition">
        <h3 className="font-roboto text-black font-extrabold text-lg">
            SEMESTER 1
        </h3>
        <Separator />
        <div className="w-full h-full overflow-hidden">
          <p className="font-poppins text-sm font-normal text-[#425466] line-clamp-5">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
    </div>
  )
}

export default RoadmapCard