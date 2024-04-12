import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/images/searchIcon.png';
import next from '../../assets/images/next.png';
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import menu from '../../assets/images/menu.png';

import './style.scss';
import { Offcanvas, Modal } from 'react-bootstrap';
import { addTask, getTask,addTaskHistory } from '../../services/http';
import * as yup from 'yup';
import moment from 'moment';
import { taskType } from '../../utils/const';
import { ToastContainer, toast } from 'react-toastify';
import Users from '../users/index'
import { addUser } from '../../services/http';
import Countdown from '../../components/CountDown';
// import Taskhistory from '../TaskHistory';
export default function Dashboard() {
    const [show, setShow] = useState(false);
    const [taskRecords, setTaskRecords] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userList, setUserList] = useState(false)
    const [taskHistory, setTaskHistory] = useState([])

    const [checkInDisplay, setCheckInDisplay] = useState(true)
    const [showModal, setModalShow] = useState(false);
    const [addTaskData, setAddTaskData] = useState([])
    const [taskId,setTaskId]=useState(false)
    const [dynamicClass, setDynamicClass] = useState('')
    const [displayTaskHistory,setDisplayTaskHistory] = useState(false)
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    
    const [loginUserType, setLoginUserType] = useState('user')
    const [isActive, setIsActive] = useState(false);
    const [taskDetailsTotalhrs,setTaskDetailsTotalhrs] = useState('')


    const toggleClass = () => {
        var bodyClass=!dynamicClass
        bodyClass ? document.body.classList.add('menuToggle') :document.body.classList.remove('menuToggle');
        setDynamicClass(bodyClass)
        

        setIsActive(!isActive);
    };
    const [totalTime, setTotalTime] = useState('')
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/dashboard');
    }


    useEffect(() => {
        const loginUser = JSON.parse(localStorage.getItem("user"))
        // const fetchData = async () => {
        //     try {
        //         const response = await getTask();
        //         // setItems(response.data);
        //         if (response.data.code === 200) {
        //             console.log(response);
        //             let taskList = response.data.data
        //             setTaskRecords(taskList)
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
        setLoginUserType(loginUser?.role)
        // fetchData();
    }, []);


    const validationSchema = yup.object().shape({
        // jobNumber: yup.string().required('Job Number is required'),
        totalTime: yup.string().required('Total Time is required'),
        taskType: yup.string().required('Task Type is required'),
    });


    // Formik setup
    const formik = useFormik({
        initialValues: {
            totalTime: '',
            // jobNumber: '',
            taskType: '',
            startTime:'',
            endTime:''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let arr=[values]
                setAddTaskData(arr)
                setTaskHistory(arr)
                const result = await addTask(values)
                if(result.data.code === 200) {
                    toast.success("Task Added Successfully")
                }
                const taskId=result.data.data.id
                setTaskId(taskId)
                formik.resetForm()
                setModalShow(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    });
    const taskDetails = (data) => {
        setTotalTime(data)
    }


    const [showUser, setShowUser] = useState(false);
    const userClose = () => setShowUser(false);
    const userShow = () => setShowUser(true);

    const UserValidate = (values) => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'required';
        }
        if (!values.email) {
            errors.email = 'required';
        }
        if (!values.password) {
            errors.password = 'required';
        }
        if (!values.role) {
            errors.role = 'required';
        }
        return errors;
    };

    const userFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: "",
            firstName: "",
            lastName: "",
        },
        validate: UserValidate,
        onSubmit: async (values) => {
            values.role = values.role.toLowerCase();
            const result = await addUser(values);
            if (result.data.responseCode === 200) {
                toast.success("User added successfully");
                userClose()
                setTimeout(() => {
                    setUserList(true)
                }, 2000)
            }
            if (result.data.responseCode === 400) {
                toast.error(result.data.responseMessage);
            }
            userFormik.resetForm();
        }
    })
    const handleUserList = (response) => {
        if(response ==='addUser')
        {
            setShowUser(true)
        }
        setUserList(false)

    }
    const handleCountDownResponse=async(response)=>{
        if(response.action==='pause')
        {
            let taskList=[...taskHistory]
            taskList[taskList.length-1].endTime=response.time
            let startTime=taskList[taskList.length-1].startTime
            let endTime=taskList[taskList.length-1].endTime
            const totalTime=convertedTotalHours(startTime,endTime)
            taskList[taskList.length-1].totalTime=totalTime
            setTaskHistory(taskList)
            let obj=taskList[taskList.length-1]
            obj.taskId=taskId  
            const result=await addTaskHistory(taskList)
            if(result.data.code===200){
            toast.success("Task Paused Successfully")
            }
           
        }
        if(response.action==='start')
        {   let obj={
            totalTime:taskHistory[0].totalTime,
            taskType:taskHistory[0].taskType,
            startTime:response.time,
            endTime:''
        }
            let taskList=[...taskHistory,obj]
            setTaskHistory(taskList)           
        }

         }
    const clockIn=()=>{
     if(taskHistory.length>0)
     {
    setCheckInDisplay(false)
    const startTime = new Date().toLocaleTimeString();
    let obj=taskHistory[taskHistory.length-1];
    obj.startTime=startTime
    taskHistory[taskHistory.length-1]=obj
    }
 
    }
    const clockOut=()=>{
        const endTime = new Date().toLocaleTimeString();
        let obj=taskHistory[taskHistory.length-1];
        obj.startTime=endTime
        taskHistory[taskHistory.length-1]=obj
        setCheckInDisplay(true)
    }

    function parseTimeString(timeString) {
        const [time, period] = timeString.split(' ');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        let hours24 = hours;
        if (period === 'PM' && hours !== 12) {
            hours24 += 12;
        } else if (period === 'AM' && hours === 12) {
            hours24 = 0;
        }
        return new Date(0, 0, 0, hours24, minutes, seconds);
    }
    function convertedTotalHours(start,end){
        const startTime = parseTimeString(start);
        const endTime = parseTimeString(end);
        // Calculate the difference in milliseconds
        const timeDifferenceInMillis = endTime - startTime;
        // Convert milliseconds to minutes and seconds
        const timeDifferenceInSeconds = timeDifferenceInMillis / 1000;
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
        const seconds = Math.floor(timeDifferenceInSeconds % 60);
        return `${hours}:${minutes}:${seconds}`;
        

    }
    return (
        <>
            <ToastContainer autoClose={500} />
           
                
                    {/* <div className='sidebar'>
                        <div className=''>
                            <h2>Arnold | DataPackr</h2>
                            {((loginUserType === 'superAdmin') || (loginUserType === 'admin')) && <button className='btn btn-primary w-100 navLink' onClick={() => {if(displayTaskHistory)
                            {setDisplayTaskHistory(false)}
                            setUserList(true)}} >User Management</button>
                            }
                            { (loginUserType === 'user') && <button className='btn btn-primary w-100 navLink' onClick={() => {
                                if(displayTaskHistory)
                                    {setDisplayTaskHistory(false)}
                                setUserList(true)}} >Task History</button>
                            }
                             {((loginUserType === 'superAdmin') || (loginUserType === 'admin')) && <button className='btn btn-primary w-100 navLink' onClick={() => setDisplayTaskHistory(true)} >Admin Task History</button>
                            }
                             {((loginUserType === 'superAdmin') || (loginUserType === 'admin')) && <button className='btn btn-primary w-100 navLink' onClick={() => setDisplayTaskHistory(true)} >Admin Po History</button>
                            }
                            
                            <button className='signoutBtn' onClick={() => logOut()}>Sign Out</button>
                        </div>
                    </div> */}
                    {!displayTaskHistory&&<div className='pageContent'>
                        {!userList &&
                            <div>
                                <Button className='toggleBtn' onClick={toggleClass} >
                                    <img src={menu} alt='menu' />
                                </Button>
                                <div className='dashboardContent'>
                                    <div className='date_Time'>
                                        
                                        <h1>8:22 PM</h1>
                                        <p>Sunday, March 31,2024 </p>
                                        {checkInDisplay ?
                                            <button className='checkoutBtn' onClick={() => clockIn()}>Clock In</button>
                                            : <button className='checkoutBtn' onClick={() => clockOut()}>Clock Out</button>
                                        }
                                        {!checkInDisplay && <Countdown seconds={(addTaskData[0].totalTime)*60}  handleCountDown={handleCountDownResponse} />}
                                    </div>
                                    <div className='blocksWrapper'>
                                        <div className='row'>
                                            <div className='col-lg-2'>
                                                <div className='block'>
                                                    <label>TODAY</label>
                                                    <p>{addTaskData.totalTime}hrs</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-2'>
                                                <div className='block'>
                                                    <label>THIS WEEK</label>
                                                    <p>{addTaskData.totalTime}hrs</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                         {  (loginUserType === 'user') &&         <div className='tasksWrapper'>
                                        <div className='d-flex justify-content-between mt-3 mb-3'>
                                            <h2>Task History</h2>
                                            <div>
                                                <button onClick={handleModalShow} className='taskBtn'>Create Task</button>
                                                <form>
                                                    <input className='form-control' placeholder='Search' />
                                                    <button><img src={searchIcon} alt='' /></button>
                                                </form>
                                            </div>
                                        </div>
                                        {/* task list to admin user for all user */}
                                        {/* <div className='taskList'>
                                            {taskRecords.length > 0 && taskRecords.map((data) => {
                                                return (<>
                                                    <div className='singleTask' onClick={handleShow} keay={data.id}>
                                                        <div className='squareWrap'></div>
                                                        <div className='taskContent' onClick={() => taskDetails(data)}>
                                                            <div className=''>
                                                                <label>{data.totalTime} Min</label>
                                                                <p className='mb-0'>IN - OUT</p>
                                                            </div>
                                                            <img src={next} alt='next' />
                                                        </div>
                                                    </div>
                                                </>)
                                            })
                                            }
                                        </div> */}
                                        {/* active task list added by user */}
                                        <div className='taskList'>
                                            {taskHistory.length > 0 && taskHistory.map((data) => {
                                            return (<>
                                                    <div className='singleTask' onClick={()=>{handleShow()
                                                    setTaskDetailsTotalhrs(data.totalTime)
                                                    }} keay={data.id}>
                                                        <div className='squareWrap'></div>
                                                        <div className='taskContent' onClick={() => taskDetails(data)}>
                                                            <div className=''>
                                                                <label>Total Time</label>
                                                                <p className='mb-0'>{data.totalTime}</p>
                                
                                                            </div>
                                                            <div className=''>
                                                                <label>Task Type</label>
                                                                <p className='mb-0'>{data.taskType}</p>
                                                            </div>
                                                            <div className=''>
                                                                <label>Start Time</label>
                                                                <p className='mb-0'>{data.startTime}</p>
                                                            </div>
                                                            <div className=''>
                                                                <label>End Time</label>
                                                                <p className='mb-0'>{data.endTime}</p>
                                                            </div>
                                                            <img src={next} alt='next' />
                                                        </div>
                                                    </div>
                                                </>)
                                            })
                                            }
                                        </div>
                                    </div>
                        }
                                </div>
                            </div>
                        }
                        {
                            userList && <Users userList={handleUserList} />
                        }
                    </div>
                    }
             
           


             {/* task details on click to task            */}
            {taskHistory.length > 0 && taskHistory.map((data) => {
                return (<>

                    <Offcanvas show={show} onHide={handleClose} placement={'end'} >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Today</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <h5>Today</h5>
                            <div className='timeBlock' onClick={() => taskDetails(data)}>
                                <label>Today</label>
                                <h4>{taskDetailsTotalhrs}</h4>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </>)
            }
            )}

            {/* add Task Popup */}
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={handleModalClose}
                className='createTaskModal'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="form-wrap" onSubmit={formik.handleSubmit}>
                        {/* <Form.Group className="form-group" controlId="jobNumber">
                            <label>Job Number</label>
                            <Form.Control
                                type="number"
                                name="jobNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.jobNumber}
                                placeholder="Start Time"
                            />
                            {formik.errors.jobNumber && formik.touched.jobNumber ? (
                                <div className="text-danger">
                                    <p className="text-danger">Invalid Number</p>
                                </div>
                            ) : null}
                        </Form.Group> */}
                        <Form.Group className="form-group" controlId="totalTime">
                            <label>Total Time</label>
                            <Form.Control
                                type="number"
                                name="totalTime"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.totalTime}
                                placeholder="In Minutes"
                            />
                            {formik.errors.totalTime && formik.touched.totalTime ? (
                                <div className="text-danger">
                                    <p className="text-danger">Invalid Value</p>
                                </div>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Task Type</label>
                            <Form.Select
                                name="taskType"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.taskType}
                                aria-label="Default select example"
                            >
                                {taskType.map((task, index) => (
                                    <option key={index} value={task}>{task}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Modal.Footer>
                            <Button type='submit'>Create Task</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>


            {/* Modal Html End */}


            {/* Add user Modal  Html Start */}
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showUser}
                onHide={userClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <Form className="form-wrap" onSubmit={userFormik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={userFormik.handleChange}
                                placeholder="Enter your first name"
                                onBlur={userFormik.handleBlur}
                                value={userFormik.values.firstName}
                            />
                            {userFormik.errors.firstName && userFormik.touched.firstName ? (
                                <div className="text-danger">
                                    <p className="text-danger">{userFormik.errors.firstName}</p>
                                </div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={userFormik.handleChange}
                                placeholder="Enter your last name"
                                onBlur={userFormik.handleBlur}
                                value={userFormik.values.lastName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={userFormik.handleChange}
                                placeholder="name@example.com"
                                onBlur={userFormik.handleBlur}
                                value={userFormik.values.email}

                            />
                            {userFormik.errors.email && userFormik.touched.email ? (
                                <div className="text-danger">
                                    <p className="text-danger">{userFormik.errors.email}</p>
                                </div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="form-group" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                                value={userFormik.values.password}

                            />
                            {userFormik.errors.password && userFormik.touched.password ? (
                                <div className="text-danger">
                                    <p className="text-danger">{userFormik.errors.password}</p>
                                </div>
                            ) : null}

                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select defaultValue="Choose Role"
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                                value={userFormik.values.role}

                            >
                                <option name="user">User</option>
                                <option name="admin">Admin</option>



                            </Form.Select>
                            {userFormik.touched.role && userFormik.errors.role ? (
                                <div className="text-danger">
                                    <p className="text-danger">{userFormik.errors.role}</p>
                                </div>

                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                            <Button className='w-100 submitBtn' variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>



                    </Form>

                </Modal.Body>
            </Modal>


            {/* Add user Modal Html End */}
        </>
    )
}
