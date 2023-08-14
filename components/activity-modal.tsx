"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import useAddActivityModal from "@/hooks/use-add-activity-modal"


const formSchema = z.object({
    image: z.string().min(1),
    name: z.string().min(1),
    tag: z.string().min(1),
    desc: z.string().min(1),
})

const AddActivityModal = () => {
  const { open, onClose } = useAddActivityModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      tag: "",
      desc: ""
    }
  })
  const supabase = useSupabaseClient()
  const user = useUser()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    form.reset()
    onClose()
    
  }

  const onChange = (open: boolean) => {
    if (!open) {
        onClose()
    }
  }

  return (
    <Modal open={open} onChange={onChange} title="Create Review" desc="Ceritakan pengalaman dan pendapatmu mengenai suatu kegiatan di ITB">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Foto</FormLabel>
                        <FormControl>
                            <Input placeholder="write a name here" type="image" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama Kegiatan</FormLabel>
                        <FormControl>
                            <Input placeholder="write a name here" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                            <Textarea placeholder="write a review here" className="resize-y h-[200px]" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                            <Input placeholder="write a tag here" {...field}/>
                        </FormControl>
                        <FormDescription>Pisahkan tag satu dengan yang lain menggunakan spasi{' (ex: "OSKM CDT")'}</FormDescription>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end w-full">
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Form>
    </Modal>
  )
}

export default AddActivityModal