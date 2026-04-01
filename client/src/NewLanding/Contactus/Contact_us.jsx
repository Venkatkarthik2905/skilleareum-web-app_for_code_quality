import { faFacebookF, faInstagram, faLinkedin, faLinkedinIn, faTelegramPlane, faTwitter, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '../Layout/Footer'
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import '../../App.css';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { SERVER_URL } from '../../config'
import Header from '../../WebApp/Components/Pages/Layout/Header'

export default function Contact_us() {
  const { t } = useTranslation('contact');
          
  const[loading,setLoading]=useState(false)

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    
      const [errors, setErrors] = useState({
        firstName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    
      const validate = () => {
        let valid = true;
        const newErrors = {};
      
        if (!formData.firstName.trim()) {
          newErrors.firstName = t('validation.nameRequired');
          valid = false;
        }
      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = t('validation.emailRequired');
          valid = false;
        } else if (!emailPattern.test(formData.email)) {
          newErrors.email = t('validation.emailInvalid');
          valid = false;
        }
      
       
      
        if (!formData.message.trim()) {
          newErrors.message = t('validation.messageRequired');
          valid = false;
        }
      
       
      
        // console.log("Validation Errors:", newErrors);
        setErrors(newErrors);
      
        return valid;
      };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const isValid = validate();
        // console.log("Validation Result:", isValid);
      
        if (isValid) {
          setLoading(true);
          try {
            const response = await axios.post(`${SERVER_URL}/api/contactUs`, formData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            // console.log("Success:", response.data.message);
            
      
            setFormData({
              firstName: "",
              email: "",
              lastName: "",
              phoneNumber: "",
              message: "",
            });
            toast.success(t('messages.success'));
          } catch (error) {
            console.error("Error:", error.response?.data?.message || "Something went wrong");
            toast.error(t('messages.error'));
          }finally{
          setLoading(false);

          }
        }
      };
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handlePhoneChange = (value) => {
          setFormData({ ...formData, phoneNumber: value });
        };
      
        const [searchTerm, setSearchTerm] = useState("");
      
        const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
        };
      
    
  

    return (
        <div className='bg-black min-h-screen text-white font-gilroy '>
            <Header/>
            <div className='py-7 flex flex-col md:flex-row justify-between gap-7 md:gap-0 items-center w-[90%] mx-auto'>
                <div>
                    <img src='../assets/New/fan.svg' className='w-10 md:w-auto'/>
                    <div className='mt-3 flex justify-center'>
                        <h1 className='text-2xl md:text-5xl leading-snug font-semibold text-transparent bg-gradient-to-r from-[#0285FF] via-white to-[#1EEF32] bg-clip-text '>
                            {t('title')}<br />
                            {t('subtitle')} 
                        </h1>
                    </div>
                </div>
                {/* <div className='flex flex-row md:flex-col gap-3 text-lg'>
                        <a href='https://web.telegram.org/a/#1515760210' target="_blank" ><button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                       <button className='w-10 h-10 rounded-full bg-black'>
                      <FontAwesomeIcon icon={faTelegramPlane} />
                                </button>
                            </button></a>

                        <a href='https://www.facebook.com/skilleareum/' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                       <button className='w-10 h-10 rounded-full bg-black'>
                       <FontAwesomeIcon icon={faFacebookF} />

                                </button>
                            </button></a>

                           
                            <a href='https://www.linkedin.com/company/skilleareum' target="_blank">  <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                   <FontAwesomeIcon icon={faLinkedinIn} />
                                </button>
                            </button></a>
                            <a href='https://www.instagram.com/skilleareum/' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                <FontAwesomeIcon icon={faInstagram} />

                                </button>
                            </button></a>
                            <a href='https://x.com/Skilleareum' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                                <FontAwesomeIcon icon={faXTwitter} />
                                </button>
                            </button></a>
                           
                            <a href='https://www.youtube.com/channel/UCM_ThaIJyw6iTjWc7jubIgw' target="_blank" > <button className='p-[1px] text-lg rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32]'>
                                <button className='w-10 h-10 rounded-full bg-black'>
                               <FontAwesomeIcon icon={faYoutube} />
                                </button>
                            </button></a>
                        </div> */}
            
            </div>
            <div className='mt-10  w-[90%] mx-auto'>
                <div className='grid lg:grid-cols-3 gap-7 lg:gap-10'>
                    <div>
                        <label className='md:text-lg'>{t('form.name')}</label>
                        <input name='firstName'  value={formData.firstName}
                    onChange={handleChange} required className='py-2 px-3 bg-transparent w-[100%] border-b outline-none'></input>
                    {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                    </div>
                    <div>
                        <label className='md:text-lg'>{t('form.email')}</label>
                        <input name='email' value={formData.email}
                  onChange={handleChange} required type='email' className='py-2 px-3 bg-transparent w-[100%] border-b outline-none'></input>
                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className='md:text-lg'>{t('form.phone')}</label>
                        <PhoneInput
      country={"us"}
      value={formData.phoneNumber}
      onChange={handlePhoneChange}
      containerClass="custom-phone-input-container"
      inputClass="custom-phone-input"
      buttonClass="custom-phone-dropdown-button"
      dropdownClass="custom-phone-dropdown"
      searchPlaceholder="Search"
      searchNotFound="No results found"
      searchValue={searchTerm}
      onSearchChange={handleSearchChange}
      enableSearch
      className='py-1 px-3 bg-transparent w-[100%] border-b outline-none'

    />
                    </div>
                </div>
                <div className='mt-7'>
                    <label className='md:text-lg'>{t('form.message')}</label>
                    <textarea
               name="message"
               value={formData.message}
               onChange={(e) => {
                 if (e.target.value.length <= 200) {
                   handleChange(e);
                 }
               }}
               rows="4"
               required className='py-2 px-3 bg-transparent w-[100%] border-b outline-none'></textarea>
                 {errors.message && (
                  <p className="text-red-500 text-sm ">{errors.message}</p>
                )}
                </div>
                <button  
  onClick={handleSubmit} 
  disabled={loading} 
  className={`mt-10 px-6 py-2 cursor-pointer rounded-full text-white flex items-center justify-center gap-3 font-semibold transition-all duration-300 ${
    loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#0285FF] to-[#1EEF32]"
  } w-64 h-12`}
>
  {loading ? (
    <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    <>
      {t('form.submit')} 
      <FontAwesomeIcon icon={faArrowRight} className="border text-xs rounded-full p-1" />
    </>
  )}
</button>


            </div>
            <Footer/>
        </div>
    )
}
