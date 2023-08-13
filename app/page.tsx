import Hero from "@/components/hero";
import Review from "@/components/review";
import Step from "@/components/step";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Step />
      <Review />
    </div>
  )
}
