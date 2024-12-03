import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersAPI";
import Swal from "sweetalert2";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);

  const onSubmit = async (data) => {
    console.log("Form Submitted: ", data);
    const newOrder = {
      name: data.name,
      email: data.email,
      address: {
        street: data.address,
        city: data.city,
        zipcode: data.zipcode,
        country: data.country,
      },
      phone: data.phone,
      products: cartItems.map((item) => item._id), // Sending actual product IDs
      totalPrice: totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Porudžbina je uspešno kreirana!",
        timer: 3000, // The alert will auto-close after 3 seconds
        timerProgressBar: true, // Shows a progress bar while the timer runs
        willClose: () => {
          console.log("The alert is closed!");
        },
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error:", error);
      if (error?.data) {
        Swal.fire({
          title: "Neuspešno kreiranje porudžbine",
          text:
            error?.data?.message ||
            "Došlo je do greške prilikom kreiranja porudžbine.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <div>Učitavanje...</div>;
  }

  console.log(errors);

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Plaćanje pouzećem
            </h2>
            <p className="text-gray-500 mb-2">Ukupna cena: {totalPrice} RSD</p>
            <p className="text-gray-500 mb-6">
              Količina: {cartItems?.length > 0 ? cartItems.length : "0"} kom.
            </p>
          </div>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="text-gray-600">
                <p className="font-medium text-lg">Lični podaci</p>
                <p>Molimo Vas popunite sva polja.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="name">Ime i prezime</label>
                    <input
                      {...register("name", { required: "Ime je obavezno" })}
                      type="text"
                      id="name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email adresa</label>
                    <input
                      {...register("email", { required: "Email je obavezan" })}
                      type="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue={currentUser ? currentUser.email : ""}
                      placeholder={currentUser ? "" : "imeprezime@gmail.com"}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="phone">Broj telefona</label>
                    <input
                      {...register("phone", {
                        required: "Telefon je obavezan",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Samo brojevi su dozvoljeni",
                        },
                      })}
                      type="text"
                      id="phone"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="060 1517 654"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Adresa / Ulica i broj kuće</label>
                    <input
                      {...register("address", {
                        required: "Adresa je obavezna",
                      })}
                      type="text"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.address && (
                      <span className="text-red-500 text-sm">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">Grad</label>
                    <input
                      {...register("city", { required: "Grad je obavezan" })}
                      type="text"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.city && (
                      <span className="text-red-500 text-sm">
                        {errors.city.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Poštanski broj</label>
                    <input
                      {...register("zipcode", {
                        required: "Poštanski broj je obavezan",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Samo brojevi su dozvoljeni",
                        },
                      })}
                      type="text"
                      id="zipcode"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.zipcode && (
                      <span className="text-red-500 text-sm">
                        {errors.zipcode.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Država</label>
                    <input
                      {...register("country", {
                        required: "Država je obavezna",
                      })}
                      id="country"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Država"
                    />
                    {errors.country && (
                      <span className="text-red-500 text-sm">
                        {errors.country.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        id="billing_same"
                        className="form-checkbox"
                        onClick={() =>
                          setIsChecked((prevIsChecked) => !prevIsChecked)
                        }
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        Prihvatam{" "}
                        <Link className="underline text-blue-600">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="underline text-blue-600">
                          Shopping Policy.
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <button
                      type="submit"
                      disabled={!isChecked}
                      className={`${
                        !isChecked
                          ? "bg-gray-300"
                          : "bg-blue-500 hover:bg-blue-700"
                      } text-white font-bold py-2 px-4 rounded`}
                    >
                      Završi porudžbinu
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
