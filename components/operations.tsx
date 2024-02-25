"use client";

import React, { useEffect, useState } from 'react'
import { database, db } from '../database/config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { ref } from 'firebase/database'

function FirebaseFirestore(){
    const [fname,setFname] =useState('')
    const [lname,setLname] =useState('')
    const [id,setId] =useState('')

    const [show,setShow] =useState(false)
    


    const [val,setVal] =useState([])


    
    const value = collection(db,"items")


    useEffect(()=>{
        const getData= async()=>{
          const dbVal = await getDocs(value)
          setVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
        }
        getData()
    })

    const handleCreate =async()=>{
        await addDoc(value,{name1:fname,name2:lname})
        setFname("")
        setLname("")
    }

    const handleDelete =async(id: string)=>{
       const deleteVal =  doc(db,"items",id)
       await deleteDoc(deleteVal)
    }

    const handleEdit =async(id: React.SetStateAction<string>,name1: React.SetStateAction<string>,name2: React.SetStateAction<string>)=>{
        setFname(name1)
        setLname(name2)
        setId(id)
        setShow(true)
    }

    const handleUpdate =async()=>{
        const updateData = doc(db,"items",id)
        await updateDoc(updateData,{name1:fname,name2:lname})
        setShow(false)
        setFname("")
        setLname("")
    }

    return(
        <div className='container'>
           <input value={fname} onChange={(e) => setFname(e.target.value)} />
           <input value={lname} onChange={(e) => setLname(e.target.value)} />
           {!show?<button onClick={handleCreate}>Create</button>:
           <button onClick={handleUpdate}>Update</button>}
           {
            val.map(values=>
            <div>
                <h1>{values.name1}</h1>
                <h1>{values.name2}</h1>
                <button onClick={()=>handleDelete(values.id)}>Delete</button>
                <button onClick={()=>handleEdit(values.id,values.name1,values.name2)}>Edit</button>
            </div>)
           }
        </div>
    )
}
export default FirebaseFirestore;