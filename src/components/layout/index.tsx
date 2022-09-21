import Header from './Header';

const Layout = ({ children }: any) => {
  return (
    <div className='relative overflow-x-hidden'>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
