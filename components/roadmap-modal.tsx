import Modal from '@/components/ui/modal'
import { Separator } from './ui/separator'

const RoadMapModal = () => {
  return ( 
    <Modal title='SEMESTER 1' desc='Rekomendasi kegiatan untuk semester 1' onChange={() => {}} open className='min-w-[85%] min-h-[85%]'>
        <div className='w-full h-fit'>
            <h2 className='font-roboto text-black font-bold text-base'>
                Rekomendasi
            </h2>
            <p className='font-poppins text-sm font-normal text-[#425466]'>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
        </div>
        <Separator />
        <div className='flex flex-col space-x-4'>
            <h2 className='font-roboto text-black font-bold text-base'>
                Penjelasan Kegiatan
            </h2>

        </div>
    </Modal>
  )
}

export default RoadMapModal