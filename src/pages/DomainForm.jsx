import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../contast";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const DomainForm = () => {
    const initialValue = {
        comment: "",
        name: ""
    };
    const [formData, setFormData] = useState(initialValue);
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.name) {
            errors.name = "Please enter a domain name";
            isValid = false;
            toast.error(errors.name);
        }

        setErrors(errors);
        return isValid;
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            createDomain();
            setFormData(initialValue);
        }
    };

    const createDomain = () => {
        axios
            .post(`${BASE_URL}/api/dns/domains`, formData)
            .then((response) => {
                console.log("Domain created successfully:", response.data);
                toast.success("Domain created successfully");
            })
            .catch((error) => {
                console.error("Error creating domain:", error);
                toast.error("Failed to create domain. Please try again later.");
                
            });
    };

    return (
      <div>
      <Navbar />
        <div className="container mx-auto mt-6 w-[40%] border border-gray-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor="domainName"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Domain Name
                    </label>
                    <input
                        id="domainName"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={changeHandler}
                        placeholder="Enter domain name"
                        className={`border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        } appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs italic">{errors.name}</p>
                    )}
                    <div className="text-gray-500 text-xs italic mt-1">
                        Please enter the domain name without www or http(s)://
                    </div>
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
                        className="border border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        rows="3"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create Hosted Zone
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default DomainForm;
