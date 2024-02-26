"use cient";

import React, { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ref, child, push, update, onValue } from "firebase/database";

import { database } from "../database/config";

interface IProduct {
  uId: string;
  name: string;
  category: string;
  option: string;
  price: string;
  cost: string;
  stock: string;
}

export function UpdateItem() {

  const [ name, setName ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ option, setOption ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ cost, setCost ] = useState("");
  const [ stock, setStock ] = useState("");

  const [items, setItems] = useState<IProduct[]>([]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setName('');
    setCategory('');
    setOption('');
    setPrice('');
    setCost('');
    setStock('');

    writeNewData(name, category , option , price , cost , stock);
  };

  function writeNewData(name: string, category: string , option: string , price: string , cost: string , stock: string) {
  
    // A post entry.
    const postData = {
      name: name,
      category: category,
      option: option,
      price: price,
      cost: cost,
      stock: stock
    };
  
    // Get a key for a new Post.
    // const newPostKey = push(child(ref(database))).key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    // updates[newPostKey] = postData;
    // updates[newPostKey] = postData;
  
    return update(ref(database), postData);
  }

  function writeUserData(name: any , category: any , option: any , price: any , cost: any , stock: any) {
    // const db = getDatabase();
    push(ref(database), {
      name: name,
      category: category,
      option : option,
      price: price,
      cost: cost,
      stock: stock,
    });
  }


  return (
    <>
    <main>
        <div>
          <Dialog>
            <DialogTrigger className="flex items-center bg-gray-500 px-2 py-1 rounded text-white text-xl">
              Edit
            </DialogTrigger>
            {items.map((item) => {
            // console.log(product);
            return (
              <DialogContent className="max-w-screen-md " key={item.uId}>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <form 
                action="" 
                onSubmit={handleSubmit} 
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
                      placeholder="Options (small, medium, large etc.)" 
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
                  <div className="flex items-center justify-center">
                    <button className="text-red-600 w-8 h-8">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="flex self-end w-2/3 pr-11 pb-2">
                  <Button 
                    variant="outline" 
                    className="w-full text-green-500 border-green-500 border-2 border-spacing-8 border-dashed"
                  >
                    Add Variety
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="bg-green-500 text-white w-1/4"
                  >
                    Add Item
                  </Button>
                </div>
              </form>
            </DialogContent>
            )})}
            
          </Dialog>
          </div>
    </main>
    </>
  )

}