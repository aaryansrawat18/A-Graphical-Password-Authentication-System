// Import React hooks and external libraries
import { useState } from "react";
import validator from "validator/es"; // Library to validate inputs like email
import { successToast, Toast } from "../util/toast"; // Custom toast functions for notifications
import axios from "axios"; // HTTP client for API calls
import { api } from "../static/config"; // API base URL configuration

// Digest Component: renders subscription form for monthly digest
export default function Digest() {
    // State to store email input value
    const [email, setEMail] = useState("");

    // Handle input field changes (update email state)
    function handleChange(event) {
        setEMail(event.target.value);
    }

    // Handle form submission
    function handleSubmit() {
        // Check if entered email is valid
        if (validator.isEmail(email)) {
            // Make POST request to backend API
            axios.post(`${api.url}/api/digest`, { email: email })
                .then(() => {
                    // Show success toast on successful subscription
                    successToast("Thank You For Subscribing!");
                    clearData(); // Reset input field
                })
                .catch(err => {
                    // Show error toast if API request fails
                    Toast(err.response.data.message);
                    clearData(); // Reset input field
                });
        } else {
            // Show error toast if invalid email
            Toast("Invalid Email");
        }
    }

    // Reset email input field
    function clearData() {
        setEMail("");
    }

    // JSX (UI layout)
    return (
        <div className="flex sm:flex-row flex-col justify-center bg-[#3B3B3B] rounded-[25px] mt-12 sm:mt-24 w-[90%] sm:w-3/4 mx-auto">
            
            {/* Left section: Image */}
            <div className="flex justify-center transition duration-500 ease-in-out hover:scale-95 px-4 sm:w-2/5 sm:ml-12 my-4 sm:my-16">
                <img
                    alt="Digest Promotion"
                    src="https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/photo-1@2x.png"
                />
            </div>

            {/* Right section: Text + Form */}
            <div className="px-4 sm:px-0 font-['Work_Sans'] text-white max-w-lg mx-auto sm:mt-16">
                {/* Heading */}
                <p className="text-3xl sm:text-5xl font-bold">Join Our Monthly Digest</p>
                
                {/* Subheading */}
                <p className="text-lg sm:text-2xl mt-4">Get Exclusive Promotions & Updates Staight To Your Box</p>
                
                {/* Input & Button */}
                <div className="flex sm:mt-4 mb-8 justify-center sm:justify-start">
                    {/* Email Input */}
                    <input
                        value={email}
                        onChange={handleChange}
                        className="text-black w-1/2 mt-6 rounded-lg px-4 z-10"
                        placeholder="Your Email"
                    />
                    
                    {/* Subscribe Button */}
                    <button
                        onClick={handleSubmit}
                        className="transition duration-300 ease-out w-1/3 bg-[#A259FF] rounded-lg px-4 py-1 mt-6 text-sm sm:text-xl border-[#A259FF] border-2 hover:bg-transparent z-20 hover:z-0 -ml-4"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
