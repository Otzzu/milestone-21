"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useCreateReviewModal from "@/hooks/use-create-review-modal"
import Modal from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"


const formSchema = z.object({
    content: z.string().min(1),
    tags: z.string().min(1)
})

const AddReviewModal = () => {
  const { open, onClose } = useCreateReviewModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tags: ""
    }
  })
  const supabase = useSupabaseClient()
  const user = useUser()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formatedData: {
      user_id?: string,
      content: string,
      tags: string[]
    } = {
      user_id: user?.id,
      content: data.content,
      tags: data.tags.split(" ")
    }

    const { error } = await supabase
      .from("review")
      .insert(formatedData)
    
    if (error) {
      console.log(error)
      toast.error("Create Failed")
    } else {
      toast.success("Create Succesfull")
    }

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
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                            <Textarea placeholder="write a review here" className="resize-y h-[200px]" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                            <Input placeholder="write a tag here" {...field}/>
                        </FormControl>
                        <FormDescription>Pisahkan tag satu dengan yang lain menggunakan spasi (ex: "OSKM CDT")</FormDescription>
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

export default AddReviewModal