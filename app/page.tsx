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

import { GetItems, postItemData, updateItemData } from "../services/services";

import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";


export default function Home() {

  const [ name, setName ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ option, setOption ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ cost, setCost ] = useState("");
  const [ stock, setStock ] = useState("");
  const [ uuid, setUuid ] = useState("");

  // console.log(GetItems());
  let products = GetItems();
  const uId = Object.keys(products).length+1;
  // console.log(uId)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    postItemData(uId, name, category , option , price , cost , stock);
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    // let uid = uuid+1;
    // console.log(uuid);
    setUuid('');

    updateItemData(uuid, name, category , option , price , cost , stock);
  }

  return (
    <>
    <main className="min-h-screen p-2">
      {/* Profile */}
      <div className="flex justify-end">
        <div className="flex justify-around rounded-3xl bg-slate-100 w-52 p-2">
        <div>
        <Image
          src="/company-logo.png"
          width={50}
          height={50}
          alt="Logo of the Company"
        />
        </div>
        <div className="flex flex-col items-center">
          <span> Sample Company</span>
          <span className="text-gray-500">Admin</span>
        </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="bg-slate-300 rounded h-screen mt-5">
        {/* Header */}
        <div className="flex justify-between px-5 pt-2 items-center">
          <div>
            <span className="text-6xl font-bold">Products</span>
          </div>
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
        </div>
        {/* Contents */}
        
        {/* First Product Card */}
        {/* <GetItems/> */}
        <div className="h-full flex gap-2">
          {GetItems().map((item, index) => {
            return (
              <div
                className="bg-white ml-2 w-1/4 h-1/2 p-10 mt-3 rounded-md"
                key={index}
              >
                <div className="flex flex-col">
                  <span className="text-4xl">{item.name}</span>
                  <span className="text-2xl text-gray-500">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center my-4">
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
                    <DialogContent className="max-w-screen-md " key={index}>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <form 
                      action="" 
                      onSubmit={handleUpdate} 
                      className="flex flex-col"
                    >
                      <div className="flex">
                        <div className="flex justify-around pr-2 pb-2">
                          <Input 
                              type="text" 
                              placeholder="currrent index" 
                              className="mr-2" 
                              value={item.uId}
                              onChange={(e) => setUuid(item.uId)}
                            />
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
      </div>
    </main>
    </>
  );
}
