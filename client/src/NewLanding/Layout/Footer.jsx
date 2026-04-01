import React, { useState } from 'react'
import '../../App.css';
import { Link } from "react-router-dom";
import { MAILGUN_API_KEY, SERVER_URL } from '../../config';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation('common');

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
   
    const handleSubmit = async (e) => {
      e.preventDefault();
    
   
    if(email===""){
      toast.error(t('messages.enterEmail'))
    }
      if (email) {
        setLoading(true);
        try {
          const response = await axios.post(`${SERVER_URL}/api/subscribe`, {email,isSubscribe:true}, {
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          // console.log("Success:", response.data.message);
          
    
          setEmail("");
          toast.success(t('messages.thanksSubscription'),
            {
              style: {
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: '700',
                backgroundColor:'#16a34a',
                border: '1px solid #0abf3095',
                color: '#fff',
              },
            }
          );
        } catch (error) {
          console.error("Error:", error.response?.data?.message || "Something went wrong");
          toast.error(t('messages.subscriptionDone'),
            {
                  style: {
                    borderRadius: '3px',
                    fontSize: '14px',
                    fontWeight: '700',
                    backgroundColor:'#B22222',
                    border: '1px solid #B22222',
                    color: '#fff',
                  },
                }
          );
        }finally{
        setLoading(false);

        }
      }
    };

    return (
        <div className=' font-gilroy '>
          
            <div className='footer-blur rounded-t-lg backdrop-blur-md bg-[#8989890D] p-5 mt-10 text-white'>
                <div className='flex flex-col md:flex-row gap-3 lg:gap-0 justify-between items-center px-5 pb-3 border-b border-white/20'>
                <div className='flex items-center gap-1 flex-shrink-0 '>
                <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif' className='w-20 h-20' alt='logo'/>
                <p
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient( to right, #00E0FF, #061FA1 ) ",
                    }}
                    className="  uppercase font-semibold text-2xl font-zendots "
                  >
                    Skilleareum
                  </p>
            </div>

            
                    <div className='flex flex-col md:flex-row items-center gap-3'>
                        <h1>{t('footer.followUs')}</h1>
                        <div className='flex items-center gap-3'>
                        <a href='https://web.telegram.org/a/#1515760210' target="_blank" ><button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                       <button className='w-10 h-10 rounded-full bg-black'>
                       <i class="fa-brands fa-telegram"></i>
                                </button>
                            </button></a>

                        <a href='https://www.facebook.com/skilleareum/' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                       <button className='w-10 h-10 rounded-full bg-black'>
                                <i class="fa-brands fa-square-facebook"></i>
                                </button>
                            </button></a>

                           
                            <a href='https://www.linkedin.com/company/skilleareum' target="_blank">  <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                    <i class="fa-brands fa-linkedin-in"></i>
                                </button>
                            </button></a>
                            <a href='https://www.instagram.com/skilleareum/' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                    <i class="fa-brands fa-instagram"></i>
                                </button>
                            </button></a>
                            <a href='https://x.com/Skilleareum' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                    <i class="fa-brands fa-x-twitter"></i>
                                </button>
                            </button></a>
                           
                            <a href='https://www.youtube.com/channel/UCM_ThaIJyw6iTjWc7jubIgw' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                <i class="fa-brands fa-youtube"></i>
                                </button>
                            </button></a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between gap-3 py-5 px-10 mx-auto text-sm text-white/50 border-b border-white/20">
                    <div className='w-[47%] lg:w-auto'>
                        <h2 className="text-white font-semibold mb-3 text-base">{t('footer.links.home')}</h2>
                        <ul className="space-y-2">
    <li><Link to="/#future-benefits" className="hover:text-white">{t('footer.subLinks.futureBenefits')}</Link></li>
    <li><Link to="/#learn-earn" className="hover:text-white">{t('footer.subLinks.learnEarn')}</Link></li>
    <li><Link to="/#features" className="hover:text-white">{t('footer.subLinks.features')}</Link></li>
</ul>
                    </div>

                    <div className='w-[47%] lg:w-auto'>
                        <h2 className="text-white font-semibold mb-3 text-base">{t('footer.links.aboutUs')}</h2>
                        <ul className="space-y-2">
    <li><Link to="/Aboutus#vision-mission" className="hover:text-white">{t('footer.subLinks.visionMission')}</Link></li>
    <li><Link to="/Aboutus#roadmap" className="hover:text-white">{t('footer.subLinks.roadmap')}</Link></li>
    <li><Link to="/Aboutus#tokenomics" className="hover:text-white">{t('footer.subLinks.tokenomics')}</Link></li>
</ul>
                    </div>

                    <div className='w-[47%] lg:w-auto'>
                        <h2 className="text-white font-semibold mb-3 text-base">{t('footer.links.community')}</h2>

<ul className="space-y-2">
    <li><Link to="/Community#explore-section" className="hover:text-white">{t('footer.subLinks.explore')}</Link></li>
    <li><Link to="/Community#partnership" className="hover:text-white">{t('footer.subLinks.partnership')}</Link></li>
    <li><Link to="/Community#affiliate-program" className="hover:text-white">{t('footer.subLinks.affiliateProgram')}</Link></li>
</ul>

                    </div>

                    {/* <div className='w-[47%] lg:w-auto'> */}
                        {/* <h2 className="text-white font-semibold mb-3 text-base">About Us</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Our Team</a></li>
                            <li><a href="#" className="hover:text-white">Achievements</a></li>
                            <li><a href="#" className="hover:text-white">Awards</a></li>
                        </ul> */}
                    {/* </div> */}

                </div>
                <div className='flex flex-col md:flex-row justify-between gap-3 md:gap-0 items-center px-5 py-3 border-b border-white/20'>
                    <div className='w-[100%] md:w-auto'>
                        <div className='flex justify-start'>
                            <h1 className='text-lg font-medium text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text '>
                                {t('footer.newsletter.title')}
                            </h1>
                        </div>
                        <p className='text-white/50 text-xs mt-1'>{t('footer.newsletter.subtitle')}</p>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-end gap-2'>
                        <input type='email' className=' focus:outline-none border border-white/20 bg-transparent px-3 py-1.5 rounded-md w-[100%] md:w-[50%]' placeholder={t('footer.newsletter.placeholder')}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                         ></input>
                        <button disabled={loading} onClick={(e)=> handleSubmit(e)} className='px-6 py-1.5 rounded-md text-white bg-gradient-to-r from-[#0285FF] to-[#1EEF32] flex items-center gap-3 font-semibold'>{loading ? t('footer.newsletter.subscribing'):t('footer.newsletter.subscribe')}</button>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between gap-3 text-center md:text-start lg:gap-0 pt-3 px-5 items-center text-sm'>
                    <p>{t('footer.rights', { year: 2025 })}</p>
                    <p>{t('footer.version', { version: '1.0' })}</p>
                    <div className='flex flex-wrap gap-3 justify-center lg:justify-end'>
                        <p>{t('footer.privacyPolicy')}</p>
                        <p>{t('footer.termsConditions')}</p>
                        <p>{t('footer.cookiePolicy')}</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
