import Loader from './Loader';
import './style.css';

interface LoadingProps {
  addClass?: string;
}

const Loading = ({ addClass }: LoadingProps) => {
  return (
    <div
      className={`inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity ${
        addClass ? addClass : ''
      }`}
    >
      <Loader />
    </div>
  );
};

export default Loading;
