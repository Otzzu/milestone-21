import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'

interface ModalProps {
    children: React.ReactNode,
    open: boolean,
    onChange: (open: boolean) => void,
    title: string,
    desc: string
}

const Modal: React.FC<ModalProps> = ({
    children,
    open,
    onChange,
    title,
    desc
}) => {
  return (
    <Dialog open={open} onOpenChange={onChange}>
        <DialogContent>
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