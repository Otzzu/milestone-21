"use client"

import RoadMap from "@/components/roadmap"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import { Separator } from "@/components/ui/separator"
import useAuthModal from "@/hooks/use-auth-modal"
import useFormModal from "@/hooks/use-form-modal"
import { Database } from "@/types_db"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"

const roadMapPage = () => {
  const { onOpen, open } = useFormModal()
  const { onOpenSignin } = useAuthModal()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState<Database["public"]["Tables"]["users"]["Row"] | undefined>()

  const onClick = () => {
    if (!user) {
      onOpenSignin()
    } else {
      onOpen()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

      // console.log(data)
      setData(data)
    }

    fetchData()
  }, [open])

  return (
    <div className="px-24 py-12 ">
        <div className="flex justify-between mb-10">
            <Header textAlign="left" title="Road Map Generator" desc="Memberikan keterangan apa saja yang harus dilakukan di setiap semester secara detail"/>
            <div className="pt-4">
                <Button size="lg" onClick={onClick}>
                    Survey
                </Button>
            </div>
        </div>
        <Separator />
        {data?.roadmap_data ? (
          <RoadMap />
        ) : (
          <div className="w-full flex justify-center items-center font-roboto text-gray-300 font-bold text-2xl mt-48">
            Road Map
          </div>
        )}
    </div>
  )
}

export default roadMapPage