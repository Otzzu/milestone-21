import { cookies } from "next/headers"
import { Separator } from '@/components/ui/separator'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'
import ProfileHeaderAnimation from "@/components/profile-header-animation"
import ProfileForm from "@/components/profile-form"


const ProfilePage = async ({
  params
}:{
  params: { userId: string }
}) => {
  const supabase = createServerComponentClient<Database>({
    cookies: cookies
  })

  const { data: user, error} = await supabase
    .from("users")
    .select("*")
    .eq("id", params.userId)
    .single()

  if (error) {
    console.log(error)
    return null
  }

  return (
    <div className='flex flex-col px-7 md:px-10 lg:px-24 py-12'>
      <ProfileHeaderAnimation title={`My Review`} desc="Edit dan lihat profile anda"/>
      <Separator className='my-4'/>
      <ProfileForm user={user}/> 
    </div>
  )
}

export default ProfilePage