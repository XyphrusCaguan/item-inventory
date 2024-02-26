"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ref,
  onValue,
} from "firebase/database";

import { database } from "../database/config";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
// import { UpdateItem } from "../components/updateItem";

interface IProduct {
  uId: string;
  name: string;
  category: string;
  option: string;
  price: string;
  cost: string;
  stock: string;
}

export function GetItems() {
  const [items, setItems] = useState<IProduct[]>([]);

  const [ name, setName ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ option, setOption ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ cost, setCost ] = useState("");
  const [ stock, setStock ] = useState("");

  const fetchData = () => {
    const products: IProduct[] = [];
    const dbRef = ref(database);
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.exists()) {
          // console.log(snapshot.val());
          let data = childSnapshot.val();
          products.push(data);
          setItems(products);
        } else {
          console.log("No data available");
        }
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="w-screen">
        <div className="h-full flex gap-2">
          {items.map((item) => {
            // console.log(product);
            return (
              <div
                className="bg-white ml-2 w-1/4 p-10 mt-3 rounded-md"
                key={item.uId}
              >
                <div className="flex flex-col">
                  <span className="text-4xl">{item.name}</span>
                  <span className="text-2xl text-gray-500">
                    {item.category}
                  </span>
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
                    <Button
                      variant="outline"
                      className="bg-gray-950 border-gray-950 text-white w-1/4"
                    >
                      S
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-100 border-gray-950 text-black w-1/4"
                    >
                      M
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-100 border-gray-950 text-black w-1/4"
                    >
                      L
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl">Price: ${item.price}</span>
                  <span className="text-2xl">Cost: ${item.cost}</span>
                  <span className="text-2xl">Stock: {item.stock}</span>
                </div>
                <div className="flex pt-5">
                <Dialog>
            <DialogTrigger className="flex items-center bg-gray-500 px-2 py-1 rounded text-white text-xl">
              Edit
            </DialogTrigger>
              <DialogContent className="max-w-screen-md " key={item.uId}>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <form 
                action="" 
                // onSubmit={handleSubmit} 
                className="flex flex-col"
              >
                <div className="flex">
                  <div className="flex justify-around pr-2 pb-2">
                    <Input 
                      type="text" 
                      placeholder={item.category} 
                      className="mr-2" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder={item.name} 
                      className="pr-2" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder={item.option} 
                      className="pr-2" 
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder={item.price} 
                      className="pr-2" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder={item.cost} 
                      className="pr-2" 
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder={item.stock} 
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="bg-green-500 text-white w-1/4"
                  >
                    Update Item
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}