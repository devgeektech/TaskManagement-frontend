import React, { lazy } from 'react';
import Dashboard from '../pages/Dashboard';
import Taskhistory from '../pages/TaskHistory';
import Users from '../pages/users';
import PoHistory from '../pages/poHistory/index.jsx';
import Taskcompleted from '../pages/Task/index.jsx';
const Login = lazy(() => import('../pages/Login'));
//const Dashboard = lazy(() => import('../pages/Dashboard'));
const TaskHistory = lazy(() => import('../pages/TaskHistory'));


const authRoutes = [
  { path: '/signup', element: <Login /> },
  { path: '/', element: <Login /> },
  // { path: '/taskhistory', element: <Taskhistory/> },
];



const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard/> },
  { path: '/dashboard/admintaskhistory', element: <Taskhistory/> },
  { path: '/dashboard/users', element: <Users /> },
  { path: '/dashboard/adminpohistory', element: <PoHistory /> },
  { path: '/dashboard/taskhistory', element: <Taskcompleted /> }

 
];

export { authRoutes,dashboardRoutes};
