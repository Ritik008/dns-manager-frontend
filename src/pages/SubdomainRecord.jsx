import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../contast";
import Navbar from "../components/Navbar";

const DomainRecordsPage = () => {
  const initialState = {
    name: "",
    type: "",
    ttl: "",
    values: []
  };
  const [domainRecords, setDomainRecords] = useState([]);
  const [domainValue, setDomainValue] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    const fetchDomainRecords = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/dns/domains/${id}/records`
        );
        setDomainRecords(response?.data?.ResourceRecordSets);
      } catch (error) {
        console.error("Error fetching domain records:", error);
      }
    };
    fetchDomainRecords();
  }, [id]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/api/dns/domains/${id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("File uploaded successfully");
      // Optionally, you can perform any action after the file is uploaded
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const deleteSubdomain = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/dns/domains/${id}/records`,
        { data: domainValue }
      );
      console.log("Hosted zone deleted successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting hosted zone:", error);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Domain Records</h1>
      <div className="flex items-end justify-end mb-3">
        <button
          class="ml-3 border border-gray-500 hover:bg-green-600 hover:border-none hover:text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            document.getElementById("fileInput").click();
          }}
        >
          Bulk Upload
        </button>
        <input
          type="file"
          id="fileInput"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Link
          to={`/edit-subdomain/${id}/records/${domainValue.name}`}
          class="ml-3 border border-gray-500 hover:bg-blue-600 hover:border-none hover:text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
        <button
          onClick={deleteSubdomain}
          class="mx-3 border border-gray-500 hover:bg-red-600 hover:border-none hover:text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
        <Link
          to={`/create/record/${id}`}
          class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Record
        </Link>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 text-gray-600"></th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600">Name</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600">Type</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600">TTL</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600">Value</th>
          </tr>
        </thead>
        <tbody>
          {domainRecords.length > 0 &&
            domainRecords.map((record, index) => (
              <tr key={index} className="border">
                <td className="border p-2">
                  <input
                    type="radio"
                    name="action"
                    id={`action-${index}`}
                    onChange={() =>
                      setDomainValue({
                        name: record?.Name?.replace(/\.$/, ""),
                        type: record.Type,
                        ttl: record.TTL.toString(),
                        values: record.ResourceRecords.map((ip) => ip.Value)
                      })
                    }
                  />
                </td>
                <td className="border px-4 py-2">{record.Name}</td>
                <td className="border px-4 py-2">{record.Type}</td>
                <td className="border px-4 py-2">{record.TTL}</td>
                <td className="border px-4 py-2">
                  {record.ResourceRecords.map((ip, ipIndex) => (
                    <p key={ipIndex} className="px-4 py-2 text-center">
                      {ip.Value}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DomainRecordsPage;
