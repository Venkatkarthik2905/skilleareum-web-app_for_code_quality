import React from 'react'

const IslandLoader = () => {
  const tiles = [
    { id: 1, bottom: "32%", left: "47%" },
    { id: 3, top: "48%", left: "68%" },
    { id: 6, top: "24%", left: "68%" },
    { id: 4, top: "35%", left: "47%" },
    { id: 7, top: "20%", left: "48%" },
    { id: 5, top: "26%", left: "30%" },
    { id: 2, top: "48%", left: "20%" },
  ];



  return (
    <div
          className=" fixed inset-0 backdrop-blur bg-transparent bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins"
        >
         
         <div className="relative max-w-xl mx-auto w-full h-screen flex flex-col justify-center items-center space-y-4">
    <img
      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
      className="w-32"
      alt="Loading Mascot"
    />

    <p className="text-lg font-semibold tracking-wide flex gap-1">
      Loading
      <span className="animate-bounce [animation-delay:0s]">.</span>
      <span className="animate-bounce [animation-delay:0.2s]">.</span>
      <span className="animate-bounce [animation-delay:0.4s]">.</span>
    </p>


    {/* <div className="h-screen w-full  text-white font-poppins animate-pulse relative overflow-hidden">
      <div className="w-full flex justify-center items-center gap-2 pt-6">
        <div className="w-12 h-12 bg-gray-700 rounded-full" />
        <div className="w-32 h-4 bg-gray-700 rounded" />
      </div>

      <div className="flex items-center justify-start gap-1 mt-4 px-3">
        <div className="relative flex items-center rounded-full border border-[#1EEF32] px-2 py-1">
          <div className="w-8 h-8 bg-gray-700 rounded-full absolute -top-1 -left-2" />
          <div className="w-20 h-4 bg-gray-700 rounded ml-6" />
        </div>
      </div>

      <div style={{ backgroundImage: "url(../assets/ai-game-maploader.png)" }} className="relative w-[90%] mx-auto bg-contain bg-no-repeat mt-6 h-[500px] overflow-hidden -translate-y-5 ">
          {tiles.map((tile, index) => (
          <div
            key={index}
            className="absolute w-10 h-10 bg-gray-600 rounded-full"
            style={{
              top: tile.top, bottom: tile.bottom, left: tile.left, 
            }}
          />
        ))}

       <div className='w-full absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-2'>
        <div className=" w-[70%] mx-auto h-5 bg-[#272836] rounded" />
        <div className="w-[80%] mx-auto h-5 bg-[#272836] rounded" />
        <div className=" w-[90%] h-5 bg-[#272836] rounded " />
      </div>
      </div>

     
    </div> */}
    </div>
    </div>
    
  )
}

export default IslandLoader