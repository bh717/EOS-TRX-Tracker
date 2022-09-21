import { isPending } from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loading/Loader';
import { setChangeStatus } from '../../../redux/slices/filterSlice';

import {
  addSkip,
  setEmpty,
  setFetchingPrice,
  setLoadingStatus,
  setPendingStatus,
  setPrices,
  setResultData,
} from '../../../redux/slices/historySlice';
import { RootState } from '../../../redux/store';
import { fetchQuote, fetchWithLooping } from '../../../utils/api';
import DownloadButton from './DownloadButton';

const INIT = 'INIT';
const LOADING = 'LOADING';
const FETCHINGPRICE = 'FETCHINGPRICE';
const FINISHED = 'FINISHED';

const ShowMoreButton = () => {
  const [status, setStatus] = useState<string>(INIT);
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const account = useSelector((state: RootState) => state.filter.account);
  const startDate = useSelector((state: RootState) => state.filter.startDate);
  const endDate = useSelector((state: RootState) => state.filter.endDate);
  const unit = useSelector((state: RootState) => state.filter.unit);
  const history = useSelector((state: RootState) => state.history);
  const filterChanged = useSelector((state: RootState) => state.filter.changed);

  const fetchData = async () => {
    if (!account) {
      alert('Account form need to be filled.');
      return;
    }

    filterChanged && dispatch(setEmpty());
    dispatch(setPendingStatus(true));
    dispatch(setLoadingStatus({ total: 0, current: 0 }));
    localStorage.setItem('skip', '-1000');
    var skip = parseInt(localStorage.getItem('skip') ?? '-1000');

    setStatus(LOADING);
    while (true) {
      skip += 1000;
      localStorage.setItem('skip', skip.toString());
      let result = await fetchWithLooping(
        account,
        startDate,
        endDate,
        unit,
        skip
      );
      if (result.stop) {
        console.log('setting started...');
        dispatch(setResultData(result.data));
        console.log('result setting completed...');
        dispatch(setChangeStatus());
        console.log('status changed...');
        break;
      } else {
        dispatch(setLoadingStatus({ total: result.total, current: skip }));
        console.log(result.data);
        dispatch(setResultData(result.data));
        dispatch(setChangeStatus());
        dispatch(addSkip());
      }
    }
    dispatch(setPendingStatus(false));
    setStatus(FINISHED);
    setTimeout(() => {
      setModal(true);
    }, 800);
  };

  const correctPrice = async () => {
    setModal(false);
    window.scrollTo(0, 0);
    dispatch(setFetchingPrice(true));
    setStatus(FETCHINGPRICE);

    for (let i = 0; i < history.data.length; i++) {
      const group = history.data[i];
      for (let j = 0; j < group.length; j++) {
        var date = [group[j].date, group[j].time].join(' ');
        let result = await fetchQuote(new Date(date).getTime());
        dispatch(setPrices({ gIndex: i, eIndex: j, price: result }));
      }
    }
    setStatus(FINISHED);
    window.scrollTo(0, document.body.scrollHeight);
  };

  switch (status) {
    case INIT:
      return (
        <button
          onClick={fetchData}
          className={`outline-none mb-20 ${
            history.isPending && history.skip !== 0 ? '' : 'mt-10'
          } text-gray-300 bg-[#151517] transition-all duration-150 w-fit px-20 py-3`}
        >
          {history.data.length === 0 || filterChanged
            ? 'Get Data'
            : 'Show More'}
        </button>
      );
    case LOADING:
      return (
        <div className='text-white text-lg mb-20'>
          {history.loading.total !== 0 ? (
            <p>
              Loading transaction history, {history.loading.current + 1000} of{' '}
              {history.loading.total} loaded.
            </p>
          ) : (
            <p>Loading transaction history ...</p>
          )}
        </div>
      );
    case FETCHINGPRICE:
      return (
        <div className='mb-20'>
          <div className='fixed top-0 left-0 w-screen h-screen' />
          <div className='fixed w-2/3 lg:w-1/3 bg-black/80 py-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-xl'>
            <h2 className='text-white font-bold text-2xl w-full text-center pb-5'>
              ESO TRX TRACKER
            </h2>
            <div className='flex items-center justify-center gap-20 px-20'>
              <Loader />
              <div className='text-white'>
                The more transaction history you need the more you you should
                wait.
                <br />
                Adjusting with historical prices of EOS token...
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className='mt-10 mb-20'>
          <div
            className={`${
              modal ? 'visible z-10' : '-z-10 invisible'
            } transition-all duration-500n`}
          >
            <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 backdrop-blur' />
            <div className='fixed w-2/3 lg:w-1/2 bg-black/80 py-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-xl'>
              <h2 className='text-white font-bold text-2xl w-full text-center pb-5'>
                ESO TRX TRACKER
              </h2>
              <p className='text-gray-200 px-20 text-center pb-10'>
                Historical transaction data is prepared for you. But we are
                using estimated information for historical price of eos token.
                You can download it as XLSX format.
              </p>
              <div className='px-10 flex justify-center'>
                <DownloadButton />
                <button
                  onClick={correctPrice}
                  className='ml-20 text-white text-xl h-fit outline-none px-16 py-3 bg-[#161618]  hover:bg-[#141416] transition-all duration-150'
                >
                  Use Correct Price
                </button>
              </div>
            </div>
          </div>
          <DownloadButton />
          <button
            onClick={() => window.scrollTo(0, 0)}
            className='ml-20 text-white text-xl h-fit w-fit mr-20 outline-none px-16 py-3 bg-[#161618]  hover:bg-[#141416] transition-all duration-150'
          >
            Go Up
          </button>
        </div>
      );
  }
};

export default ShowMoreButton;
