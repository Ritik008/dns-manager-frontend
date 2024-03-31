import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../contast";
import { useParams } from "react-router-dom";

const DomainEditForm = () => {
  const [domainData, setDomainData] = useState();
  const { id } = useParams();
  const initialValue = {
    comment: ""
  }
  const [formData, setFormData] = useState(initialValue);
  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editComment()
    setFormData(initialValue)
  };

  const getDomain = () => {
    axios
      .get(`${BASE_URL}/api/dns/domains/${id}`)
      .then((response) => {
        console.log("Domain created successfully:", response.data);
        setDomainData(response.data);
      })
      .catch((error) => {
        console.error("Error creating domain:", error);
        // Add logic to handle error
      });
  };

  const editComment = () => {
    axios
    .put(`${BASE_URL}/api/dns/domains/${id}`,formData)
    .then((response) => {
      console.log("Domain edited successfully:", response.data);
      setDomainData(response.data);
    })
    .catch((error) => {
      console.error("Error creating domain:", error);
      // Add logic to handle error
    });   
  }

  useEffect(() => {
    getDomain();
  }, []);

  return (
    <div className="container mx-auto mt-6 w-[40%] border border-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          {domainData && (
            <div className="form-fields">
              <div className="form-field mb-5">
                <label htmlFor="id"  className="text-gray-500">
                    Hosted Zone Id
                </label>
                <p id="id">{domainData.id}</p>
              </div>
              <div className="form-field mb-5">
                <label htmlFor="name" className="text-gray-500">
                  Domain Name
                </label>
                <p id="name">{domainData.name}</p>
              </div>
              <div className="form-field mb-5">
                <label htmlFor="resourceRecordSetCount"  className="text-gray-500">
                  Record Count
                </label>
                <p id="resourceRecordSetCount">
                  {domainData.resourceRecordSetCount}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Comment
          </label>
          <textarea
            id="comment"
            onChange={changeHandler}
            name="comment"
            value={formData.comment}
            placeholder="Enter your comment"
            className="border border-gray-300 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            rows="3"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit Hosted Zone
          </button>
        </div>
      </form>
    </div>
  );
};

export default DomainEditForm;
