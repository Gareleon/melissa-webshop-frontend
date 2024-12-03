import React, { useState } from "react";
import { Link } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //Register User
  const onSubmit = async (data) => {
    //console.log(data);
    try {
      await registerUser(data.email, data.password);
      alert("User registrated successfully!");
    } catch (error) {
      setMessage("Please provide vaild email and password");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successfull!");
      navigate("/");
    } catch (error) {
      alert("Sign up with Google failed.");
      console.log(error);
    }
  };
  return (
    <div className=" h-[calc(100vh-120px)] border flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Prijavi se</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email adresa"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Šifra
            </label>
            <input
              {...register("password", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Šifra"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div className="flex flex-wrap space-y-2.5 items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="inline-block align-baseline font-medium mt-4 text-sm">
          Već imaš nalog?
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            {" "}
            Uloguj se
          </Link>
        </p>
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-2" />
            Prijavi se pomoću Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
          &copy;2018-2024 HEMIJSKO-SAPUNSKA LABORATORIJA MELISSA. Sva prava
          zadržana.
        </p>
      </div>
    </div>
  );
}

export default Register;
