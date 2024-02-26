"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { AddItems } from "@/components/addItem";
import { GetItems } from "../components/getItems";

import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
// import { itemRef } from "../database/config";
import { useEffect, useState } from "react";


export default function Home() {


  return (
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
          <AddItems />
        </div>
        {/* Contents */}
        
        {/* First Product Card */}
        <GetItems/>
      </div>
    </main>
  );
}
