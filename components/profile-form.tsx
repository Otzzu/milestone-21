"use client"

import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from "framer-motion"

import { Database } from '@/types_db'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { ChevronDown, CheckIcon } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const faculties = [
  {
    name: "FITB",
    major: [
      "Teknik Geologi",
      "Teknik Geodesi dan Geomatika",
      "Meteorologi",
      "Oseanografi",
    ]
  },
  {
    name: "FMIPA",
    major: [
      "Aktuaria",
      "Astronomi",
      "Fisika",
      "Kimia",
      "Matematika"
    ]
  },
  {
    name: "FSRD",
    major: [
      "Desain Interior",
      "Desain Komunikasi Visual",
      "Desain Produk",
      "Kriya",
      "Seni Rupa"
  ]
  },
  {
    name: "FTMD",
    major: [
      "Teknik Dirgantara",
      "Teknik Material",
      "Teknik Mesin"
    ]
  },
  {
    name: "FTTM",
    major: [
      "Teknik Geofisika",
      "Teknik Metalurgi",
      "Teknik Perminyakan",
      "Teknik Pertambangan"
  ]
  },
  {
    name: "FTSL",
    major: [
      "Rekayasa Infrastruktur Lingkungan",
      "Teknik dan Pengelolaan Sumber Daya Air",
      "Teknik Kelautan",
      "Teknik Lingkungan",
      "Teknik Sipil"
    ]
  },
  {
    name: "FTI",
    major: [
      "Manajemen Rekayasa Industri",
      "Teknik Bioenergi dan Kemurgi",
      "Teknik Fisika",
      "Teknik Industri",
      "Teknik Kimia",
      "Teknik Pangan"
    ]
  },
  {
    name: "SAPPK",
    major: [
      "Arsitektur",
      "Perencanaan Wilayah dan Kota"
    ]
  }, {
    name: "SF",
    major: [
      "Manajemen Rekayasa Industri",
      "Teknik Bioenergi dan Kemurgi",
      "Teknik Fisika",
      "Teknik Industri",
      "Teknik Kimia",
      "Teknik Pangan"
    ]
  }, {
    name: "SF",
    major: [
      "Farmasi Klinik dan Komunitas",
      "Sains dan Teknologi Farmasi"
  ]
  }, {
    name: "SITH",
    major: [
      "Biologi",
      "Mikrobiologi",
      "Rekayasa Hayati",
      "Rekayasa Pertanian",
      "Rekayasa Kehutanan",
      "Teknologi Pascapanen"
  ]
  }, {
    name: "STEI",
    major: [
      "Sistem dan Teknologi Informasi",
      "Teknik Biomedis",
      "Teknik Elektro",
      "Informatika",
      "Teknik Telekomunikasi",
      "Teknik Tenaga Listrik"
  ]
  }
]

const formSchema = z.object({
    email: z.string().email(),
    fullName: z.string(),
    faculty: z.string(),
    major: z.string()
})

