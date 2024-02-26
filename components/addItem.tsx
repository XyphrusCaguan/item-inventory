"use cient";

import React, { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
// import { database, app, db } from '@/database/config';
import { ref, set, child, get, getDatabase, push, onValue } from 'firebase/database';

import { database } from "../database/config";

interface IProduct{
  uId: string
  name: string
  category: string
  option: string
  price: string
  cost: string
  stock: string
}

export function AddItems() {

  const [ name, setName ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ option, setOption ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ cost, setCost ] = useState("");
  const [ stock, setStock ] = useState("");

  function writeUserData(uId: any ,name: any , category: any , option: any , price: any , cost: any , stock: any) {
    // const db = getDatabase();
    push(ref(database), {
      uId: uId,
      name: name,
      category: category,
      option : option,
      price: price,
      cost: cost,
      stock: stock,
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setName('');
    setCategory('');
    setOption('');
    setPrice('');
    setCost('');
    setStock('');

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

  // console.log(products);
  const uId = Object.keys(products).length+1;

    writeUserData(uId, name, category , option , price , cost , stock);
  };

  return (
    <main>
        <div>
          <Dialog>
            <DialogTrigger className="flex items-center bg-green-500 px-2 py-1 rounded text-white text-xl">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-8">
            <path d="M13 6C13 5.44771 12.5523 5 12 5C11.4477 5 11 5.44771 11 6V11H6C5.44771 11 5 11.4477 5 12C5 12.5523 5.44771 13 6 13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6Z" fill="currentColor"/>
            </svg>
              Add Product
            </DialogTrigger>
            <DialogContent className="max-w-screen-md ">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
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
                      placeholder="Category" 
                      className="mr-2" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder="Name" 
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
                      placeholder="Price" 
                      className="pr-2" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder="Cost" 
                      className="pr-2" 
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Input 
                      type="text" 
                      placeholder="Stock" 
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
          </Dialog>
          </div>
    </main>
  )

}