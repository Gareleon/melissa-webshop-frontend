import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import Swal from "sweetalert2";

function AdminLogin() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //Use Form Hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //On Submit function to Login as admin
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/melissa-admin/top-admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          Swal.fire({
            icon: "warning",
            title: "Token je istekao",
            text: "Molimo vas da se ponovo prijavite.",
          });
          navigate("/");
        }, 3600 * 1000);
      }

      Swal.fire({
        icon: "success",
        title: "Uspešna prijava",
        text: "Dobrodošli!",
      });
      navigate("/dashboard");
    } catch (error) {
      setMessage("Molimo vas da unesete važeće korisničko ime i šifru.");
      console.log(error);
    }
  };

  //Return Admin Login Page
  return (
    <div className=" h-screen border flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Administrativni pristup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Korisničko ime
            </label>
            <input
              {...register("username", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Korisničko ime"
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
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Prijavi se
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-gray-500 text-xs">
          &copy;2018-2024 HEMIJSKO-SAPUNSKA LABORATORIJA MELISSA. Sva prava
          zadržana.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
