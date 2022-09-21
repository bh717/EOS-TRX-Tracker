import FilterForm from './components/FilterForm';
import ResultTable from './components/ResultTable';
import ShowMoreButton from './components/ShowMore';

const Dashboard = () => {
  return (
    <div className='w-screen min-h-screen bg-[#232325] pt-24'>
      <FilterForm />
      <ResultTable />

      <div className='flex justify-center'>
        <ShowMoreButton />
      </div>
    </div>
  );
};

export default Dashboard;
