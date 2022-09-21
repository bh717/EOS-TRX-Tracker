import { useDispatch, useSelector } from 'react-redux';
import {
  setAccount,
  setEndDate,
  setStartDate,
  setUnit,
} from '../../../redux/slices/filterSlice';
import { RootState } from '../../../redux/store';

const FilterForm = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.filter.account);
  const startDate = useSelector((state: RootState) => state.filter.startDate);
  const endDate = useSelector((state: RootState) => state.filter.endDate);
  const unit = useSelector((state: RootState) => state.filter.unit);

  const inputChange = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;
    switch (inputName) {
      case 'account':
        dispatch(setAccount(value));
        return;
      case 'startDate':
        dispatch(setStartDate(value));
        return;
      case 'endDate':
        dispatch(setEndDate(value));
        return;
      case 'unit':
        dispatch(setUnit(value));
        return;
    }
  };

  return (
    <div className='pt-10 flex flex-wrap px-20 gap-10 justify-center'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='account' className='uppercase text-gray-400 pl-2'>
          EOS ACCOUNT
        </label>
        <input
          id='account'
          name='account'
          className='p-2 w-[200px] bg-[#121214]/30 outline-none transition-all duration-150 border-[4px] border-[#191921] focus:border-[#141416] text-gray-300 placeholder-slate-500'
          placeholder='tsui.mlt'
          onChange={inputChange}
          value={account}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='startdate' className='uppercase text-gray-400 pl-2'>
          Beginning Date
        </label>
        <input
          type='datetime-local'
          name='startDate'
          id='startdate'
          className='p-2 text-gray-300 w-[220px] bg-[#121214]/30 outline-none transition-all duration-150 border-[4px] border-[#191921] focus:border-[#141416]'
          placeholder='02/02/2022'
          onChange={inputChange}
          value={startDate}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='endDate' className='uppercase text-gray-400 pl-2'>
          End Date
        </label>
        <input
          type='datetime-local'
          id='endDate'
          name='endDate'
          className='p-2 w-[220px] text-gray-300 bg-[#121214]/30 outline-none transition-all duration-150 border-[4px] border-[#191921] focus:border-[#141416]'
          placeholder='04/02/2022'
          onChange={inputChange}
          value={endDate}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='unit' className='uppercase text-gray-400 pl-2'>
          Money Unit
        </label>
        <input
          id='unit'
          name='unit'
          className='p-2 w-[200px] bg-[#121214]/30 outline-none transition-all duration-150 border-[4px] border-[#191921] focus:border-[#141416] text-gray-300 placeholder-slate-500'
          placeholder='Ex. "USD"'
          onChange={inputChange}
          value={unit}
        />
      </div>
    </div>
  );
};

export default FilterForm;
