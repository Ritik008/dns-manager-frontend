import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DomainList from './pages/DomainList';
import DomainForm from './pages/DomainForm';
import DomainEditForm from './pages/DomainEditForm';
import DomainRecordsPage from './pages/SubDomainRecord';
import AddDomainRecordForm from './pages/AddSubdomainRecord';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoutes';

const App = () => {
  

  return (
    <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/domains" element={<PrivateRoute><DomainList /></PrivateRoute>} />
          <Route exact  path="/create-domain" element={<PrivateRoute><DomainForm /></PrivateRoute>} />
          <Route exact path="/edit-domain/:id" element={<PrivateRoute><DomainEditForm /></PrivateRoute>} />
          <Route exact path="/domain/record/:id" element={<PrivateRoute><DomainRecordsPage /></PrivateRoute>} />
          <Route exact path="/create/record/:id" element={<PrivateRoute><AddDomainRecordForm /></PrivateRoute>} />
          <Route exact path="*" element={<h1>Page not found. Back to <Link className='text-blue-600' to="/login">login</Link></h1>} />
        </Routes>
    </Router>
  );
};

export default App;
