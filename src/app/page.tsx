"use client";
import Image from "next/image";
import Products from "./data/products.json";
import useProductStore from "./store/useProductStore";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const { products, addProduct } = useProductStore();

  const handleAddProduct = (productID: number, price: number) => {
    const newProduct = { id: productID, price: price };
    addProduct(newProduct);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12">
      <div className="grid grid-cols-3 gap-8 w-full">
        {Products.map((product, index) => {
          return (
            <div className="bg-white rounded-xl shadow-md" key={index}>
              <div className="w-full">
                <Image
                  className="w-full object-cover h-80 rounded-t-xl"
                  src={product.image}
                  alt={product.name}
                  height={100}
                  width={100}
                />
              </div>
              <div className="flex flex-col justify-center items-center text-black gap-4 p-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <h3 className="font-bold text-2xl">${product.amount}</h3>
                </div>
                <p className="text-sm line-clamp-2">{product.desc}</p>

                <div className="flex justify-end items-center w-full">
                  {!products.find((p: any) => p.id === index) ? (
                    <button
                      className="bg-black rounded-full px-4 py-2 text-white"
                      onClick={() =>
                        handleAddProduct(product.id, product.amount)
                      }
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button className="bg-black rounded-full px-4 py-2 text-white flex flex-row justify-center items-center gap-2">
                      Added to Cart
                      <CheckBadgeIcon className="h-5 w-5 text-green-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
