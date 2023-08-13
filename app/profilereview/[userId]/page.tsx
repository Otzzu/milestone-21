import ProfileForm from "@/components/profile-form"
import ProfileHeaderAnimation from "@/components/profile-header-animation"
import ReviewBox from "@/components/review-box"
import ReviewHeaderAnimation from "@/components/review-header-animation"
import { Separator } from "@/components/ui/separator"
import { ReviewWithUserProps } from "@/types"
import { Database } from "@/types_db"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const ProfileReviewPage = async ({
    params
}: {
    params: { userId: string }
}) => {
  const supabase = createServerComponentClient<Database>({
    cookies: cookies
  })

  const { error: errorUser, data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.userId)
    .single()
      
  const { error: errorReviews, data: reviews } = await supabase
    .from("review")
    .select("*, user_id!inner(*)")
    .eq("user_id.id", params.userId)

  if (errorReviews || errorUser) {
    console.log(errorReviews || "")
    console.log(errorUser || "")
    return null
  }


  return (
    <div className='flex flex-col px-7 md:px-10 lg:px-24 py-12'>
      <ProfileHeaderAnimation title={`${user?.full_name || user?.email} Profile`} desc=""/>
      <Separator className='my-4'/>
      <ProfileForm user={user} reload={true}/>
      <Separator className="my-4"/>
      <ReviewHeaderAnimation title={`${user?.full_name || user?.email} Review`} desc={`Semua review yang telah dibuat oleh ${user?.full_name || user?.email}`} delay={2}/>
      <ReviewBox data={reviews as any}/> 
    </div>
  )
}

export default ProfileReviewPage