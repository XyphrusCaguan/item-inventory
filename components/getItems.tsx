// "use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { ref, onValue, query, child, get, getDatabase } from 'firebase/database';

import { database } from "../database/config";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

interface IProduct{
  uId: string
  name: string
  category: string
  option: string
  price: string
  cost: string
  stock: string
}

export function GetItems() {
  
  const products: IProduct[] = [];
  const dbRef = ref(database);
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) =>{
      if (childSnapshot.exists()) {
        // console.log(snapshot.val());
        let data = childSnapshot.val();
        products.push(data);
      } else {
        console.log("No data available");
      }
    });
  })

  console.log(products);
  console.log(Object.keys(products).length)

    return(
      <>
        <main className="w-screen">
          <div className="h-full flex gap-2">
          {
          products.map((product) => {
            console.log(product)
            return(
              <div className="bg-white ml-2 w-1/4 p-10 mt-3 rounded-md" key={product.uId}>
                <div className="flex flex-col">
                  <span className="text-4xl">{product.name}</span>
                  <span className="text-2xl text-gray-500">{product.category}</span>
                </div>
                <div className="flex flex-col justify-center my-4">
                  <div>
                      <Image
                      src="/company-logo.png"
                      width={250}
                      height={250}
                      alt="Logo of the Company"
                      />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" className="bg-gray-950 border-gray-950 text-white w-1/4">S</Button>
                    <Button variant="outline" className="bg-gray-100 border-gray-950 text-black w-1/4">M</Button>
                    <Button variant="outline" className="bg-gray-100 border-gray-950 text-black w-1/4">L</Button>
                  </div>
                </div>
                <div className="flex flex-col">
                <span className="text-2xl">Price: ${product.price}</span>
                <span className="text-2xl">Cost: ${product.cost}</span>
                <span className="text-2xl">Stock: {product.stock}</span>
                </div>
              </div>
              
              )
            })
          }
          </div>
      </main>
      </>
    )
}