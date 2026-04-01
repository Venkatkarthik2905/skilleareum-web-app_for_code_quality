import React from 'react'
import { useTranslation } from 'react-i18next';

const Section3 = () => {
  const { t } = useTranslation('about');
  return (
    <div className=' font-gilroy py-20 flex lg:flex-row flex-col items-start justify-center overflow-hidden'>

      <div  data-aos="fade-up"  data-aos-duration="2000" className=' lg:w-[45%] w-full translate-x-14 '>
      <div className=' flex justify-start'>
      <div className=' flex justify-center'>
      <h1 className=' text-2xl sm:text-4xl lg:text-5xl font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section3.title')}</h1>
          </div>
          </div>
          <div className='mt-4 text-sm font-medium text-[#909090] '>
          <p>{t('section3.subtitle')}</p>
          </div>

          <div className='text-[#909090] mt-7'>
          <a href="https://t.me/SKLRM_bot" target="_blank"><p className='text-xs'>{t('section3.request')}</p></a>
          </div>
          </div>

          <div  data-aos="fade-right"  data-aos-duration="2500" className="lg:w-[90%] mx-auto md:block hidden ">
            
              <div className="w-[100%]  relative ">
                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Roadmap.svg" className=' scale-110 '></img>
                <div>
                  <div className="absolute left-[5%] top-[4%]">
                    <div>
                      <div className="flex justify-center">
                        <div className="px-3 text-sm 2xl:text-base border border-white/20 rounded-full">
                          v0.1
                        </div>
                      </div>
                      <p className="mt-1 font-semibold text-sm 2xl:text-base text-[#f3f3f3]">{t('section3.milestones.m1')}</p>
                      <div className="flex flex-col items-center">
                        <div className="w-[2px] h-7 lg:h-10 bg-gray-500 rounded-md"></div>
                        <div className="mt-[1px] w-2 h-2 rounded-md bg-white"></div>
                      </div>
                      <div className="mt-1 flex justify-center">
                        <div className="text-black bg-[#ccc] px-3 rounded-full text-sm 2xl:text-base font-semibold">2023</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[21%] top-[11%]">
                    <div>
                      <div className="flex justify-center">
                        <div className="px-3 font-semibold text-sm 2xl:text-base border border-white/20 rounded-full">
                          v0.2
                        </div>
                      </div>
                      <p className="mt-1 text-sm 2xl:text-base text-[#f3f3f3]">{t('section3.milestones.m2')}</p>
                      <div className="flex flex-col items-center">
                        <div className="w-[2px] h-7 lg:h-10 bg-gray-500 rounded-md"></div>
                        <div className="mt-[1px] w-2 h-2 rounded-md bg-white"></div>
                      </div>
                      <div className="mt-1 flex justify-center">
                        <div className="text-black bg-[#ccc] px-3 rounded-full text-sm 2xl:text-base font-semibold">2024</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[37%] top-[14%]">
                    <div>
                      <div className="flex justify-center">
                        <div className="px-3 font-semibold text-sm 2xl:text-base border border-white/20 rounded-full">
                          v0.2
                        </div>
                      </div>
                      <p className="mt-1 text-sm 2xl:text-base text-[#f3f3f3]">{t('section3.milestones.m3')}</p>
                      <div className="flex flex-col items-center">
                        <div className="w-[2px] h-7 lg:h-10 bg-gray-500 rounded-md"></div>
                        <div className="mt-[1px] w-2 h-2 rounded-md bg-white"></div>
                      </div>
                      <div className="mt-1 flex justify-center">
                        <div className="text-black bg-[#ccc] px-3 rounded-full text-sm 2xl:text-base font-semibold">2024</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[53%] top-[2%]">
                    <div>
                    <div className="flex justify-center">
                        <div className="px-3 font-semibold text-sm 2xl:text-base border border-white/20 rounded-full">
                          v0.3
                        </div>
                      </div>
                      <p className="mt-1 text-sm 2xl:text-base text-[#f3f3f3]">{t('section3.milestones.m4')}</p>
                      <div className="flex flex-col items-center">
                        <div className="w-[2px] h-7 lg:h-10 bg-gray-500 rounded-md"></div>
                        <div className="mt-[1px] w-2 h-2 rounded-md bg-white"></div>
                      </div>
                      <div className="mt-1 flex justify-center">
                        <div className="text-black bg-[#ccc] px-3 rounded-full text-sm 2xl:text-base font-semibold">2024</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-[20%] top-[10%]">
                    <div>
                      <div className="flex justify-center">
                        <div className="p-[1px] text-sm 2xl:text-base bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full text-[#0285FF]">
                          <div className="px-3 bg-black rounded-full font-semibold">
                            v0.4
                          </div>
                        </div>
                      </div>
                      <p className="mt-1 text-[#0285FF] font-bold">{t('section3.milestones.premium')}</p>
                      <div className="flex flex-col items-center">
                      
                        <div className="w-[2px] h-7 lg:h-10 bg-gray-500 rounded-md"></div>
                        <div className=' border border-[#0285FF] animate-pulse w-5 h-5 flex justify-center items-center rounded-full '>
                        <div className=' border border-[#1EEF32] animate-pulse w-4 h-4 flex justify-center items-center rounded-full '>
                        <div className="mt-[1px] w-2 h-2 rounded-md bg-white"></div>
                        </div>
                        </div>
                      </div>
                      <div className="mt-1 flex justify-center">
                        <div className="text-black bg-gradient-to-r from-[#0285FF] to-[#1EEF32] px-3 rounded-full text-sm 2xl:text-base font-semibold">2025</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[2%] bottom-[50%] text-xs 2xl:text-sm text-center text-gray-500">
                    {t('section3.details.v011')}
                  </div>
                  <div className="absolute left-[19%] bottom-[42%] text-xs 2xl:text-sm text-center text-gray-500">
                    {t('section3.details.v022')}
                  </div>
                  <div className="absolute left-[36%] bottom-[35%] text-xs 2xl:text-sm text-center text-gray-500">
                    {t('section3.details.v033')}
                  </div>
                  <div className="absolute right-[36%] top-[37%] text-xs 2xl:text-sm text-center text-gray-500">
                    {t('section3.details.v034')}
                  </div> 
                  <div className="absolute right-2 bottom-[50%] text-xs 2xl:text-sm text-center text-gray-500">
                    <span className="text-gray-100">{t('section3.details.comingSoon')}</span><br /> {t('section3.details.nft')}
                  </div>
                  <div className="absolute right-[15%] bottom-[35%] text-xs 2xl:text-sm text-center text-gray-500">
                    <span className="text-gray-100">{t('section3.details.comingSoon')}</span><br /> {t('section3.details.tge')}
                  </div>
                
                 
                </div>
              </div>
          </div>

          <div className=' md:hidden block mt-10'>
            <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/roadmap.png ' className=' ' />
          </div>
        
    </div>
  )
}

export default Section3