import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const MonthDetails = ({ data }) => {

    const { id } = useParams();
    const entry = data.find(item => item.key === id);
    
    let filteredData = data.filter(item => item.record_date === entry.record_date);

    if (entry.security_type_desc == 'Marketable') {
        filteredData = filteredData.filter(item => item.security_type_desc === 'Marketable');
    } else if (entry.security_type_desc == 'Non-marketable') {
        filteredData = filteredData.filter(item => item.security_type_desc === 'Non-marketable');
    } else {
        filteredData = filteredData.filter(item => item.security_type_desc === 'Interest-bearing Debt');
    }

    const marketableItems = filteredData.length;

    return (
        <div>
            
            <Link to="/">Back to List</Link>

            <h2>Details for {entry.security_type_desc} Securities <br/> {entry.record_date} (Month Ending)</h2>
               
            <p>Security Type Description: {entry.security_type_desc}
            <br/>Average Interest Rate Amount: {entry.avg_interest_rate_amt}
            <br/>Marketable Items: {marketableItems}</p>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Record Date</th>
                        <th>Security Type Description</th>
                        <th>Security Description</th>
                        <th>Average Interest Rate Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.key}>
                            <td>{item.record_date}</td>
                            <td>{item.security_type_desc}</td>
                            <td>{item.security_desc}</td>
                            <td>{item.avg_interest_rate_amt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default MonthDetails;