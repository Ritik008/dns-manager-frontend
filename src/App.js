import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DomainList from './pages/DomainList';
import DomainDetails from './pages/DomainDetails';
import DomainForm from './pages/DomainForm';
import axios from 'axios';
import DomainEditForm from './pages/DomainEditForm';

const App = () => {
  

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route exact path="/domains" element={<DomainList />} />
          <Route path="/domains/:id" element={<DomainDetails />} />
          <Route path="/create-domain" element={<DomainForm />} />
          <Route path="/edit-domain/:id" element={<DomainEditForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
