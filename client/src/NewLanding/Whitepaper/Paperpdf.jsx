import React ,{useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { pdfjs, Document, Page } from 'react-pdf';
import whitepaper from "./SkilleareumLitepaper.pdf"
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import "../../App.css"



pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Paperpdf = () => {
    const { t } = useTranslation('whitepaper');

    const [numPages, setnumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [width, setWidth] = useState(600);

    useEffect(() => {
      const updateWidth = () => {
        setWidth(window.innerWidth < 640 ? window.innerWidth * 0.9 : 600);
      };
      
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);
  
    const onDocumentLoadSuccess = ({numPages}) => {
      setnumPages(numPages);
    }

    const nextpage = () => {
        if (pageNumber < numPages) {
          setPageNumber((prev) => prev + 1);
        }
      };
    
      const prevpage = () => {
        if (pageNumber > 1) {
          setPageNumber((prev) => prev - 1);
        }
      };

      useEffect(() => {
        const detectScreenshot = () => {
          navigator.clipboard.readText().then((text) => {
            if (text.includes("data:image")) {
              document.body.style.filter = "blur(100px)";
              setTimeout(() => document.body.style.filter = "none", 3000);
            }
          });
        };
      
        window.addEventListener("keyup", (e) => {
          if (e.key === "PrtScr") {
            detectScreenshot();
          }
        });
      
        return () => window.removeEventListener("keyup", detectScreenshot);
      }, []);
      

  return (
    <div onContextMenu={(e) => e.preventDefault()} className='w-full bg-black pdfcontainer h-screen overflow-hidden overflow-y-auto'>
        <Header/>
    <div onContextMenu={(e) => e.preventDefault()} className='  w-full mx-auto flex flex-col justify-center items-center  '>
         
    <div onContextMenu={(e) => e.preventDefault()} className="border border-gray-600 p-2 shadow-lg bg-white overflow-hidden max-w-full pdfcontainer">
          <Document
            file={whitepaper}
            onLoadSuccess={onDocumentLoadSuccess}
            onContextMenu={(e) => e.preventDefault()}
            className="flex justify-center select-none"
          >
            <Page
              key={pageNumber} 
              pageNumber={pageNumber}
              width={width}
              renderTextLayer={false} 
              renderAnnotationLayer={false} 
            />
          </Document>
        </div>
            <div className=' flex items-center gap-5 mt-5'>
            <button className=' rounded-full px-3 md:px-5 py-1 md:py-2 bg-black border border-white text-white font-semibold  md:text-base text-sm' onClick={prevpage} disabled={pageNumber===1}  >{t('prev')}</button>
            <p className="text-white font-medium text-xs md:text-sm ">{` ${pageNumber} ${t('of')} ${numPages || "?"}`}</p>
            <button className=' rounded-full px-3 md:px-5 py-1 md:py-2 bg-black border border-white text-white font-semibold md:text-base text-sm ' onClick={nextpage} disabled={pageNumber===numPages}  >{t('next')}</button>
            </div>
        </div>
    <Footer/>
    </div>
  )
}

export default Paperpdf