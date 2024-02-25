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

export function AddItems() {
    // separate file crud ops
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [option, setOption] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setName('');
    setCategory('');
    setOption('');
    setPrice('');
    setCost('');
    setStock('');
    
    console.log(name, category, option, price, cost, stock)
    const data = [name, category, option, price, cost, stock]

    const responseRaw = await fetch(
      "https://iteminventory-d5ebd-default-rtdb.firebaseio.com/itemInventory.json",
      {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data)
      }
    );
    const response = responseRaw.json();
  };

  return (
    <main>
        {/* ui component */}
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
              <form action="" onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex">
                  <div className="flex justify-around pr-2 pb-2">
                    <Input type="text" placeholder="Category" className="mr-2" value={category}
                    onChange={(e) => setCategory(e.target.value)}/>
                    <Input type="text" placeholder="Name" className="pr-2" value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <Input type="text" placeholder="Options (small, medium, large etc.)" className="pr-2" value={option}
                    onChange={(e) => setOption(e.target.value)}/>
                    <Input type="text" placeholder="Price" className="pr-2" value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                    <Input type="text" placeholder="Cost" className="pr-2" value={cost}
                    onChange={(e) => setCost(e.target.value)}/>
                    <Input type="number" placeholder="Stock" value={stock}
                    onChange={(e) => setStock(e.target.value)}/>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="text-red-600 w-8 h-8">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="flex self-end w-3/4 pr-10 pb-2">
                  <Button variant="outline" className="w-full text-green-500 border-green-500 border-2 border-spacing-8 border-dashed">Add Variety</Button>
                </div>
                <div className="flex justify-center">
                  <Button type="submit" variant="outline" className="bg-green-500 text-white w-1/4">Add Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
    </main>
  )

}