import { create } from "zustand"

interface CreateReviewModalProps {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useCreateReviewModal = create<CreateReviewModalProps>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
}))

export default useCreateReviewModal