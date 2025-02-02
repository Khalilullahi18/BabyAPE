import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure your custom animation is included here
import Arrow from './icons/Arrow'; // Ensure correct import path
import { bear, coin, highVoltage, rocket, trophy, notcoin } from './images'; // Added notcoin import

function App() {
  const [points, setPoints] = useState(10);
  const [energy, setEnergy] = useState(10);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 100));
    }, 1875);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className='bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium'>
      {/* Background overlay */}
      <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>

      {/* Radial gradient overlay */}
      <div className='absolute inset-0 flex items-center justify-center z-0'>
        <div className='radial-gradient-overlay'></div>
      </div>

      <div className='w-full z-10 min-h-screen flex flex-col items-center text-white'>
        <div className='fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white'>
          <div className='w-full cursor-pointer'>
            <div className='bg-[#1f1f1f] text-center py-2 rounded-xl'>
              <p className='text-lg'>
                Join squad
                <Arrow size={18} className="ml-0 mb-1 inline-block" /> {/* Use Arrow component */}
              </p>
            </div>
          </div>
          <div className='mt-12 text-5xl font-bold flex items-center'>
            <img src={coin} width={44} height={44} alt="coin" />
            <span className='ml-2'>{points.toLocaleString()}</span>
          </div>
          <div className='text-base mt-2 flex items-center'>
            <img src={trophy} width={24} height={24} alt="trophy" />
            <span className='ml-1'>Banana <Arrow size={18} className='ml-0 mb-1 inline-block' /></span>
          </div>
        </div>

        <div className='fixed bottom-0 left-0 w-full px-4 pb-4 z-10'>
          <div className='w-full flex justify-between gap-2'>
            <div className='w-1/3 flex items-center justify-start max-w-32'>
              <div className='flex items-center justify-center'>
                <img src={highVoltage} width={44} height={44} alt='High Voltage' />
                <div className='ml-2 text-left'>
                  <span className='text-white text-2xl font-bold block'>{energy}</span>
                  <span className='text-white text-large opacity-75'>/ 100</span>
                </div>
              </div>
            </div>
            <div className='flex-grow flex items-center max-w-60 text-sm'>
              <div className='w-full bg-[#facb3c] py-4 rounded-2xl flex justify-around'>
                <button className='flex flex-col items-center gap-1'>
                  <img src={bear} width={24} height={24} alt="Bear" />
                  <span>Referrals</span>
                </button>
                <div className='h-[10px] w-[2px] bg-[#fddb6d]'></div>
                <button className='flex flex-col items-center gap-1'>
                  <img src={coin} width={24} height={24} alt='Coin' />
                  <span>Tasks</span>
                </button>
                <div className='h-[10px] w-[2px] bg-[#fddb6d]'></div>
                <button className='flex flex-col items-center gap-1'>
                  <img src={rocket} width={24} height={24} alt='Rocket' />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
          <div className='w-full bg-[#f9c035] rounded-full mt-4'>
            <div
              className='bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full'
              style={{ width: `${(energy / 100) * 100}%` }} // Corrected inline style
            ></div>
          </div>
        </div>

        <div className='flex-grow flex items-center justify-center'>
          <div className='relative mt-4' onClick={handleClick}>
            <img src={notcoin} width={256} height={256} alt='notcoin' /> {/* Image source fixed */}
            {clicks.map((click) => (
              <div
                key={click.id}
                className='absolute text-5xl font-bold animate-fade opacity-100'
                style={{
                  top: `${click.y - 42}px`, // Fixed inline style to use correct JavaScript syntax
                  left: `${click.x - 28}px`, // Corrected clicks.x to click.x
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                1
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
