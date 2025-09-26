import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SecondPage } from './pages/SecondPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seconda" element={<SecondPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
