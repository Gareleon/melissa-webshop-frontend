import React from "react";
import { Link, useNavigate } from "react-router";
import {
  useDeleteSoapMutation,
  useFetchAllSoapsQuery,
} from "../../../redux/features/soaps/soapsApi";
import Swal from "sweetalert2";

const ManageSoaps = () => {
  const navigate = useNavigate();

  const { data: soaps, refetch } = useFetchAllSoapsQuery();
  const [deleteSoap] = useDeleteSoapMutation();

  // Handle deleting a soap
  const handleDeleteSoap = async (id) => {
    try {
      await deleteSoap(id).unwrap();
      Swal.fire({
        title: "Uspešno izbrisano",
        text: "Proizvod je uspešno obrisan!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      console.error("Neuspešno brisanje proizvoda:", error.message);
      Swal.fire({
        title: "Greška",
        text: "Nije uspelo brisanje proizvoda. Pokušajte ponovo.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Handle navigating to Edit Soap page
  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-soap/${id}`);
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Svi Proizvodi
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right mt-2 md:mt-0">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Pogledaj sve
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            {/* Mobile Layout (Cards) */}
            <div className="space-y-4 md:hidden">
              {soaps &&
                soaps.map((soap, index) => (
                  <div
                    key={index}
                    className="bg-white border shadow-lg rounded-lg p-4"
                  >
                    <div className="flex justify-between md:w-1/3 items-center mb-2">
                      <h4 className="font-semibold text-lg text-blueGray-700">
                        {soap.title}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {soap.category}
                      </span>
                    </div>
                    <div className="flex justify-between md:w-1/4 items-center mb-2">
                      <p className="text-sm text-blueGray-700">
                        ${soap.newPrice}
                      </p>
                    </div>

                    <div className="flex justify-between md:w-1/3 items-center space-x-2">
                      <button
                        onClick={() => handleEditClick(soap._id)}
                        className="text-indigo-600 hover:text-indigo-700 text-xs"
                      >
                        Izmeni
                      </button>
                      <button
                        onClick={() => handleDeleteSoap(soap._id)}
                        className="bg-red-500 py-1 px-4 rounded-full text-white text-xs"
                      >
                        Obriši
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Desktop Layout (Table) */}
            <div className="hidden md:block">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Naziv proizvoda
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Kategorija
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Cena
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Akcije
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {soaps &&
                    soaps.map((soap, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 md:px-3 align-middle border-l-0 border-r-0 text-sm md:text-base lg:text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 md:px-3 align-middle border-l-0 border-r-0 text-sm md:text-base lg:text-lg whitespace-nowrap p-4">
                          {soap.title}
                        </td>
                        <td className="border-t-0 px-6 md:px-3 align-center border-l-0 border-r-0 text-sm md:text-base lg:text-lg whitespace-nowrap p-4">
                          {soap.category}
                        </td>
                        <td className="border-t-0 px-6 md:px-3 align-middle border-l-0 border-r-0 text-sm md:text-base lg:text-lg whitespace-nowrap p-4">
                          ${soap.newPrice}
                        </td>
                        <td className="border-t-0 px-6 md:px-3 align-middle border-l-0 border-r-0 text-sm md:text-base lg:text-lg whitespace-nowrap p-4 space-x-4">
                          <button
                            onClick={() => handleEditSoap(soap._id)}
                            className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                          >
                            Izmeni
                          </button>
                          <button
                            onClick={() => handleDeleteSoap(soap._id)}
                            className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                          >
                            Obriši
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageSoaps;
