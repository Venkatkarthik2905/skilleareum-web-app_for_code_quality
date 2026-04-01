import React from 'react'
import { useTranslation } from 'react-i18next';

const Section5 = () => {
  const { t } = useTranslation('about');
  return (
    <div className='md:w-[90%] mx-auto font-gilroy py-14 '> 
        <div className=' flex justify-center'>
      <h1 className=' text-4xl lg:text-5xl text-center font-semibold '  style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }}>{t('section5.title')}</h1>
          </div>

          <div className='mt-10 bg-[#0d0d0d]  border border-[#FFFFFF]/40 rounded-xl p-5 flex lg:flex-row flex-col items-center justify-around gap-5'>
             <div className=' lg:w-[50%] w-[100%] '>
                <div className=' bg-[#1f2021] rounded-xl p-5 flex flex-col justify-start '>
                  <div className=' flex justify-start'>
                  <p style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"
            }}>{t('section5.totalTokenSupply')} </p>
            </div>
                  <p className=' text-2xl font-semibold mt-3 '>{t('section5.oneBillion')}</p>
                </div>

                <div className=' bg-[#1f2021] rounded-xl py-5 md:px-10 mt-5'>
                <div className=' w-[100%] mx-auto flex flex-col gap-2 px-3'>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#2C81FF]'></div>
  <p className='text-left  md:w-[50%] w-[55%] text-sm md:text-base'>{t('section5.distribution.sms')}</p>
  
  <p className=' w-[15%] text-sm md:text-base '>70%</p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#B8C1CC]'></div>
  <p className='text-left  md:w-[50%] w-[55%] text-sm md:text-base'>{t('section5.distribution.team')}</p>

  <p className=' w-[15%] text-sm md:text-base '>8%</p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#B8C1CC]'></div>
  <p className='text-left  md:w-[50%] w-[55%] text-sm md:text-base'>{t('section5.distribution.marketing')}</p>

  <p className=' w-[15%] text-sm md:text-base '>2%</p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#FFFFFF]'></div>
  <p className='text-left  md:w-[50%] w-[55%] text-sm md:text-base'>{t('section5.distribution.liquidity')}</p>
 
  <p className=' w-[15%] text-sm md:text-base '>12.5%</p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#FFE55F]'></div>
  <p className='text-left  md:w-[50%] w-[55%] text-sm md:text-base'>{t('section5.distribution.ecosystem')}</p>

  <p className=' w-[15%] text-sm md:text-base '> 2%</p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#FFE55F]'></div>
  <p className='text-left  md:w-[50%] w-[55%] text-sm md:text-base'>{t('section5.distribution.rewards')}</p>

  <p className=' w-[15%] text-sm md:text-base '> 3% </p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#FFE55F]'></div>
  <p className=' text-left  md:w-[50%] w-[55%] text-sm md:text-base '>{t('section5.distribution.reserve')}</p>

  <p className=' w-[15%] text-sm md:text-base '>2%</p>
</div>

<div className=' flex justify-between items-center  '>
  <div className=' w-3 h-3 bg-[#FFE55F]'></div>
  <p className=' text-left  md:w-[50%] w-[55%] text-sm md:text-base '>{t('section5.distribution.staking')}</p>

  <p className=' w-[15%] text-sm md:text-base '>0.5%</p>
</div>


</div>
                </div>
             </div>

             <div>
            {/* <img src=" https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/tokenomics2.svg " className=' scale-105 ' /> */}
            <img src='/assets/tokenomics2.svg' className='ml-10 w-10/12 '/>
          </div>
          </div>

       
    </div>
  )
}

export default Section5