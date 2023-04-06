import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


const ListOfData = ({ data, setData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSecurityType, setSelectedSecurityType] = useState("All");
  const [selectedSecurityDesc, setSelectedSecurityDesc] = useState("All Totals");

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayString);
  const [link, setLink] = useState("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&page[size]=204");
  
 
  useEffect(() => {
    const fetchData = async () => {

      const endDate = selectedDate;
      const start = new Date(endDate);
      start.setDate(start.getDate() - 180);
      
      const startString = start.toISOString().split("T")[0];

      const test = link.concat("&filter=record_date:lte:", endDate, "&filter=record_date:gte:", startString,);
      console.log(test);

      const result = await axios(
        test
      );

      // generate key for each item using .map
      result.data.data.map((item) => {
        let key = item.src_line_nbr + item.record_date;
        item.key = key;
      });


      setData(result.data.data);
      console.log(result.data.data);
    };
    fetchData();
  }, [selectedDate, link]);


  const totalItems = data.length;
  const totalMarketableItems = data.filter(item => item.security_type_desc === 'Marketable').length;
  const totalNonMarketableItems = data.filter(item => item.security_type_desc === 'Non-marketable').length;
  const totalInterestBearingItems = data.filter(item => item.security_type_desc === 'Interest-bearing Debt').length;

  const MarketableItems = data.filter(item => item.security_desc === 'Total Marketable');
  const NonMarketableItems = data.filter(item => item.security_desc === 'Total Non-marketable');
  const InterestBearingItems = data.filter(item => item.security_desc === 'Total Interest-bearing Debt');
  const avgMarketableRates = MarketableItems.reduce((total, item) => total + parseFloat(item.avg_interest_rate_amt), 0) / MarketableItems.length;
  const avgNonMarketableRates = NonMarketableItems.reduce((total, item) => total + parseFloat(item.avg_interest_rate_amt), 0) / NonMarketableItems.length;
  const avgInterestBearingRates = InterestBearingItems.reduce((total, item) => total + parseFloat(item.avg_interest_rate_amt), 0) / InterestBearingItems.length;


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSecurityTypeChange = (event) => {
    setSelectedSecurityType(event.target.value);
  };

  const handleSecurityDescChange = (event) => {
    setSelectedSecurityDesc(event.target.value)
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(selectedDate);
  };


  
  // make filteredData a copy of data that only shows items with a security type that has the word "Marketable" in it
  let filteredData = data.filter(item => item.security_desc.includes("Total"));

  // let filteredData = data;




  // Filter by security type
  if (selectedSecurityType !== "All") {
    filteredData = filteredData.filter(
      (item) => item.security_type_desc === selectedSecurityType
    );
  }

  // Search by security name
  if (searchQuery) {
    filteredData = data.filter((item) =>
      item.security_desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by source line number
  if (selectedSecurityDesc !== "All Totals") {
    filteredData = data.filter(
      (item) => item.security_desc === selectedSecurityDesc
    );
  }

  const securityTypes = [
    "All",
    ...Array.from(
      new Set(data.map((item) => item.security_type_desc))
    ).sort(),
  ];

  const securityDescription = [
    "All Totals",
    ...Array.from(
      new Set(data.map((item) => item.security_desc))
    ),
  ];






  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  // reverses the x axis in options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Average Interest Rates on U.S. Treasury Securities (1 year period)',
      },
    },
    scales: {
      x: {
        reverse: true,
      },
    },
  };


// the code below removes duplicate dates and puts them in dateArray 
  const dateArray = [...new Set(data.map((item) => item.record_date))];


  // the variables below filter the data by security description and then map the average interest rate amount
  const totalMarketableRates = data.filter((item) => item.security_desc === "Total Marketable").map((item) => item.avg_interest_rate_amt);
  const totalNonMarketableRates = data.filter((item) => item.security_desc === "Total Non-marketable").map((item) => item.avg_interest_rate_amt);
  const totalInterestBearingRates = data.filter((item) => item.security_desc === "Total Interest-bearing Debt").map((item) => item.avg_interest_rate_amt);

  const labels = dateArray;
  
  const graphD = {
    labels,
    datasets: [
      {
        label: 'Total Marketable Rates (average)',
        data: totalMarketableRates,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Non-Marketable Rates (average)',
        data: totalNonMarketableRates,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Total Interest-Bearing Debt Rates (average)',
        data: totalInterestBearingRates,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  



  return (
    <div className="table-responsive">
      <h1>Interest Rates</h1>
      <h2>🏛️ U.S. Treasury Securities 🏛️</h2>
      <div>
        <h3> Summary Statistics</h3>

        <div className="row1">
          <div className="col-md-4">
            
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Marketable</h4>
                <p className="card-text">Total Items: {totalMarketableItems}</p>
                <p className="card-text">Average Interest Rate: {avgMarketableRates.toFixed(2)}%</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Total Non-Marketable Items</h4>
                <p className="card-text">Total Items: {totalNonMarketableItems}</p>
                <p className="card-text">Average Interest Rate: {avgNonMarketableRates.toFixed(2)}%</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Total Interest-Bearing Items</h4>
                <p className="card-text">Total Items: {totalInterestBearingItems}</p>
                <p className="card-text">Average Interest Rate: {avgInterestBearingRates.toFixed(2)}%</p>
              </div>
            </div>

            
          </div>
        </div>
            

        
      </div>

      <div className="chart-box">
        <h2 className="list-header-box">Interest Rates Chart by Date</h2>
        <Line options={options} data={graphD} />
      </div>


      <h2 className="list-header-box">Interest Rates List by Date</h2>
      <h5 className="list-subheader-box">Choose a Date in the entry below to see a trailing 1 year period</h5>

      <div className="row-mb-3">
        <div className="col-md-3">
          <label htmlFor="securityTypeSelect">Security Type:<br/></label>
          <select
            className="form-select"
            id="securityTypeSelect"
            value={selectedSecurityType}
            onChange={handleSecurityTypeChange}
          >
            {securityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="securityDescSelect">Security Description:<br/></label>
          <select
            className="form-select"
            id="securityDescSelect"
            value={selectedSecurityDesc}
            onChange={handleSecurityDescChange}
          >
            {securityDescription.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="dateSelect">Date:<br/></label>
          <input type="date" className="date-select" id="dateSelect" value={selectedDate} onChange={handleDateChange} />
        </div>

        </div>

        <div className="input-group-mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="or Search by Security Description here"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>


        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Record Date</th>
              <th>Security Type Description</th>
              <th>Security Description</th>
              <th>Average Interest Rate Amount</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.key}>
                <td>{item.record_date}</td>
                <td>{item.security_type_desc}</td>
                <td>{item.security_desc}</td>
                <td>{item.avg_interest_rate_amt}</td>
                <td><Link to={`/${item.key}`}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
    };
    
    export default ListOfData;