"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Navbar } from "../component/navbar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { countries } from "countries-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bitcoin, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  country: string;
  contact: string;
  address: string;
  zip: string;
  postalCode: string;
}

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  isSelect?: boolean;
  options?: { value: string; label: string }[];
  required?: boolean; // Added required prop
}

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  className = "",
  isSelect = false,
  options = [],
  required = false, // Default to false
}: InputFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <label className="text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-500">*</span>} {/* Required tag */}
      </label>
      {isSelect ? (
        <select
          value={value}
          onChange={(e) => onChange(e as unknown as ChangeEvent<HTMLInputElement>)}
          name={name}
          className={`px-4 py-3 rounded-lg bg-black/50 text-white border border-gray-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 ${className}`}
          required={required} // Set required attribute
        >
          <option value="">Select a country</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={`px-4 py-3 rounded-lg bg-black/50 text-white border border-gray-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 ${className}`}
          required={required} // Set required attribute
        />
      )}
    </motion.div>
  );
}

const FloatingIcons = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 0.5 + Math.random() * 0.5,
            opacity: 0.3 + Math.random() * 0.4
          }}
          animate={{
            x: [null, Math.random() * dimensions.width],
            y: [null, Math.random() * dimensions.height],
            rotate: [0, 360]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-gray-600"
        >
          {i % 2 === 0 ? <Bitcoin size={24} /> : <DollarSign size={24} />}
        </motion.div>
      ))}
    </div>
  );
};

export default function Signup() {
  const router = useRouter();
  const countryList = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    country: "",
    contact: "",
    address: "",
    zip: "",
    postalCode: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, contact: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Prepare data according to backend requirements
    const signupData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone_no: formData.contact,
      country: formData.country,
      address: formData.address
    };

    try {
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        toast.success('Signup successful! Please check your email.');
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push('/sigin');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-4 md:p-6 lg:p-8 relative">
        <FloatingIcons />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 w-full max-w-2xl mt-20 mx-auto border border-gray-800"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-8 text-center"
          >
            Create an Account
          </motion.h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputField
                label="Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                name="name"
                required={true} // Set required to true
              />
            </div>
            <InputField
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              required={true} // Set required to true
            />
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required={true} // Set required to true
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required={true} // Set required to true
            />
            <InputField
              label="Country"
              type="text"
              placeholder="Select your country"
              value={formData.country}
              onChange={handleChange}
              name="country"
              isSelect={true}
              options={countryList}
              required={true} // Set required to true
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Contact</label>
              <PhoneInput
                country={"us"}
                value={formData.contact}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "1px solid rgb(55, 65, 81)",
                  borderRadius: "0.5rem",
                }}
                dropdownStyle={{
                  backgroundColor: "rgb(17, 24, 39)",
                  color: "white",
                }}
                buttonStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgb(55, 65, 81)",
                  borderRadius: "0.5rem 0 0 0.5rem",
                }}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Address"
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                name="address"
                required={true} // Set required to true
              />
            </div>
            <InputField
              label="Zip"
              type="text"
              placeholder="Enter your zip code"
              value={formData.zip}
              onChange={handleChange}
              name="zip"
            />
            <InputField
              label="Postal Code"
              type="text"
              placeholder="Enter your postal code"
              value={formData.postalCode}
              onChange={handleChange}
              name="postalCode"
            />
            <motion.div
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="md:col-span-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-4 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </motion.div>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/sigin" legacyBehavior>
                <a className="text-orange-400 hover:text-orange-500 hover:underline transition-colors duration-300">
                  Sign In
                </a>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
