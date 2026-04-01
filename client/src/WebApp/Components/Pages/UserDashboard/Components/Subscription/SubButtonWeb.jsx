import React from "react";
import { useTranslation } from "react-i18next";

export default function SubButtonWeb({ onClick }) {
    const { t } = useTranslation('dashboard');
    return (
<div  onClick={onClick}  className=" cursor-pointer rounded-2xl w-40 h-8 relative mt-2" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
<div className="h-8 w-40 absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
</div>
<div className="h-8 w-40 rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
</div>
<div className=" bg-[#070e3a4b] backdrop-blur-sm h-8 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
<div className="w-40 h-full absolute top-0 bottom-0 flex items-center justify-center">
    
        <p className="uppercase font-medium text-center font-zendots text-sm" style={{color: "transparent",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('subscription.subscribe')}</p>
    </div>
    </div>

    );
}
