import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import DataBlock from './DataBlock';

const TableBody = () => {
  const history = useSelector((state: RootState) => state.history);

  useEffect(() => {
    !history.fetchingPrice && window.scrollTo(0, document.body.scrollHeight);
  });

  return (
    <>
      {history.data.map((one, index) => (
        <DataBlock data={one} />
      ))}
    </>
  );
};

export default TableBody;
