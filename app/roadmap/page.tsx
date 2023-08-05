import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import { Separator } from "@/components/ui/separator"


const roadMapPage = () => {
  return (
    <div className="px-24 py-12">
        <div className="flex justify-between mb-10">
            <Header textAlign="left" title="Road Map Generator" desc="Memberikan keterangan apa saja yang harus dilakukan di setiap semester secara detail"/>
            <div className="pt-4">
                <Button size="lg">
                    Edit Data Diri
                </Button>
            </div>
        </div>
        <Separator />
    </div>
  )
}

export default roadMapPage