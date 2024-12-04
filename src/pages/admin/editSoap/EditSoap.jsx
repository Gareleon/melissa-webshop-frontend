import React, { useEffect } from "react";
import InputField from "../addSoap/InputField";
import SelectField from "../addSoap/SelectField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";
import {
  useEditSoapMutation,
  useFetchSoapByIdQuery,
} from "../../../redux/features/soaps/soapsApi";

const EditSoap = () => {
  const { id } = useParams();
  const {
    data: soapData,
    isLoading,
    isError,
    refetch,
  } = useFetchSoapByIdQuery(id);
  // console.log(soapData)
  const [editSoap] = useEditSoapMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (soapData) {
      setValue("title", soapData.title);
      setValue("description", soapData.description);
      setValue("category", soapData?.category);
      setValue("trending", soapData.trending);
      setValue("oldPrice", soapData.oldPrice);
      setValue("newPrice", soapData.newPrice);
      setValue("coverImage", soapData.coverImage);
    }
  }, [soapData, setValue]);

  const onSubmit = async (data) => {
    const updateSoapData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || soapData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/soaps/${id}`, updateSoapData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({
        title: "Izmenjen proizvod",
        text: "Proizvod je uspešno izmenjen!",
        icon: "success",
        showConfirmButton: false, // Disable the confirm button
        timer: 1000, // The alert will disappear after 3 seconds (3000 milliseconds)
        timerProgressBar: true, // Optional: shows a progress bar for the timer
      });
      await refetch();
    } catch (error) {
      //console.log("Neuspešna izmena proizvoda.");
      alert("Neuspešna izmena proizvoda.");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return Swal.fire({
      title: "Greška",
      text: "Došlo je do greške prilikom izmene proizvoda!",
      icon: "error",
      showConfirmButton: true, // Disable the confirm button
      confirmButtonText: "OK",
    });
  }
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Izmeni proizvod</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Naziv"
          name="title"
          placeholder="Unesi naziv proizvoda"
          register={register}
        />

        <InputField
          label="Opis"
          name="description"
          placeholder="Unesi opis proizvoda"
          type="textarea"
          register={register}
        />

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
          ]}
          register={register}
        />
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

        <InputField
          label="Stara cena"
          name="oldPrice"
          type="number"
          placeholder="Stara cena"
          register={register}
        />

        <InputField
          label="Nova cena"
          name="newPrice"
          type="number"
          placeholder="Nova cena"
          register={register}
        />

        <InputField
          label="Link do slike"
          name="coverImage"
          type="text"
          placeholder="Link do slike"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Izmeni proizvod
        </button>
      </form>
    </div>
  );
};

export default EditSoap;
