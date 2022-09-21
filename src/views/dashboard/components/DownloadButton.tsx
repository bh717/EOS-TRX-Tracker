import FileSaver from 'file-saver';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { RootState } from '../../../redux/store';

const Heading = [
  {
    date: 'Date',
    time: 'Time',
    sender: 'Sender',
    receiver: 'Receiver',
    quantity: 'Quantity of EOS',
    price: 'Price of EOS in USD',
    amount: 'Amount',
  },
];

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const DownloadButton = () => {
  const history = useSelector((state: RootState) => state.history);

  const exportToCSV = () => {
    var csvData: Array<any> = [];
    var fileName = 'EOS_TRX_HISTORY_XLSX';
    console.log(history.data.length);
    history.data.forEach((elem) => {
      elem.forEach((data) => {
        const _elem = {
          date: data.date,
          time: data.time,
          sender:
            data.act.account === 'eosmarketplc'
              ? data.act.data.account
              : data.act.data.from,
          receiver:
            data.act.account === 'eosio'
              ? data.act.data.receiver
              : data.act.account === 'eosmarketplc'
              ? data.act.data.business
              : data.act.data.to,
          quantity: data.quantity,
          price: data.price.toFixed(3),
          amount: data.amount.toFixed(3),
        };
        csvData.push(_elem);
      });
    });
    const wscols = [
      {
        wch: Math.max(
          Math.max(...csvData.map((history) => history.date.length)),
          Heading[0].date.length
        ),
      },
      {
        wch: Math.max(
          Math.max(...csvData.map((history) => history.time.length)),
          Heading[0].time.length
        ),
      },
      {
        wch: Math.max(
          Math.max(...csvData.map((history) => history.sender.length)),
          Heading[0].sender.length
        ),
      },
      {
        wch: Math.max(
          Math.max(...csvData.map((history) => history.receiver.length)),
          Heading[0].receiver.length
        ),
      },
      {
        wch: Heading[0].quantity.length,
      },
      {
        wch: Math.max(
          Math.max(...csvData.map((history) => history.price.length)),
          Heading[0].price.length
        ),
      },
      {
        wch:
          Math.max(
            Math.max(...csvData.map((history) => history.amount.length)),
            Heading[0].amount.length
          ) + 3,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [
        'date',
        'time',
        'sender',
        'receiver',
        'quantity',
        'price',
        'amount',
      ],
      skipHeader: true, //ok
    });
    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: [
        'date',
        'time',
        'sender',
        'receiver',
        'quantity',
        'price',
        'amount',
      ],
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(
      data,
      fileName +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        fileExtension
    );
  };

  return (
    <button
      onClick={exportToCSV}
      className='text-white text-xl h-fit w-fit outline-none px-16 py-3 bg-[#161618] hover:bg-[#141416] transition-all duration-150'
    >
      Download
    </button>
  );
};

export default DownloadButton;
