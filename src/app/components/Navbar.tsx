"use client";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import useProductStore from "./../store/useProductStore";

export default function Navbar() {
  const { products, addProduct, deleteProduct, updateProduct } =
    useProductStore();
  return (
    <nav className="flex flex-row justify-between items-center py-6">
      <h1 className="text-xl font-semibold uppercase">
        <Link href={"/"}>NeoPay Ecommerce</Link>
      </h1>
      <Link href={"/cart"} className="relative">
        <ShoppingBagIcon className="h-8 w-8" />
        <div className="absolute text-xs bg-white rounded-full h-3 p-2 w-3 flex justify-center items-center text-black top-[-10px] right-[-10px]">
          {products.length}
        </div>
      </Link>
    </nav>
  );
}
