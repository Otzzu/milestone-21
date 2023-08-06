import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { cn } from '@/lib/utils'

interface ModalProps {
    children?: React.ReactNode,
    open: boolean,
    onChange: (open: boolean) => void,
    title: string,
    desc: string,
    className?: string,
}

const Modal: React.FC<ModalProps> = ({
    children,
    open,
    onChange,
    title,
    desc,
    className
}) => {
  return (
    <Dialog open={open} onOpenChange={onChange}>
        <DialogContent className={cn("flex flex-col space-y-2", className)}>
            <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default Modal