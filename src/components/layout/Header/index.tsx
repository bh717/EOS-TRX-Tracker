import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import DownloadButton from '../../../views/dashboard/components/DownloadButton';

const Header = () => {
  const history = useSelector((state: RootState) => state.history);
  const pathname = useLocation().pathname;

  return (
    <header
      className={`fixed flex justify-between items-center top-0 h-24 w-screen ${
        pathname == '/' ? 'bg-white/5 backdrop-blur' : 'bg-[#101015] shadow-xl'
      }`}
    >
      <NavLink to='/' className='px-20 w-fit h-full flex items-center gap-5'>
        <img src='images/EOS-Coin.webp' alt='EOS' width={45} height={45} />
        <p className='text-white text-2xl'>EOS TRX Tracker</p>
      </NavLink>
      {history.loading.current >= history.loading.total && pathname !== '/' && (
        <div className='mr-20'>
          <DownloadButton />
        </div>
      )}
    </header>
  );
};

export default Header;
