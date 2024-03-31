import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DomainDetails = () => {
  const { id } = useParams();
  const [domain, setDomain] = useState(null);

  useEffect(() => {
    axios.get(`/api/dns/domains/${id}`)
      .then(response => {
        setDomain(response.data);
      })
      .catch(error => {
        console.error('Error fetching domain details:', error);
      });
  }, [id]);

  if (!domain) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{domain.name}</h1>
      <p>{/* Display other domain details */}</p>
    </div>
  );
};

export default DomainDetails;