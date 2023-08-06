import { create } from "zustand"

interface FormModalProps {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useFormModal = create<FormModalProps>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
}))

export default useFormModal