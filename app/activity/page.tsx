"use client"

import ActivityCard from "@/components/activity-card"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import { Input } from "@/components/ui/input"
import { Database } from "@/types_db"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { MoonLoader } from "react-spinners"


const ActivitiesPage = () => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [activities, setActivities] = useState<Database["public"]["Tables"]["activities"]["Row"][]>([])
  const supabase = useSupabaseClient()
  const [page, setPage] = useState(1)
  const reviewPerPage = 10

  const handleShowMore = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("activities")
            .select("*")
            .order("name", { ascending: true })

        if (error) {
            console.log(error)
            toast.error("Fetching data failed")
        } else {
            setActivities(data)
        }
    }

    fetchData()
    setLoading(false)
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .or(`name.ilike.%${search}%, tag.ilike.%${search}%, desc.ilike.%${search}%`)
      .order("name", { ascending: true })
    
    if (error) {
      console.log(error)
      toast.error("Search error") 
    } else {
      setActivities(data as any)
    }
    setLoading(false)
  }
  
  return (
    <div className="flex flex-col px-7 md:px-10 lg:px-24 py-12 space-y-16">
        <div className="flex items-center justify-center">
            <div className="flex flex-col w-full md:w-[70%] space-y-14 items-center justify-center">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, translateY: "-120%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.5, type: "spring", duration: 1.5 }}
              >
                <Header textAlign="center" title="Activities" desc="Berbagai macam kegiatan dan unit yang ada di ITB" />
              </motion.div>
              <motion.div 
                className="relative w-full sm:w-[90%] md:w-[80%] mr-auto md:mx-auto"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", duration: 1.5 }}
              >
                  <Input className="rounded-full border-[#6F6F6F] py-4 md:py-6 font-roboto text-base md:text-[18px] px-4 md:px-8 placeholder:text-gray-400" placeholder="search review or tags" value={search} onChange={(e) => setSearch(e.target.value)}/>
                  <div className="cursor-pointer absolute rounded-full p-1 md:p-2 bg-[#111B47] right-1.5 md:right-2 top-[6px] md:top-[7px]" onClick={() => handleSearch()}>
                      {loading ? (
                        <>
                          <div className="hidden md:block">
                            <MoonLoader color="white" size={15} />
                          </div>
                          <div className="block md:hidden">
                            <MoonLoader  color="white" size={11} />
                          </div>
                        </>
                      ): (
                        <Search className="h-3.5 w-3.5 md:h-5 md:w-5 text-white"/>
                      )}
                  </div>
              </motion.div>
            </div>
        </div>
        <div className="columns-1 md:columns-2 space-y-6 gap-6 w-full">
            {activities.slice(0, reviewPerPage * page).map((activity) => {
                const { data: imgUrl } = supabase
                    .storage
                    .from("images")
                    .getPublicUrl(activity.img as string)
                activity.img = imgUrl.publicUrl

                return <ActivityCard data={activity}/>
                })}
        </div>
        <div className="flex justify-center items-center w-full mt-12">
        {page * reviewPerPage < activities.length ? (
          <Button size="lg" onClick={handleShowMore}>
            Show More
          </Button>
        ): (
          <></>
        )}
        </div>
    </div>
  )
}

export default ActivitiesPage