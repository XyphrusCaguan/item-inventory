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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { GetItems, postItemData, updateItemData } from "../services/services";

import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";

export default function Home() {

  const [ name, setName ] = useState("");
  const [ category, setCategory ] = useState("");

  const [ option, setOption ] = useState("");
  const [ option2, setOption2 ] = useState("");
  const [ option3, setOption3 ] = useState("");

  const [ price, setPrice ] = useState("");
  const [ price2, setPrice2 ] = useState("");
  const [ price3, setPrice3 ] = useState("");

  const [ cost, setCost ] = useState("");
  const [ cost2, setCost2 ] = useState("");
  const [ cost3, setCost3 ] = useState("");

  const [ stock, setStock ] = useState("");
  const [ stock2, setStock2 ] = useState("");
  const [ stock3, setStock3 ] = useState("");

  const [ uuid, setUuid ] = useState("");

  const [show, setShow] = useState(false);

  const [ postalert, setPostAlert] = useState(false);
  const [ updatealert, setUpdateAlert] = useState(false);

  const handleAddVariety = async (e: any) => {
    e.preventDefault();
    setShow(true);
  }

  const handleCloseVariety = async (e: any) => {
    e.preventDefault();
    setShow(false);
  }

  // console.log(GetItems());
  let products = GetItems();
  const uId = Object.keys(products).length+1;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const arrayOption = [option, option2, option3]
    const arrayPrice = [price, price2, price3]
    const arrayCost = [cost, cost2, cost3]
    const arrayStock = [stock, stock2, stock3]
    setPostAlert(true)

    const timePost = setTimeout(() => {
      // After 3 seconds set the show value to false
      setPostAlert(false)
    }, 3000)

    postItemData(uId, name, category , arrayOption , arrayPrice , arrayCost , arrayStock);
    return () => {
      clearTimeout(timePost)
    }
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    
    const arrayOption = [option, option2, option3]
    const arrayPrice = [price, price2, price3]
    const arrayCost = [cost, cost2, cost3]
    const arrayStock = [stock, stock2, stock3]
    setUpdateAlert(true)

    const timeUpdate = setTimeout(() => {
      // After 3 seconds set the show value to false
      setUpdateAlert(false)
    }, 3000)

    updateItemData(uuid, name, category , arrayOption , arrayPrice , arrayCost , arrayStock);
  }

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setPostAlert(false);
    }, 3000);

    setTimeout(() => {
      setUpdateAlert(false);
    }, 3000);
  }, []); 

  return (
    <>
    <main className="min-h-screen min-w-128 p-2">
      {postalert && <div className={`alert alert-${postalert ? 'absolute ': 'hidden'} fixed bg-green-400 w-1/4 h-16 p-4 z-99 inset-x-0 mx-auto text-center`}>
        <span className="text-black text-2xl">Data added!</span>  
      </div>}
      {updatealert && <div className={`alert alert-${updatealert ? 'absolute' : 'hidden'} fixed bg-green-400 w-1/4 h-16 p-4 z-99 inset-x-0 mx-auto text-center`}>
        <span className="text-black text-2xl">Data updated!</span>  
      </div>}
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
      <div className="bg-slate-100 rounded h-full mt-5">
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
                className="flex"
              >
                <div>
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
                  </div>
                </div>
                <div className="flex flex-col">
                  {/* option --> stock inputs2 */}
                <div className="flex gap-2 pb-2">
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
                <div className={`${show ? 'block' : 'hidden'} w-full h-full flex justify-center items-center gap-2 pb-2`}>
                  {/* option --> stock inputs2 */}
                  <Input 
                    type="text" 
                    placeholder="Options (small, medium, large etc.)" 
                    className="pr-2" 
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Price" 
                    className="pr-2" 
                    value={price2}
                    onChange={(e) => setPrice2(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Cost" 
                    className="pr-2" 
                    value={cost2}
                    onChange={(e) => setCost2(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Stock" 
                    value={stock2}
                    onChange={(e) => setStock2(e.target.value)}
                  />
                <div className="flex items-center justify-center">
                  <button className="text-red-600 w-8 h-8" onClick={handleCloseVariety}>
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/></svg>
                  </button>
                </div>
                </div>
                <div className={`${show ? 'block' : 'hidden'} w-full h-full flex justify-center items-center gap-2 pb-2`}>
                  {/* option --> stock inputs3 */}
                  <Input 
                    type="text" 
                    placeholder="Options (small, medium, large etc.)" 
                    className="pr-2" 
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Price" 
                    className="pr-2" 
                    value={price3}
                    onChange={(e) => setPrice3(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Cost" 
                    className="pr-2" 
                    value={cost3}
                    onChange={(e) => setCost3(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Stock" 
                    value={stock3}
                    onChange={(e) => setStock3(e.target.value)}
                  />
                <div className="flex items-center justify-center">
                  <button className="text-red-600 w-8 h-8" onClick={handleCloseVariety}>
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/></svg>
                  </button>
                </div>
                </div>
                <div className="flex self-end w-2/3 pr-11 pb-2">
                  <Button 
                    variant="outline" 
                    className="w-full text-green-500 border-green-500 border-2 border-spacing-8 border-dashed"
                    onClick={handleAddVariety}
                  >
                    Add Variety
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="bg-green-500 text-white w-1/4"
                    onClick={handleSubmit}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>
        {/* Contents */}
        
        {/* Product Card */}
        <div className="h-full gap-16 p-12 grid grid-cols-3">
          {GetItems().map((item, index) => {

            
            const arrayOption: any[] = [];
            const arrayPrice: any[] = [];
            const arrayCost: any[] = [];
            const arrayStock: any[] = [];

            arrayOption.push(item.option)
            arrayPrice.push(item.price)
            arrayCost.push(item.cost)
            arrayStock.push(item.stock)
            console.log(arrayOption)
            return (
              <div
                className="bg-white ml-2 w-full h-full p-10 mt-3 rounded-md"
                key={index}
              >
                <div className="flex flex-col">
                  <span className="text-4xl">{item.name}</span>
                  <span className="text-2xl text-gray-500">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center my-4">
                  <div className="flex justify-center w-full">
                    {/* carousel options --> stocks */}
                    
                    <Carousel className="w-3/4 h-full">
                      <CarouselContent>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex aspect-square justify-center p-6 flex-col gap-2">
                                  {arrayOption.map((arrayoption)=>{
                                    return(
                                      <div key={index}>
                                        <span className="text-3xl font-semibold">{arrayoption[index]}</span>
                                      </div>
                                    )
                                  })}
                                  {arrayPrice.map((arrayprice)=>{
                                    return(
                                      <div key={index}>
                                        <span className="text-2xl font-semibold">Price: ₱{arrayprice[index]}</span>
                                      </div>
                                    )
                                  })}
                                  {arrayCost.map((arraycost)=>{
                                    return(
                                      <div key={index}>
                                        <span className="text-2xl font-semibold">Cost: ₱{arraycost[index]}</span>
                                      </div>
                                    )
                                  })}
                                  {arrayStock.map((arraystock)=>{
                                    return(
                                      <div key={index}>
                                        <span className="text-2xl font-semibold">Stock: {arraystock[index]}</span>
                                      </div>
                                    )
                                  })}
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>
                <div className="flex pt-5">
                <Dialog>
                  <DialogTrigger className="flex items-center bg-gray-500 px-2 py-1 rounded text-white text-xl">
                    Edit
                  </DialogTrigger>
                    <DialogContent className="max-w-screen-md " key={index}>
                    <DialogHeader>
                      <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>
                    <form 
                      action="" 
                      className="flex"
                    >
                      <div className="flex">
                        <div className="flex justify-around pr-2 pb-2">
                          <Input 
                              type="text" 
                              placeholder={item.uId} 
                              className="mr-2" 
                              value={uuid}
                              onChange={(e) => setUuid(e.target.value)}
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
                        </div>
                      </div>
                      <div className="flex flex-col">
                      {/* option --> stock update1 */}
                      <div className="flex gap-2 pb-2">
                        <Input 
                          type="text" 
                          placeholder={arrayOption[0][0]} 
                          className="pr-2" 
                          value={option}
                          onChange={(e) => setOption(e.target.value)}
                        />
                        <Input 
                          type="text" 
                          placeholder={arrayPrice[0][0]} 
                          className="pr-2" 
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <Input 
                          type="text" 
                          placeholder={arrayCost[0][0]} 
                          className="pr-2" 
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                        />
                        <Input 
                          type="text" 
                          placeholder={arrayStock[0][0]} 
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className='w-full h-full flex justify-center items-center gap-2 pb-2'>
                        {/* option --> stock update2 */}
                        <Input 
                          type="text" 
                          placeholder={arrayOption[0][1]} 
                          className="pr-2" 
                          value={option2}
                          onChange={(e) => setOption2(e.target.value)}
                        />
                        <Input 
                          type="text" 
                          placeholder={arrayPrice[0][1]} 
                          className="pr-2" 
                          value={price2}
                          onChange={(e) => setPrice2(e.target.value)}
                        />
                        <Input 
                          type="text" 
                          placeholder={arrayCost[0][1]}
                          className="pr-2" 
                          value={cost2}
                          onChange={(e) => setCost2(e.target.value)}
                        />
                        <Input 
                          type="text" 
                          placeholder={arrayStock[0][1]}
                          value={stock2}
                          onChange={(e) => setStock2(e.target.value)}
                        />
                      </div>
                    <div className='w-full h-full flex justify-center items-center gap-2 pb-2'>
                      {/* option --> stock update3 */}
                      <Input 
                        type="text" 
                        placeholder={arrayOption[0][2]} 
                        className="pr-2" 
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                      />
                      <Input 
                        type="text" 
                        placeholder={arrayPrice[0][2]}
                        className="pr-2" 
                        value={price3}
                        onChange={(e) => setPrice3(e.target.value)}
                      />
                      <Input 
                        type="text" 
                        placeholder={arrayCost[0][2]} 
                        className="pr-2" 
                        value={cost3}
                        onChange={(e) => setCost3(e.target.value)}
                      />
                      <Input 
                        type="text" 
                        placeholder={arrayStock[0][2]}
                        value={stock3}
                        onChange={(e) => setStock3(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center">
                        <Button 
                          type="submit" 
                          variant="outline" 
                          className="bg-green-500 text-white w-1/2"
                          onClick={handleUpdate}
                        >
                          Update Item
                        </Button>
                      </div>
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