const ProfileForm = ({
    user,
    reload = false
}:{
    user: Database["public"]["Tables"]["users"]["Row"],
    reload?: boolean
}) => {
  const loginUser = useUser()
  const supabase = useSupabaseClient()
  const [openFaculty, setOpenFaculty] = useState(false)
  const [openMajor, setOpenMajor] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          email: user.email || "",
          fullName: user.full_name || "",
          faculty: user.faculty || "",
          major: user.major || ""
      }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!disabled) {
      const { error } = await supabase
        .from("users")
        .update({full_name: data.fullName, faculty: data.faculty, major: data.major})
        .eq("id", user.id)

      if (error) {
        console.log(error)
        toast.error("Update data failed")
      } else {
        toast.success("Update data success")
      }
      setDisabled(true)
      setTimeout(() => {
        reload && window.location.reload()
      }, 1000)
    } else {
      setDisabled(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <motion.div 
        className="justify-center items-center flex mb-10 sm:mr-16"
        initial={{ opacity: 0, translateX: "-80%" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: 0.8, type: "spring", duration: 1.5 }}
      >
        <Avatar className="w-[250px] h-[250px] md:w-[300px] md:h-[300px]">
          <AvatarImage src={user.avatar_url ? user.avatar_url : "/profile.jpg"} alt="profile"/>
          <AvatarFallback>{user.full_name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </motion.div>
    <div className='max-w-[600px] flex-1'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0, translateX: "80%" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 1, type: "spring", duration: 1.5 }}
            >
            <FormField 
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className='border disabled:border-gray-400' disabled/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: "80%" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 1.2, type: "spring", duration: 1.5 }}
            >
            <FormField 
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} className='border border-gray-400' disabled={disabled}/>
                  </FormControl>
                </FormItem>
              )}
            />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: "80%" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 1.4, type: "spring", duration: 1.5 }}
            >
            <FormField 
              control={form.control}
              name='faculty'
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fakultas</FormLabel>
                  <Popover open={openFaculty} onOpenChange={setOpenFaculty}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button disabled={disabled} variant="outline" role="combobox" className={cn("disabled:cursor-not-allowed border-gray-400 px-4 rounded-md w-full justify-between",!field.value && "text-muted-foreground")}>
                        {field.value
                        ? faculties.find(
                            (faculty) => faculty.name === field.value
                          )?.name
                        : "Select faculty"}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="h-[150px] w-[600px] overflow-hidden p-0">

                    <Command>
                    <CommandInput
                      placeholder="Search faculty..."
                      className="h-9"
                    />
                    <CommandEmpty>No faculty found.</CommandEmpty>
                    <ScrollArea>
                    <CommandGroup>
                      {faculties.map((faculty) => (
                        <CommandItem
                        value={faculty.name}
                        key={faculty.name}
                          onSelect={() => {
                            form.setValue("faculty", faculty.name)
                            setOpenFaculty(false)
                          }}
                          >
                          {faculty.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              faculty.name === field.value
                              ? "opacity-100"
                              : "opacity-0"
                              )}
                              />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                      </ScrollArea>
                  </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: "80%" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 1.6, type: "spring", duration: 1.5 }}
              >
            <FormField 
              control={form.control}
              name='major'
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Jurusan</FormLabel>
                  <Popover open={openMajor} onOpenChange={setOpenMajor}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button disabled={disabled} variant="outline" role="combobox" className={cn("disabled:cursor-not-allowed border-gray-400 px-4 rounded-md w-full justify-between",!field.value && "text-muted-foreground")}>
                        {field.value
                        ? faculties[faculties.findIndex(
                            (faculty) => faculty.name === form.getValues("faculty")
                          )].major.find(
                            (m) => m === field.value
                          )
                        : "Select major"}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="h-[150px] w-[600px] overflow-hidden p-0">

                    <Command>
                    <CommandInput
                      placeholder="Search major..."
                      className="h-9"
                    />
                    <CommandEmpty>No major found.</CommandEmpty>
                    <ScrollArea>
                    <CommandGroup>
                      {faculties.find(
                            (faculty) => faculty.name === form.getValues("faculty")
                          )?.major.map((major) => (
                        <CommandItem
                        value={major}
                          key={major}
                          onSelect={() => {
                            form.setValue("major", major)
                            setOpenMajor(false)
                          }}
                        >
                          {major}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              major === field.value
                              ? "opacity-100"
                              : "opacity-0"
                              )}
                              />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                      </ScrollArea>
                  </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            </motion.div>
            {loginUser?.id === user.id && (
              <div className="flex space-x-2 mt-4">
            <motion.div
              initial={{ opacity: 0, translateX: "80%" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 1.8, type: "spring", duration: 1.5 }}
              >
            <Button type='submit' className="w-[92px]">
              {disabled ? "Edit" : "Submit"}
            </Button>
            </motion.div>
            <AnimatePresence>
            {!disabled && (
              <motion.div
              initial={{ opacity: 0, translateX: "80%" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 0, type: "spring", duration: 1 }}
              exit={{ opacity: 0, translateX: "80%" }}
              >
                <Button className="w-[92px]" type='button' variant="outline" onClick={() => setDisabled(true)}>
                  Cancel
                </Button>
              </motion.div>
            )}
                </AnimatePresence>
            </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProfileForm