import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../contast";

const AddDomainRecordForm = ({ domainId }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    values: [],
    ttl: "",
  });

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/dns/domains/${id}/records`, formData);
      console.log("Domain record added successfully");
      // Optionally, you can perform any action after the record is added, such as displaying a success message or redirecting the user
    } catch (error) {
      console.error("Error adding domain record:", error);
      // Optionally, you can handle the error, such as displaying an error message to the user
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Domain Records</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter domain name"
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select record type</option>
            <option value="A">A (Address) Record</option>
            <option value="AAAA">AAAA (IPv6 Address) Record</option>
            <option value="CNAME">CNAME (Canonical Name) Record</option>
            <option value="MX">MX (Mail Exchange) Record</option>
            <option value="NS">NS (Name Server) Record</option>
            <option value="PTR">PTR (Pointer) Record</option>
            <option value="SOA">SOA (Start of Authority) Record</option>
            <option value="SRV">SRV (Service) Record</option>
            <option value="TXT">TXT (Text) Record</option>
            <option value="DNSSEC">DNSSEC</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="values"
            className="block text-sm font-medium text-gray-700"
          >
            Values:
          </label>
          <textarea
            id="values"
            name="values"
            value={formData.values}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full h-32 resize-none focus:outline-none focus:border-blue-500"
            placeholder="Enter record values"
          />
        </div>
        <div>
          <label
            htmlFor="ttl"
            className="block text-sm font-medium text-gray-700"
          >
            TTL:
          </label>
          <input
            type="text"
            id="ttl"
            name="ttl"
            value={formData.ttl}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter TTL"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600"
        >
          Create Record
        </button>
      </form>
    </div>
  );
};

export default AddDomainRecordForm;
