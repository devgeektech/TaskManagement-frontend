import React, { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import back from '../../assets/images/back.png';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { allTask ,getTaskHistory} from '../../services/http';
export default function Tasks() {

    const [taskData, setTaskData] = useState([]);
    const [taskHistory,setTaskHistory] = useState([]);
    const [displayTaskHistory,setDisplayTaskHistory] = useState(false);
    const getTasks = async () => {
        const records = await allTask()
        if (records.data.code === 200) {
          const taskData = records.data.data
          setTaskData(taskData)
        }
      }
      useEffect(()=>{
        getTasks();
      },[])
    const navigate = useNavigate();
    const TaskDetails=async(uid)=>{
        const result=await getTaskHistory(uid)
        if(result.data.code===200){
            let records=result.data.data
            if(records?.length>0){
                setTaskHistory(records)
                setDisplayTaskHistory(true)
            }
            else{
                toast.error('No Task History Records found')
            }

        }
        else{
            toast.error('No Task History Records found')
 
        }
    }
    return (
        <>
            <ToastContainer autoClose={500} />
            <div className='usersWrapper'>
                <div className='mt-2 userActionButton' >
                    { 
                    !displayTaskHistory?
                    
                    <Button className='backBtn' onClick={() => navigate('/dashboard')}><img src={back} alt='back' /></Button>
                      : <Button className='backBtn' onClick={() =>setDisplayTaskHistory(false)}><img src={back} alt='back' /></Button> }
                </div>
                {!displayTaskHistory?<div className='userlistWrapper'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Job Number</th>
                            
                                <th>Total Time(Minutes)</th>
                                <th>Task Type</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taskData?.length>0 && taskData?.map((data,index)=>{
                                    return (
                                        <tr key={index}>
                                        <td>{data.id}</td>
                                        <td>{data.totalTime}</td>
                                        <td>{data.taskType}</td>
                                        <td onClick={()=>TaskDetails(data.id)}><button className="btn btn-success">view</button></td>
                                    </tr>
                                      )
                                })
                            }
     
                        </tbody>
                    </Table>
                </div>
                :
                <div className='userlistWrapper'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Total Time</th>                      
                            <th>TaskType</th>
                            <th>StartTime</th>
                            <th>EndTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskHistory?.length>0 && taskHistory?.map((data,index)=>{
                                return (
                                    <tr key={index}>
                                    <td>{data.totalTime}</td>
                                    <td>{data.taskType}</td>
                                    <td>{data.startTime}</td>
                                    <td>{data.endTime}</td>

                                </tr>
                                  )
                            })
                        }
 
                    </tbody>
                </Table>
            </div>
                
                }

            </div>
        </>
    )
}
