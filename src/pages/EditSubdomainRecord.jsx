import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../contast";

const EditSubdomainRecord = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    values: [],
    ttl: "",
  });
  const [domainRecord, setDomainRecord] = useState(null);
  const { domainId, domainName} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${BASE_URL}/api/dns/domains/${domainId}/records`,
        formData
      );
      console.log("Domain record updated successfully");
     } catch (error) {
      console.error("Error updating domain record:", error);
     }
  };

  useEffect(() => {
    const fetchDomainRecord = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/dns/domains/${domainId}/records/${domainName}`
        );
        setDomainRecord(response?.data);
      } catch (error) {
        console.error("Error fetching domain record:", error);
      }
    };

    fetchDomainRecord();
  }, [domainId, domainName]);

  useEffect(() => {
    if (domainRecord) {
      setFormData({
        name: domainRecord.name,
        type: domainRecord.type,
        values: domainRecord.values,
        ttl: domainRecord.ttl.toString(),
      });
    }
  }, [domainRecord]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-md">
    <h1 className="text-3xl font-bold mb-6 text-center">Edit Domain Record</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
     
      <div className="text-red-600 text-xs italic mt-1">You can only edit values field</div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <p className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500">{formData.name}</p>
      </div>
      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
        <p className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none ">{formData.type}</p>
      </div>
      {/* Values */}
      <div>
        <label htmlFor="values" className="block text-sm font-medium text-gray-700">Values:</label>
        <textarea
          id="values"
          name="values"
          value={formData.values.join('\n')}
          onChange={(e) => {
            const valuesArray = e.target.value.split('\n');
            setFormData({ ...formData, values: valuesArray });
          }}
          className="mt-1 p-3 border border-gray-300 rounded-md w-full h-32 resize-none focus:outline-none focus:border-blue-500"
          placeholder="Enter record values"
        />
      </div>
      {/* TTL */}
      <div>
        <label htmlFor="ttl" className="block text-sm font-medium text-gray-700">TTL:</label>
        <p className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none ">{formData.ttl}</p>
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600"
      >
        Update Record
      </button>
    </form>
  </div>
  
  );
};

export default EditSubdomainRecord;
