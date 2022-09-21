import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import Loading from './components/Loading';
import Landing from './views/Landing';
import Dashboard from './views/dashboard';
import Layout from './components/layout';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
