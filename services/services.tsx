"use client";

import {
  ref,
  onValue,
  push,
  update,
  set,
  child,
  remove,
} from "firebase/database";

import { database } from "../database/config";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useEffect, useState } from "react";

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
  
  return(items);
}

export function postItemData(uId: any ,name: any , category: any , arrayOption: any , arrayPrice: any , arrayCost: any , arrayStock: any) {

    set(ref(database, 'item' + uId ), {
        uId: uId,
        name: name,
        category: category,
        option : arrayOption,
        price: arrayPrice,
        cost: arrayCost,
        stock: arrayStock,
    });
}

export function updateItemData(uuid: any,name: any, category: any , arrayOption: any , arrayPrice: any , arrayCost: any , arrayStock: any) {

    set(ref(database, 'item' + uuid), {
        uId: uuid,
        name: name,
        category: category,
        option: arrayOption,
        price: arrayPrice,
        cost: arrayCost,
        stock: arrayStock
    });
}