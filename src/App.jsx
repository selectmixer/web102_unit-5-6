import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ListOfData from './components/ListOfData';
import SummaryStats from './components/SummaryStats';
import MonthDetails from './components/MonthDetails';

function App() {
  const [data, setData] = useState([]);

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<ListOfData data={data} setData={setData} />} />
          <Route path="/summary" element={<SummaryStats data={data} setData={setData} />} />
          <Route path="/:id" element={<MonthDetails data={data} setData={setData} />} />
          
        </Routes>
      </div>
    </Router>
  );
  
  

}


export default App
