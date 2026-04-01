import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";

const Section2 = () => {
  const { t } = useTranslation('about');

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (

<div className=' font-poppins py-20'>
    <div className=' flex flex-col justify-center'>
    <div className=' flex justify-center'>
      <h1 className=' text-4xl lg:text-5xl text-center font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section2.title')}</h1>    
          </div>
           <h2 className='md:text-4xl  mt-2 font-medium text-center text-white'>{t('section2.subtitle')}</h2>
    </div>

    <div className='mt-20 overflow-hidden'>
       <Slider className="w-[95%]  md:translate-x-56 h-full " {...settings} >
        <div className=' px-2 '>
          <div className='w-full md:h-[275px] h-[350px] relative  flex flex-col items-center'>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Profile/Manju2.jpg" className='w-full object-cover object-center h-full' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Manjunath Vijay</p>
             <p className=' mt-3 text-sm '>{t('section2.roles.ceo')} </p>
            </div>
          </div>
        </div>
        <div className=' px-2 '>
        <div className='w-full md:h-[275px] h-[350px] relative  flex flex-col items-center'>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Profile/Sakthi2.jpg" className='w-full object-cover object-center  h-full' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Sakthi Visakan Rajaguru</p>
             <p className=' mt-3 text-sm '>{t('section2.roles.mentor')} </p>
            </div>
          </div>
        </div>
        <div className=' px-2 '>
        <div className='w-full md:h-[275px] h-[350px] relative  flex flex-col items-center'>
            <img src="/assets/Hudson.png" className='w-full h-full' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Hudson Daniel</p>
             <p className=' mt-3 text-sm '>{t('section2.roles.cmo')}</p>
            </div>
          </div>
        </div>
        <div className=' px-2 '>
        <div className='w-full md:h-[275px] h-[350px] bg-white relative flex flex-col items-center '>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Profile/Anup2.png" className='w-full h-full' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Anup Kumar </p>
             <p className=' mt-3 text-sm '>{t('section2.roles.cto')} </p>
            </div>
          </div>
        </div>
      
        <div className=' px-2 '>
        <div className='w-full md:h-[275px] h-[350px] relative flex flex-col items-center '>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Profile/Mani.jpg" className='w-full h-full ' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Mani</p>
             <p className=' mt-3 text-sm '>{t('section2.roles.leadDev')} </p>
            </div>
          </div>
        </div>
        <div className=' px-2 '>
        <div className='w-full md:h-[275px] h-[350px] relative flex flex-col items-center '>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Profile/Dinesh.jpg" className='w-full h-full ' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Dinesh </p>
             <p className=' mt-3 text-sm '>{t('section2.roles.smartContract')} </p>
            </div>
          </div>
        </div>
        <div className=' px-2 '>
        <div className='w-full md:h-[275px] h-[350px] relative flex flex-col items-center '>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Profile/Thomas.jpg" className='w-full h-full ' />
            <div className=' bg-white/30 border border-white/50 backdrop-blur-lg px-3 py-2 absolute bottom-3 left-0 right-0 w-[90%] mx-auto'>
             <p className='text-base font-semibold'>Emmanuel Thomas </p>
             <p className=' mt-3 text-sm '>{t('section2.roles.uiux')} </p>
            </div>
          </div>
        </div>
      
      
       </Slider>
    </div>

   
    </div>
  )
}

export default Section2