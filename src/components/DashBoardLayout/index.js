import { Suspense } from "react";

import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState } from 'react'
import Dashboard from "../../pages/Dashboard";
import SideBar from "./Sidebar";
import { Button } from "react-bootstrap";
import menu from '../../assets/images/menu.png';
import { ToastContainer, toast } from 'react-toastify';

function WithRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

function DashboardLayout(props) {
  const [dynamicClass, setDynamicClass] = useState('')
  const [isActive, setIsActive] = useState(false);

  if (!localStorage.getItem('user')) {
    return (
      <Suspense fallback={null}>
        <Navigate
          to={{ pathname: '/', state: { from: props.location } }}
        />
      </Suspense>
    );
  }


  const toggleClass = () => {
    var bodyClass = !dynamicClass
    bodyClass ? document.body.classList.add('menuToggle') : document.body.classList.remove('menuToggle');
    setDynamicClass(bodyClass)


    setIsActive(!isActive);
  }
  return (
    <div className='wrapper'>
          <ToastContainer />

      <div className={true ? 'sidebarHide sidebarWrapper' : 'sidebarWrapper'}>

        <SideBar />
        <Button className='toggleBtn' onClick={toggleClass} >
          <img src={menu} alt='menu' />
        </Button>
        {props.element}
      </div>
    </div>


  )

}
export default WithRouter(DashboardLayout);
