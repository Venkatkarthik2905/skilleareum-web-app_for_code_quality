import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import { useTranslation } from "react-i18next";

export default function PaymentConfirmWeb() {
    const { t } = useTranslation('dashboard');
    return (
        <DashboardLayout>
        <div className='mt-28 overflow-hidden flex items-center justify-center'>
            <div>
                <div>
                    <div className='h-[140px] w-[160px] mx-auto mt-5 grid place-content-center' style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', background: 'linear-gradient(180deg, rgba(2, 133, 255, 0.3) 0%, rgba(30, 239, 50, 0) 100%)' }}>
                        <div className='h-[110px] w-[130px] grid place-content-center' style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',background: 'linear-gradient(180deg, rgba(2, 133, 255, 0.5) 0%, rgba(30, 239, 50, 0) 100%)'}}>
                            <div className='h-[80px] w-[100px] grid place-content-center' style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',background: 'linear-gradient(180deg, #0285FF 0%, #1EEF32 100%)'}}>
                                <FontAwesomeIcon icon={faCheck} className='text-4xl text-white'/>
                            </div>
                        </div>
                    </div>
                    <p className='font-zendots text-[#00FF18] uppercase font-medium text-center text-lg '>payment <br /> successful</p>
                </div>
                <div className='px-5 mt-2'>
                    <p className='bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent font-zendots uppercase text-center text-xs tracking-[1px]'>your ai genesis Subscription <br /> is now Activated</p>
                    <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" className="w-[120px] h-[120px] mx-auto mt-3" />

                    <div className=" cursor-pointer rounded-2xl w-full h-8 relative mt-3" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
                        <div className="h-8 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40 ">
                        </div>
                        <div className="h-8 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
                        </div>
                        <div className=" bg-[#070e3a4b] backdrop-blur-sm h-8 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
                        <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                            <p className="uppercase text-sm font-medium text-center font-zendots" style={{
                                color: "transparent",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"
                            }}>{t('subscription.startJourneyUpper')} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </DashboardLayout>
    )
}
