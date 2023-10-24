"use client";

import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Products from "./../data/products.json";
import Image from "next/image";
import PaymentModel from "../components/PaymentModel";
import { useEffect, useState } from "react";
import useProductStore from "./../store/useProductStore";

// interface Token {
//   logoURI: string;
//   address: `0x${string}`;
//   name: string;
//   symbol: string;
//   decimals: number;
// }
interface QrDataInterface {
  amount: number;
  token: string;
  receiver: `0x${string}`;
}

export default function Cart() {
  const { products, addProduct, deleteProduct, updateProduct } =
    useProductStore();
  const [total, setTotal] = useState(100 * products.length);
  const [toggle, setToggle] = useState(false);
  const [qrData, setQrData] = useState<QrDataInterface>();

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-start gap-12">
      <div className="text-2xl font-bold">
        <h2>Cart</h2>
      </div>
      <div className="grid grid-cols-4 gap-8 w-full">
        <div className="bg-white rounded-md shadow-md text-black col-span-3 p-4">
          <div className="flex flex-col justify-center items-center gap-4 h-full">
            {products.map((item: any, i: number) => {
              return (
                <div
                  className="flex flex-row justify-between items-center w-full"
                  key={i}
                >
                  <div className="flex flex-row justify-center items-center gap-4">
                    <Image
                      className="h-18 w-18 rounded-full shadow-md border-2 border-black"
                      src={Products[item.id].image}
                      alt={Products[item.id].name}
                      height="100"
                      width="100"
                    />
                    <h3 className="text-lg font-semibold">
                      {Products[item.id].name}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2">
                    {/* <div className="h-8 w-8 bg-black flex justify-center items-center rounded-lg">
                      <PlusIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="w-4 text-center">1</div>
                    <div className="h-8 w-8 bg-black flex justify-center items-center rounded-lg">
                      <MinusIcon className="h-6 w-6 text-white" />
                    </div> */}
                    <div className="font-bold text-lg">
                      ${Products[item.id].amount}
                    </div>
                    <div
                      className="h-8 w-8"
                      onClick={() => handleDeleteProduct(Products[item.id].id)}
                    >
                      <TrashIcon />
                    </div>
                  </div>
                </div>
              );
            })}
            {products.length <= 0 && (
              <div className="flex flex-row justify-center items-center gap-2 text-xl">
                Cart is empty
                <div className="h-5 w-5">
                  <ShoppingCartIcon />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md text-black p-4 flex flex-col justify-between items-center gap-8">
          <div className="w-full flex flex-col divide-y text-sm">
            <div className="flex justify-between items-center py-2">
              <h3>Tax</h3>
              <h4>$0</h4>
            </div>
            <div className="flex justify-between items-center py-2">
              <h3>Shipping</h3>
              <h4>$0</h4>
            </div>
            <div className="flex justify-between items-center font-bold text-lg py-2">
              <h3>Total</h3>
              <h4>
                $
                {products?.reduce(
                  (total: number, product: any) => total + product.price,
                  0
                )}
              </h4>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <button
              className="w-full border border-black text-black py-2.5 rounded-md"
              onClick={() => setToggle(true)}
            >
              Pay with Card
            </button>
            <div className="text-xs">(OR)</div>
            <button
              className="w-full bg-black border border-black text-white py-2.5 rounded-md"
              onClick={() => setToggle(true)}
            >
              Pay with NeoPay
            </button>
          </div>
          <PaymentModel
            toggle={toggle}
            close={setToggle}
            total={products?.reduce(
              (total: number, product: any) => total + product.price,
              0
            )}
          />
        </div>
      </div>
    </section>
  );
}
