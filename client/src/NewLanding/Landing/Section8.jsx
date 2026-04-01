import { faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useMemo} from 'react'
import { useTranslation } from 'react-i18next';

const Section8 = () => {
    const { t } = useTranslation(['faq', 'landing']);
    
    // Get FAQs from translation file
    const faq = useMemo(() => {
        const questions = t('questions', { returnObjects: true, ns: 'faq' });
        // Handle case where questions might not be an array yet (e.g. during loading)
        return Array.isArray(questions) ? questions : [];
    }, [t]);
    
      const [expandedIndex, setExpandedIndex] = useState(0);
     const [searchQuery, setSearchQuery] = useState("");
   
    
      const toggleExpand = (index) => {
        if (expandedIndex === index) {
          setExpandedIndex(0); 
        } else {
          setExpandedIndex(index); 
        }
      };

      const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setExpandedIndex(-1); 
      };

      
      const filteredFaq = useMemo(() => {
        return faq.filter((item) => {
            return item.q.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }, [faq, searchQuery]);
   

  return (
    <div className='font-gilroy py-20'>
           <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/fan.svg' />
    <div className='  flex md:flex-row flex-col items-center md:items-start gap-10'>
        <div className=' md:w-[40%] '>
         

            <div className='mt-10 flex flex-col justify-center'>
               <p style={{
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #0285FF, #FFFFFF, #FFFFFF, #1EEF32)",
            WebkitBackgroundClip: "text",
          }} className='text-3xl font-semibold'>{t('title', { ns: 'faq' })}</p>
         <div className=' relative '>
          <input
            type="text"
            className="w-full focus:outline-none border border-white/20 bg-transparent px-3 py-1.5 rounded-md mt-5"
            placeholder={t('searchPlaceholder', { ns: 'faq' })}
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className=' absolute top-7 right-3 text-white'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          </div>
            </div>

            <div className='mt-10 flex justify-center'>
            <div className='relative overflow-hidden flex justify-center items-center'>
        <div className='w-full h-full absolute top-0 '>
            <div className='w-44 mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div>
            <div className=' w-20 h-16 absolute top-10 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className=' w-7 h-24 absolute top-16 -left-3 bg-[#00BA34] opacity-55 rounded-full '></div>
            <div className='w-44 mx-auto h-10 absolute bottom-0 left-0 right-0 opacity-60 bg-[#3055E3] rounded-full '></div>
        
        </div>
         <div className='w-full h-full flex justify-center items-center bg-[#8989890D] border border-white/5 rounded-2xl backdrop-blur-3xl p-5 '>
         <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className=" w-10/12 z-30 "
          />
        </div> 
        </div>
            </div>


          
        </div>

        <div className=' md:w-[60%] mx-auto '>
                  <div className=" text-black flex flex-col gap-5 mx-auto">
                         
                          {filteredFaq.slice(0, 5).map((data, index) => (
                            <div
                             
                              className={` ${
                                expandedIndex === index ? "bg-gradient-to-r from-[#17C969] to-[#0285FF] p-[0.9px] " : ""
                              } text-white cursor-pointer rounded-lg duration-500 `}
                            >
                              <div  key={index}
                              onClick={() => toggleExpand(index)}
                              className={`bg-[#0A0A0A] rounded-lg duration-500 px-10  transform transition ease-in-out ${
                                expandedIndex === index ? "h-full" : "h-full"
                              }`}>
                             <div className="flex py-3">
                                <div className="w-[90%]">
                                  <h1 className="font-medium py-2">{data.q}</h1>
                                </div>
                                <div className="w-[10%] flex items-center justify-center">
                                  <button
                                    className="font-bold"
                                   
                                  >
                                    {  expandedIndex === index ? (
                                            <FontAwesomeIcon
                                            icon={faMinus}
                                            className={`transform transition-transform duration-500`}
                                          />
                                    ) : (
                                        <FontAwesomeIcon
                                        icon={faPlus}
                                        className={`transform transition-transform duration-500 `}
                                      />
                                    )}
                                   
                                     
                                  </button>
                                </div>
                              </div>
                              <div
                                className={`duration-300 ease-in-out overflow-hidden ${
                                  expandedIndex === index
                                    ? "py-7 max-h-[300px] border-t border-[#F9F9F9]  rounded-b-md"
                                    : "max-h-0"
                                }`}
                              >
                                <p className="text-sm text-white duration-500">
                                  {data.a}
                                </p>
                              </div>
                              </div>
                            </div>
                          ))}
                        </div>
            </div>

    
    </div>
    </div>
  )
}

export default Section8