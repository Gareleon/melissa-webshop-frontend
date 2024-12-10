import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAddSoapMutation } from "../../../redux/features/soaps/soapsApi";

const AddSoap = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [AddSoap, { isLoading, isError }] = useAddSoapMutation();
  const onSubmit = async (data) => {
    const newSoapData = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await AddSoap(newSoapData).unwrap();
      Swal.fire({
        title: "Kreiran proizvod",
        text: "Tvoj proizvod je uspešno kreiran!",
        icon: "success",
        showConfirmButton: false, // Disable the confirm button
        timer: 1000, // The alert will disappear after 3 seconds (3000 milliseconds)
        timerProgressBar: true, // Optional: shows a progress bar for the timer
      });
      reset();
    } catch (error) {
      console.error(error);
      alert("Neuspešno kreiran proizvod. Pokušajte ponovo.");
    }
  };

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Dodaj novi proizvod
      </h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Naziv"
          name="title"
          placeholder="Unesi naziv proizvoda"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Opis"
          name="description"
          placeholder="Unesi opis proizvoda"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Kategorija"
          name="category"
          options={[
            { label: "Izaberi kategoriju", value: "" },
            { label: "Aromaterapija", value: "aromaterapija" },
            { label: "Piling", value: "piling" },
            { label: "Osvežavajući", value: "osvežavajući" },
            { label: "Detoks", value: "detoks" },
            { label: "Hidratantni", value: "hidratantni" },
            { label: "Umirujući", value: "umirujući" },
            { label: "Luksuzni", value: "luksuzni" },
            { label: "Energizujući", value: "energizujući" },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Popularno
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Stara cena"
          name="oldPrice"
          type="number"
          placeholder="Stara cena"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="Nova cena"
          name="newPrice"
          type="number"
          placeholder="Nova cena"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <InputField
            label="Slika"
            name="CoverImage"
            type="text"
            placeholder="Link do slike"
            register={register}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Dodavanje... </span>
          ) : (
            <span>Dodaj prozvod</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddSoap;
