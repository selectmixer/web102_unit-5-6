// the code below creates a graph of interest rates by date and is placed in dataDashboard\src\components\ListOfData.jsx:
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Bar = (props) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        
    }, []);
    
    const dates = data.map((item) => item.record_date);
    const interestRates = data.map((item) => item.avg_interest_rate_amt);
    
    const graphData = {
        labels: dates,
        datasets: [
        {
            label: "Average Interest Rate",
            data: interestRates,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        },
        ],
    };
    
    const graphOptions = {
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                return value + "%";
                },
            },
            },
        ],
        },
    };
    
    return (
        <>
        <Line data={graphData} options={graphOptions} />
        </>
    );
    }