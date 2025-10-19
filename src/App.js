import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import {AboutMe} from './pages/AboutMe/About-me';
import {Wip} from "./pages/Wip/Wip";
import {Portfolio} from "./pages/Portfolio/Portfolio";
import {Gallery} from "./pages/Gallery/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/About-me" element={<AboutMe/>}/>
            <Route path="/Wip" element={<Wip/>}/>
          <Route path="/Portfolio" element={<Portfolio/>}/>
          <Route path="/Gallery" element={<Gallery/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
