import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DomainList from './pages/DomainList';
import DomainForm from './pages/DomainForm';
import DomainEditForm from './pages/DomainEditForm';
import DomainRecordsPage from './pages/SubDomainRecord';
import AddDomainRecordForm from './pages/AddSubdomainRecord';
import EditSubdomainRecord from './pages/EditSubdomainRecord';

const App = () => {
  

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route exact path="/domains" element={<DomainList />} />
          <Route path="/create-domain" element={<DomainForm />} />
          <Route path="/edit-domain/:id" element={<DomainEditForm />} />
          <Route path="/domain/record/:id" element={<DomainRecordsPage />} />
          <Route path="/create/record/:id" element={<AddDomainRecordForm />} />
          <Route path="/edit-subdomain/:domainId/records/:domainName" element={<EditSubdomainRecord />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
