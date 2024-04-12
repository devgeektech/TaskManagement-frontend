import React, { useState, useEffect } from 'react'

// import './style.scss';
import { ToastContainer } from 'react-toastify';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getTask } from '../../../services/http';

export default function SideBar() {

    const [loginUserType, setLoginUserType] = useState('user')
    const [taskRecords, setTaskRecords] = useState([])
    const [isActive, setIsActive] = useState(false);

    // useEffect(() => {
    //     const loginUser = JSON.parse(localStorage.getItem("user"))
    //     const fetchData = async () => {
    //         try {
    //             const response = await getTask();
    //             // setItems(response.data);
    //             if (response.data.code === 200) {
    //                 console.log(response);
    //                 let taskList = response.data.data
    //                 setTaskRecords(taskList)
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     setLoginUserType(loginUser?.role)
    //     fetchData();
    // }, []);

    const toggleClass = () => {
        setIsActive(!isActive);
    };

    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/dashboard');
    }

    const user = () => {
        navigate('/dashboard/users');
    }

    const adminTaskHistory = () => {
        navigate('/dashboard/admintaskhistory');
    }

    const taskHistory = () => {
        navigate('/dashboard/taskhistory');
    }

    const poHistory = () => {
        navigate('/dashboard/adminpohistory');
    }

    return (
        <>
            <ToastContainer autoClose={500} />


            <div className={isActive ? ' sidebarWrapper' : 'sidebarWrapper'}>
                <div className='sidebar'>
                    <div className=''>
                        <h2>Arnold | DataPackr</h2>

                        <button className='btn btn-primary w-100 navLink' onClick={() => user()} >User Management</button>
                        <button className='btn btn-primary w-100 navLink' onClick={()=> taskHistory()} >Task</button>
                        <button className='btn btn-primary w-100 navLink' onClick={() => adminTaskHistory()} >Admin Task History</button>
                        <button className='btn btn-primary w-100 navLink' onClick={() => poHistory()} >Admin PO History</button>
                        <button className='signoutBtn' onClick={() => logOut()}>Sign Out</button>
                    </div>
                </div>
            </div>

        </>
    )
}