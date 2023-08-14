import { create } from "zustand"

interface AddActivityModalProps {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useAddActivityModal = create<AddActivityModalProps>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
}))

export default useAddActivityModal