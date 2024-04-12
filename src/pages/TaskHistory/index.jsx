import React from 'react'
// import {Link} from 'react-router-dom';
import csv from '../../assets/images/csv.png';
import funnel from '../../assets/images/funnel.png';
import './style.scss';
import { Button } from "react-bootstrap";
import back from '../../assets/images/back.png';
import { useNavigate } from 'react-router-dom';

export default function Taskhistory() {

    const navigate = useNavigate();

    return (
        <>
            <div className='pageContent'>
                <div className='taskHistoryPage'>
                    <div className='d-flex justify-content-between mb-3'>
                    <Button className='backBtn' onClick={() => navigate('/dashboard')}><img src={back} alt='back'/></Button>
                        <h2>Admin Task History</h2>
                        <button className='exportBtn'>
                            <img src={csv} alt='csv'/>
                        Export Selection to Excel</button>
                    </div>
                    <div className='container'>
                        <div className='filterWrapper d-flex justify-content-between'>
                            <button>Employee<img src={funnel} alt='funnel'/></button>
                            <button>PO Number<img src={funnel} alt='funnel'/></button>
                            <button>Task Desc.<img src={funnel} alt='funnel'/></button>
                            <button>Date<img src={funnel} alt='funnel'/></button>
                            <button>Start Time<img src={funnel} alt='funnel'/></button>
                            <button>End Time<img src={funnel} alt='funnel'/></button>
                            <button>Total Time<img src={funnel} alt='funnel'/></button>
                            <button>Item<img src={funnel} alt='funnel'/></button>
                            <button>Paris Completed<img src={funnel} alt='funnel'/></button>
                        </div>
                        <div className='tableWrapper'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                <tr>
                                    <th>John Smith<br/> Bob vila</th>
                                    <th>123456789<br/>184941987</th>
                                    <th>Cutting<br/> Assembly</th>
                                    <th>1/19/2024<br/>1/18/2024</th>
                                    <th>8:01 AM<br/>2:00 PM</th>
                                    <th>CURRENT<br/>3:30 PM</th>
                                    <th>2:01<br/>1:30</th>
                                    <th>AFQ1234<br/>AFQ2345</th>
                                    <th>0<br/>27</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    <tr>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                        <td><div className='redCircle'></div></td>
                                        <td><div className='blueCircle'></div></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>    
            
        </>
    )
}
