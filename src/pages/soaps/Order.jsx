import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersAPI";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

function Order() {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Greška prilikom pribavljanja podatka o porudžbini.</div>;
  }
  //console.log(orders);

  return (
    <div className="container mx-auto p-6 min-h-96">
      <h1 className=" text-2xl font-semibold mb-4">Tvoje porudžbine</h1>
      {orders.length === 0 ? (
        <div>Nema pronađenih proudžbina.</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order?._id || index}>
              <div className="bg-white rounded shadow-lg p-4">
                <div key={order._id} className="border-b mb-4 pb-4"></div>
                <h2 className="font-bold">Broj porudžbine: {order?._id}</h2>
                <p className="text-gray-600">Ime: {order?.name}</p>
                <p className="text-gray-600">Email: {order?.email}</p>
                <p className="text-gray-600">Telefon: 0{order?.phone}</p>
                <p className="text-gray-600">
                  Ukupna cena: {order.totalPrice} RSD
                </p>
                <h3 className="font-semibold mt-2">Adresa:</h3>
                <p>
                  {" "}
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.zipcode}, {order.address.country}
                </p>
                <h3 className="font-semibold mt-2">Lista proizvoda:</h3>
                <ul>
                  <li key={order?._id}>{order?.products}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
