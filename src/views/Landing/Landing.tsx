import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-cover bg-no-repeat bg-[-center_top_2rem] bg-[url("assets/background/EOS-Network.jpeg")]'>
      <div className='flex items-center flex-col gap-8'>
        <h1 className='text-[60px] text-white font-bold'>
          Welcome To EOS Tracker
        </h1>
        <p className='text-white text-10'>
          EOSIO is an open-source blockchain platform that helps developers,
          investors, and businesses build with confidence.
        </p>
        <Link
          to='/dashboard'
          className='w-fit mt-[150px] text-2xl text-gray-900 font-bold px-10 py-4 rounded-xl bg-white/30 hover:bg-white/50 transition-all duration-200 backdrop-blur-sm'
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;
