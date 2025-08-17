import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Home from './pages/Home.jsx';
import ReportItem from './pages/ReportItem.jsx';
import ItemList from './pages/ItemList.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Report" element={<ReportItem />} />
          <Route path="/Items" element={<ItemList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
