import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

function Register() {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Register User
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Uspešna registracija!",
        text: "Korisnik je uspešno registrovan.",
      });
      navigate("/login");
    } catch (error) {
      setMessage("Molimo vas, unesite ispravan email i šifru.");
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Greška",
        text: "Molimo vas, pokušajte ponovo.",
      });
    }
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Uspešna prijava!",
        text: "Dobrodošli nazad!",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Greška",
        text: "Prijava pomoću Google-a nije uspela.",
      });
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Registracija korisnika
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Unesite email adresu"
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
              placeholder="Unesite šifru"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div className="flex flex-wrap items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registruj se
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
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
