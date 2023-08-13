"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Menu, User2 } from "lucide-react"
import { motion } from "framer-motion"

import logo from "@/public/logo.png"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import useAuthModal from "@/hooks/use-auth-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useCreateReviewModal from "@/hooks/use-create-review-modal"
import toast from "react-hot-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { useState } from "react"

const Navbar = () => {
  const pathName = usePathname()
  const { onOpenSignin, onOpenSignup } = useAuthModal()
  const [openSide, setOpenSide] = useState(false)
  const { onOpen } = useCreateReviewModal()
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

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
      router.push("/")
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
    <nav className="px-7 md:px-10 lg:px-24 py-6 fixed w-full bg-white bg-opacity-50 backdrop-blur-[9px] z-10">
        <motion.div 
          initial={{ translateY: "-150%", opacity: 0.4 }}
          animate={{ translateY: "0", opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", duration: 1 }}
          className="flex justify-between items-center"
        >
            <div className="cursor-pointe" onClick={() => router.push("/")}>
                <Image alt="logo" src={logo} />
            </div>
            <div className="flex space-x-3 md:hidden">
                {pathName === "/review" ? (
                  <Button className="text-xs sm:text-sm" variant="default" onClick={() => onOpen()}>
                    Add Review
                  </Button>
                ) : (
                  <></>
                )}
              <Sheet open={openSide} onOpenChange={setOpenSide}>
                <SheetTrigger>
                  <Menu className="w-4 h-4"/>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col h-full sm:w-[40%] w-[60%]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center flex-row text-base sm:text-lg">
                      <User2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2"/>
                      My Account
                    </SheetTitle>
                  </SheetHeader>
                  <Separator/>
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col space-y-3">
                      {links.map((link) => (
                        <div onClick={() => setOpenSide(false)}>
                          <Link className={cn("text-[13px] sm:text-base hover:text-[#111B47] font-roboto", link.active ? "text-[#111B47]" : "text-[#929ECC]")} key={link.label} href={link.href}>
                            {link.label}
                          </Link>
                        </div>
                      ))}
                    </div>
                    {user && (
                      <>
                      <Separator className="my-4"/>
                      <div className="flex flex-col space-y-3">
                        <div onClick={() => setOpenSide(false)}>
                          <Link className={cn("text-[13px] sm:text-base hover:text-[#111B47] font-roboto", pathName.startsWith("/myprofile") ? "text-[#111B47]" : "text-[#929ECC]")} href={`/myprofile/${user.id}`}>
                              Profile
                          </Link>
                        </div>
                        <div onClick={() => setOpenSide(false)}>
                          <Link className={cn("text-[13px] sm:text-base hover:text-[#111B47] font-roboto", pathName.startsWith("/myreview") ? "text-[#111B47]" : "text-[#929ECC]")} href={`/myreview/${user.id}`}>
                              Review
                          </Link>
                        </div>
                      </div>
                      </>
                    )}
                    <div className="flex flex-1 flex-col justify-end space-y-3">
                      {user ? (
                        <Button variant="default" onClick={() => {setOpenSide(false); logout()}}>
                          Sign Out
                        </Button>
                      ): (
                        <>
                        <Button variant="outline" onClick={() =>{setOpenSide(false); onOpenSignin()}}>
                          Sign In
                        </Button>
                        <Button variant="default" onClick={() => {setOpenSide(false); onOpenSignup()}}>
                          Sign Up
                        </Button>
                        </>
                      )} 
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:flex items-center justify-end gap-5">
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
                        <Avatar className="hover:border border-[#23155b]">
                          <AvatarImage src={user.user_metadata.avatar_url ? user.user_metadata.avatar_url : "/profile.jpg"} alt="profile"/>
                          <AvatarFallback>{user.user_metadata.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="flex items-center">
                          <User2 className="w-4 h-4 mr-2"/>
                          My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`/myreview/${user.id}`)}>
                          Review
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/myprofile/${user.id}`)}>
                          Profile
                        </DropdownMenuItem>
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
        </motion.div>
    </nav>
  )
}

export default Navbar