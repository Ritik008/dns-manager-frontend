import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../contast";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [hostedZoneId, setHostedZoneId] = useState("");
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/dns/domains`)
      .then((response) => {
        setDomains(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching domains:", error);
        toast.error("Failed to fetch domains. Please try again later.");
      });
  }, []);

  const deleteHostedZoneHandler = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/dns/domains/${hostedZoneId}`
      );
      console.log("Hosted zone deleted successfully:", response.data);
      window.location.reload();
      toast.success("Hosted zone deleted successfully.");
    } catch (error) {
      console.error("Error deleting hosted zone:", error.message);
      toast.error("Failed to delete hosted zone. Please try again later.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadFile(formData);
    }
  };

  const uploadFile = async (formData) => {
    try {
      console.log("file upload");
      const response = await axios.post(
        `${BASE_URL}/api/dns/domains/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      toast.success("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again later.");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container m-auto">
        <h1 className="text-2xl font-bold mb-4 mt-6">List of Domains</h1>
        <div className="overflow-x-auto">
          <div className="flex items-end justify-end mb-6">
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
              to={`/edit-domain/${hostedZoneId}`}
              class="ml-3 border border-gray-500 hover:bg-blue-600 hover:border-none hover:text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              onClick={deleteHostedZoneHandler}
              class="mx-3 border border-gray-500 hover:bg-red-600 hover:border-none hover:text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <Link
              to="/create-domain"
              class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Created hosted zone
            </Link>
          </div>

          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2"></th>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Caller Reference</th>
                <th className="border p-2">Private Zone</th>
                <th className="border p-2">Comment</th>
                <th className="border p-2">Resource Record Set Count</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((zone) => (
                <tr key={zone.Id}>
                  <td className="border p-2">
                    <input
                      type="radio"
                      name="action"
                      id="action"
                      onChange={() =>
                        setHostedZoneId(
                          zone.Id.split("/")[zone.Id.split("/").length - 1]
                        )
                      }
                    />
                  </td>
                  <td className="border p-2">
                    {zone.Id.split("/")[zone.Id.split("/").length - 1]}
                  </td>
                  <td className="border p-2">
                    <Link
                      to={`/domain/record/${
                        zone.Id.split("/")[zone.Id.split("/").length - 1]
                      }`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {zone.Name}
                    </Link>
                  </td>
                  <td className="border p-2">{zone.CallerReference}</td>
                  <td className="border p-2">
                    {zone.Config.PrivateZone ? "Yes" : "No"}
                  </td>
                  <td className="border p-2">
                    {zone.Config.Comment ? zone.Config.Comment : "--"}
                  </td>
                  <td className="border p-2">{zone.ResourceRecordSetCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DomainList;
