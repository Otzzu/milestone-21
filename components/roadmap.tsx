"use client"

import RoadmapCard from '@/components/roadmap-card'
import { Separator } from '@/components/ui/separator'

import { motion } from 'framer-motion'

const RoadMap = () => {

  const roadmapData = {
    tahunPertama: {
      semester1: {
        semester: "GANJIL",
        tahun: "pertama",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        details: [{
          name: "KSEP",
          tag: "ksep",
          desc: "",
          img: "/ksep.jpeg"
        }, {
          name: "Wisokto",
          tag: "wisokto",
          desc: "",
          img: "/wisokto.jpeg"
        },]
      }, semester2: {
        semester: "GENAP",
        tahun: "pertama",
        desc: "Justo nec ultrices dui sapien eget mi proin. Dolor sit amet consectetur adipiscing. Scelerisque eu ultrices vitae auctor eu augue. Quis enim lobortis scelerisque fermentum dui faucibus in. Sapien faucibus et molestie ac. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Eu feugiat pretium nibh ipsum consequat. Vestibulum lectus mauris ultrices eros. Adipiscing vitae proin sagittis nisl",
        details: [{
          name: "OSKM",
          tag: "oskm",
          desc: "",
          img: "/oskm.jpeg"
        },]
      }
    },
    tahunKedua: {
      semester1: {
        semester: "GANJIL",
        tahun: "kedua",
        desc: "Viverra orci sagittis eu volutpat odio facilisis mauris sit. Amet massa vitae tortor condimentum lacinia quis vel. In hac habitasse platea dictumst quisque sagittis purus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Semper quis lectus nulla at volutpat diam. Nec nam aliquam sem et tortor consequat. Eu facilisis sed odio morbi quis commodo odio. Ut pharetra sit amet aliquam id diam maecenas. Consequat semper viverra nam libero. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Eget nunc lobortis mattis aliquam. Tristique nulla aliquet enim tortor at auctor. Consequat semper viverra nam libero. Elit ullamcorper dignissim cras tincidunt lobortis feugiat",
        details: [{
          name: "AMI",
          tag: "ami",
          desc: "",
          img: "/ami.jpeg"
        },{
          name: "IEEE",
          tag: "ieee",
          desc: "",
          img: "/ieee.jpeg"
        },]
      }, semester2: {
        semester: "GENAP",
        tahun: "kedua",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis aliquam faucibus purus in massa tempor nec. Sagittis vitae et leo duis ut diam quam nulla porttitor. At elementum eu facilisis sed. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Nisl pretium fusce id velit. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Risus viverra adipiscing at in tellus integer. Sed turpis tincidunt id aliquet risus feugiat. Id porta nibh venenatis cras sed felis eget velit. Urna molestie at elementum eu facilisis sed. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Nunc scelerisque viverra mauris in aliquam. Quis eleifend quam adipiscing vitae. At auctor urna nunc id cursus metus aliquam eleifend mi. Arcu bibendum at varius vel pharetra. Sit amet aliquam id diam maecenas ultricies mi eget mauris. At lectus urna duis convallis convallis tellus id interdum velit. Vel risus commodo viverra maecenas accumsan lacus vel. Consectetur adipiscing elit duis tristique sollicitudin nibh sit.",
        details: [{
          name: "OSKM",
          tag: "oskm",
          desc: "Et odio pellentesque diam volutpat commodo sed egestas. Vitae semper quis lectus nulla at volutpat diam ut. Curabitur vitae nunc sed velit dignissim sodales ut. In nibh mauris cursus mattis molestie a. Tellus mauris a diam maecenas sed enim ut sem. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eu volutpat odio facilisis mauris. Donec massa sapien faucibus et molestie ac feugiat sed. Posuere sollicitudin aliquam ultrices sagittis orci a. Lobortis feugiat vivamus at augue. In dictum non consectetur a erat nam at lectus. Consequat semper viverra nam libero justo laoreet. Ornare massa eget egestas purus viverra accumsan in. Tortor dignissim convallis aenean et tortor at risus. Id porta nibh venenatis cras. Eget magna fermentum iaculis eu non diam phasellus. \nVarius quam quisque id diam vel quam elementum pulvinar. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Dictum non consectetur a erat. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Mi bibendum neque egestas congue. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Amet tellus cras adipiscing enim eu. Enim praesent elementum facilisis leo vel fringilla. In dictum non consectetur a. Fermentum dui faucibus in ornare quam viverra orci. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Vulputate enim nulla aliquet porttitor. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Ut sem viverra aliquet eget sit amet.",
          img: "/oskm.jpeg"
        },{
          name: "CDT",
          tag: "cdt",
          desc: "",
          img: "/cdt.jpg"
        },{
          name: "GDSC",
          tag: "gdsc",
          desc: "",
          img: "/gdsc.png"
        },]
      }
    }
  }

  return (
    <div className='mt-5 flex flex-col space-y-4'>
      <div className='flex flex-col space-y-4'>
        <motion.h1 
          className='font-roboto text-black font-extrabold text-lg sm:text-xl md:text-2xl'
          initial={{ opacity: 0, translateX: "-80%" }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 0.6, type: "spring", duration: 1.5 }}
        >
          TAHUN PERTAMA
        </motion.h1>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-6 md:space-y-0'>
          <motion.div
            initial={{ opacity: 0, translateX: "-80%" }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.8, type: "spring", duration: 1.5 }}
          >
            <RoadmapCard data={roadmapData.tahunPertama.semester1}/>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: "80%" }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.8, type: "spring", duration: 1.5 }}
          >
            <RoadmapCard data={roadmapData.tahunPertama.semester2}/>
          </motion.div>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col space-y-4'>
        <motion.h1 
          className='font-roboto text-black font-extrabold text-lg sm:text-xl md:text-2xl'
          initial={{ opacity: 0, translateX: "-80%" }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 1, type: "spring", duration: 1.5 }}
        >
          TAHUN KEDUA
        </motion.h1>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-6 md:space-y-0'>
          <motion.div
            initial={{ opacity: 0, translateX: "-80%" }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 1.2, type: "spring", duration: 1.5 }}
          >
            <RoadmapCard data={roadmapData.tahunKedua.semester1}/>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: "80%" }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 1.2, type: "spring", duration: 1.5 }}
          >
            <RoadmapCard data={roadmapData.tahunKedua.semester2}/>
          </motion.div>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col space-y-4 w-full items-center justify-center'>
        <h1 className='font-poppins text-gray-500 font-bold text-lg sm:text-xl md:text-2xl'>
          COMING SOON
        </h1>
      </div>
    </div>
  )
}

export default RoadMap