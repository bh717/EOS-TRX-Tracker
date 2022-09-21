export const makeQuery = (
  account: string | undefined,
  start: string | undefined,
  end: string | undefined,
  unit: string | undefined,
  skip: number
): string => {
  var baseURI = 'https://eos.hyperion.eosrio.io/v2/history/get_actions';
  var noQuery = true;
  if (account) {
    baseURI += `?account=${account}&transfer.from=${account}`;
    noQuery = false;
  } 
  if (start) {
    baseURI += noQuery ? '?' : '&';
    baseURI += 'after=' + new Date(start).toISOString();
  }
  if (end) {
    baseURI += noQuery ? '?' : '&';
    baseURI += 'before=' + new Date(end).toISOString();
  }
  return baseURI + '&skip=' + skip + '&act.account=eosio.token&limit=1000';
};

export const makeLoopQuery = (
  account: string | undefined,
  start: string | undefined,
  end: string | undefined,
  unit: string | undefined,
): string => {
  var baseURI = 'https://eos.hyperion.eosrio.io/v2/history/get_actions';
  var noQuery = true;
  if (account) {
    baseURI += `?account=${account}`;
    noQuery = false;
  }
  if (start) {
    baseURI += noQuery ? '?' : '&';
    baseURI += 'after=' + new Date(start).toISOString();
  }
  if (end) {
    baseURI += noQuery ? '?' : '&';
    baseURI += 'before=' + new Date(end).toISOString();
  }
  baseURI += '&limit=1000'
  return baseURI;
};

export const getRandomPrice = (date: string) => {
  const price = priceData.filter(
    (one, index) => one.date?.toLocaleDateString() === date
  );
  var max, min;
  // alert(JSON.stringify(price));
  max = price.length > 0 ? price[0].value.max : otherPrice.value.max;
  min = price.length > 0 ? price[0].value.min : otherPrice.value.min;
  return (Math.random() * (max - min) + min) / 10000;
};

const priceData = [
  {
    date: new Date('2022/7/24'),
    value: {
      min: 11669,
      max: 12485,
    },
  },
  {
    date: new Date('2022/7/23'),
    value: {
      min: 11669,
      max: 12485,
    },
  },
  {
    date: new Date('2022/7/22'),
    value: {
      min: 11799,
      max: 11942,
    },
  },
  {
    date: new Date('2022/7/21'),
    value: {
      min: 10550,
      max: 11935,
    },
  },
  {
    date: new Date('2022/7/20'),
    value: {
      min: 10433,
      max: 10544,
    },
  },
  {
    date: new Date('2022/7/19'),
    value: {
      min: 10748,
      max: 10086,
    },
  },
];

const otherPrice = {
  date: '2016 - 2022/7/18',
  value: {
    min: 10772,
    max: 12632,
  },
};
