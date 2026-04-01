import React from 'react';
// import { Spinner } from "@material-tailwind/react";


const DataSpinners = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-[#080B1C] backdrop-blur-md">
      <div className='flex items-center gap-3'>
   <div class="relative flex justify-center items-center">
    <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif' className='w-20'/>
</div><br/>
<p className="text-xl font-semibold text-white tracking-wide flex gap-1">
      Loading
      <span className="animate-bounce [animation-delay:0s]">.</span>
      <span className="animate-bounce [animation-delay:0.2s]">.</span>
      <span className="animate-bounce [animation-delay:0.4s]">.</span>
    </p>

   </div>
</div>
  );
};

export default DataSpinners; 