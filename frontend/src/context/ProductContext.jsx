import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import axios from 'axios';

export const ProductContext = createContext();

export function ContextProvider({children}){
    const [products, setProducts] = useState([]);

    async function fetchData() {
        const {data} = await axios.get('http://localhost:4000/products');
        if(data.success){
            setProducts(data.data);
        }else{
            alert('Network Error');
        }
    }

    async function deleteData(id) {
        const {data} = await axios.delete(`http://localhost:4000/delete-products/${id}`);
        if(data.success){
            alert(data.message);
            fetchData();
        }else{
            alert(data.message)
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);
    return(
        <ProductContext.Provider value={{products, deleteData}}>
            {children}
        </ProductContext.Provider>
    );
}