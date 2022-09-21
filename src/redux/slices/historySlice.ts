import { createSlice, isPending } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getRandomPrice } from '../../utils/helper';

const initialState: EditBoxState = {
  data: [],
  skip: 0,
  isPending: false,
  fetchingPrice: false,
  loading: {
    total: 0,
    current: 0,
  },
};

export const historySlice = createSlice({
  name: 'trxHistory',
  initialState,
  reducers: {
    setEmpty: (state) => {
      state.data = [];
    },
    setLoadingStatus: (state, action: PayloadAction<LoadingType>) => {
      state.loading = { ...action.payload };
    },
    setFetchingPrice: (state, action: PayloadAction<boolean>) => {
      state.fetchingPrice = action.payload;
    },
    setPrices: (state, action: PayloadAction<PriceType>) => {
      var _data = [...state.data];
      const { gIndex, eIndex, price } = action.payload;
      _data[gIndex][eIndex].price = price;
      _data[gIndex][eIndex].correct = true;
      state.data = [..._data];
      return state;
    },
    setResultData: (state, action: PayloadAction<Array<any>>) => {
      if (action.payload.length !== 0) {
        var payload: Array<CellType> = [];
        action.payload.forEach((elem) => {
          const price = getRandomPrice(
            new Date(elem.timestamp).toLocaleDateString()
          );
          const date = new Date(elem.timestamp).toLocaleDateString();
          const time = new Date(elem.timestamp).toLocaleTimeString();
          // const price = await fetchQuote(date + ' ' + time);

          var data: CellType = {
            act: elem.act,
            date,
            time,
            sender: elem.act.data.from,
            receiver: elem.act.data.to,
            quantity: elem.act.data.amount,
            price: price,
            correct: false,
            amount: price * elem.act.data.amount,
          };
          payload.push(data);
        });
        state.data = [...state.data, payload];
      }
    },
    setPendingStatus: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    addSkip: (state) => {
      state.skip = state.skip + 1000;
    },
  },
});

export interface EditBoxState {
  data: Array<Array<any>>;
  skip: number;
  isPending: boolean;
  loading: LoadingType;
  fetchingPrice: boolean;
}

interface LoadingType {
  total: number;
  current: number;
}

interface CellType {
  act: any;
  date: string;
  time: string;
  sender: string;
  receiver: string;
  quantity: number;
  price: number;
  correct: boolean;
  amount: number;
}

interface PriceType {
  gIndex: number;
  eIndex: number;
  price: number;
}

// Action creators are generated for each case reducer function
export const {
  setResultData,
  setPendingStatus,
  addSkip,
  setEmpty,
  setPrices,
  setFetchingPrice,
  setLoadingStatus,
} = historySlice.actions;

export default historySlice.reducer;
