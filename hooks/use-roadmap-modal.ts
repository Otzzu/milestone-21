import { RoadmapModalData } from '@/types';
import { create } from "zustand"

interface RoadmapModalProps {
    open: boolean,
    data: RoadmapModalData,
    setData: (d: RoadmapModalData) => void,
    onOpen: () => void,
    onClose: () => void,
}

const useRoadmapModal = create<RoadmapModalProps>((set) => ({
    open: false,
    data: {semester:"", tahun: "", desc: "", details: []},
    setData: (d) => set({ data: d }),
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false}),
}))

export default useRoadmapModal