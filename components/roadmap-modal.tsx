import Modal from '@/components/ui/modal'
import { Separator } from './ui/separator'
import DetailsCard from './details-card'
import { ScrollArea } from './ui/scroll-area'
import useRoadmapModal from '@/hooks/use-roadmap-modal'

const RoadMapModal = () => {
  const { open, onClose, data } = useRoadmapModal()

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return ( 
    <Modal title={`Tahun ${data.tahun} semester ${data.semester}`} desc={`Rekomendasi kegiatan untuk tahun ${data.tahun} semester ${data.semester}`} onChange={onChange} open={open} className='max-w-[85%] max-h-[85%] pr-0'>
        <ScrollArea className='w-full h-[500px] pr-6'>
        <div className='w-full h-fit mb-2'>
            <h2 className='font-roboto text-black font-bold text-base'>
                Rekomendasi
            </h2>
            <p className='font-poppins text-sm font-normal text-[#425466]'>
              {data.desc}
            </p>
        </div>
        <Separator />
        <div className='flex flex-col space-y-4 mt-2'>
            <h2 className='font-roboto text-black font-bold text-base'>
                Penjelasan Kegiatan
            </h2>
            <div className='columns-2 space-y-4 gap-4 w-full'>
                {data.details.map((detail) => (
                  <DetailsCard key={detail} detail={detail}/>
                ))}
            </div>
        </div>
        </ScrollArea>
    </Modal>
  )
}

export default RoadMapModal