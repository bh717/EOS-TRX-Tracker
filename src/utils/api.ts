import axios from 'axios';
import { makeQuery } from './helper';

export const fetchWithLooping = async (
  account: string,
  startDate: string,
  endDate: string,
  unit: string,
  skip: number
) => {
  var query = makeQuery(account, startDate, endDate, unit, skip);

  while (true) {
    try {
      const result = await axios.get(query);
      console.log(result.data);
      return result.data.total.value <= skip + 1000
        ? {
            stop: true,
            data: result.data.actions,
          }
        : {
            stop: false,
            total: result.data.total.value,
            data: result.data.actions,
          };
    } catch (e) {
      console.log('error log');
    }
  }
};

export const fetchQuote = async (
  startDate: number,
  endDate: number = startDate
) => {
  const key = 'uBU2SIHGRhPsQfHsd6fNLNf6hcOgSO7W';
  var date = startDate;
  while (1) {
    var result = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/X:EOSUSD/range/1/minute/${date}/${date}?adjusted=true&sort=asc&limit=120&apiKey=${key}`
    );
    if (result.data.resultsCount >= 1) {
      console.log(
        'found one',
        result.data.results[0].t,
        result.data.results[0].c
      );
      return result.data.results[0].c;
    }
    console.log('going on');
    if ((date - startDate) / 60000 >= 20) {
      console.log(startDate);
    }
    date -= 60000; // 1 minute
  }
};
