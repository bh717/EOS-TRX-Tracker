import TableHeader from './TableHeader';

import { headers } from '../../../data/table';
import TableBody from './TableBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Loader from '../../../components/Loading/Loader';

const ResultTable = () => {
  const history = useSelector((state: RootState) => state.history);
  var status = <></>;
  if (history.data.length === 0) {
    status =
      history.skip !== 0 ? (
        <div className='flex flex-col items-center justify-center text-white font-bold'>
          <p className='text-[64px]'>{`(>__<)`}</p>
          <p className='text-3xl'>Ooops, No data To Display</p>
        </div>
      ) : (
        <div className='text-white py-3 text-center text-2xl'>
          Start New Tracking
        </div>
      );
  }
  return (
    <div className='mt-10 px-20'>
      <TableHeader thArray={headers} />
      <TableBody />
      {history.isPending ? (
        <div className='flex py-10 justify-center'>
          <Loader />
        </div>
      ) : (
        status
      )}
    </div>
  );
};

export default ResultTable;
