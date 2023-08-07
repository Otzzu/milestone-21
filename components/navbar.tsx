"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { User2 } from "lucide-react"

import logo from "@/public/logo.png"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import useAuthModal from "@/hooks/use-auth-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useCreateReviewModal from "@/hooks/use-create-review-modal"
import toast from "react-hot-toast"

const Navbar = () => {
  const pathName = usePathname()
  const { onOpenSignin, onOpenSignup } = useAuthModal()
  const { onOpen } = useCreateReviewModal()
  const supabase = useSupabaseClient()
  const user = useUser()

  // console.log(user)

  const logout = async () => {
    const { error } = await supabase
      .from("users")
      .update({ roadmap_data: null })
      .eq("id", user?.id)

    if (error) {
      console.log(error)
      toast.error("Logout failed")
    } else {
      await supabase.auth.signOut()
    }
    
  }

  const links = [{
    label: "Home",
    href: "/",
    active: pathName === "/"
  }, {
    label: "RoadMap",
    href: "/roadmap",
    active: pathName === "/roadmap"
  }, {
    label: "Review",
    href: "/review",
    active: pathName === "/review"
  }]

  return (
    <nav className="px-24 py-6 fixed w-full bg-white z-10">
        <div className="flex justify-between items-center">
            <div>
                <Image alt="logo" src={logo} />
            </div>
            <div className="flex items-center justify-end gap-5">
                {links.map((link) => (
                  <Link className={cn("text-base hover:text-[#111B47] font-roboto", link.active ? "text-[#111B47]" : "text-[#929ECC]")} key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <div className="gap-4 flex items-center justify-end">
                    {pathName === "/review" ? (
                      <Button variant="default" onClick={() => onOpen()}>
                        Add Review
                      </Button>
                    ) : (
                      <></>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full" asChild>
                        <Avatar>
                          <AvatarImage src={user.user_metadata.avatar_url ? user.user_metadata.avatar_url : "/profile.jpg"} alt="profile"/>
                          <AvatarFallback>{user.user_metadata.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="flex items-center">
                          <User2 className="w-4 h-4 mr-2"/>
                          My Profile
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Button className="w-full h-full rounded-md" onClick={() => logout()}>
                            Log out
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                  </div>
                ):(
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => onOpenSignin()}>
                      Sign In
                    </Button>
                    <Button variant="default" onClick={() => onOpenSignup()}>
                      Sign Up
                    </Button>
                </div>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar