import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../src/assets/scss/fonts.scss';
import './index.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import NonAuthLayout from './components/NonAuthLayout';
import DashBoardLayout from './components/DashBoardLayout';
import { authRoutes, dashboardRoutes } from './routes/allRoutes';

function App() {
  function getLayout(element, layout) {
    if (layout === 'NonAuthLayout') {
      return <NonAuthLayout element={element} />;
    }
    return <DashBoardLayout element={element} />;
  }

  return (
    <Router>
      <Suspense>
        <Routes>
          {authRoutes.map((route, idx) => (
            <Route
              key={route.path}
              path={route.path}
              element={getLayout(route.element, 'NonAuthLayout')}
            />
          ))}
          {dashboardRoutes.map((route, idx) => (
            <Route
              key={route.path}
              path={route.path}
              element={getLayout(route.element, 'DashboardLayout')}
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
