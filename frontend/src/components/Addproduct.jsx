import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Csvupload from "./Csvupload";

function Addproduct(){
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('Select');
    const navigate = useNavigate();
    const {id} = useParams();

    async function fetchData() {
        const {data} = await axios.get(`http://localhost:4000/product/${id}`);
        if(data.success){
            const product = data.data;

            setName(product.name);
            setSku(product.sku);
            setPrice(product.price);
            setQuantity(product.quantity);
            setCategory(product.category);
        }else{
            console.log(data.message);
        }
    }

    function clear(){
        setName('');
        setSku('');
        setPrice('');
        setQuantity('')
        setCategory('Select');
    }

    async function handleSubmit(e){
        e.preventDefault();

        try {
            if(id){
                const {data} = await axios.put(`http://localhost:4000/update-products/${id}`, {name, sku, price, quantity, category});
                if(data.success){
                    alert('Product Updated');
                    navigate('/');
                    clear();
                }else{
                    alert(data.message);
                }
            } else{
                const {data} = await axios.post('http://localhost:4000/add-products', {name, sku, price, quantity, category});
                if(data.success){
                    alert('Product Added');
                    navigate('/');
                    clear();
                }else{
                    alert(data.message);
                }
            }

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        if(id){
            fetchData();
        }
    }, [id]);
    return(
        <div className="rounded p-2 d-flex justify-content-center align-items-center shadow">
            <div>
                <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center gap-4 rounded shadow p-5 my-2">
                    <input type="text" className="form-control" placeholder="Product Name" onChange={(e)=>setName(e.target.value)} value={name} required/>
                    <input type="text" className="form-control" placeholder="Product SKU" onChange={(e)=>setSku(e.target.value)} value={sku} required/>
                    <input type="number" className="form-control" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} value={price} required/>
                    <input type="number" className="form-control" placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} value={quantity} required/>
                    <select className="form-select" onChange={(e)=>setCategory(e.target.value)} value={category} required>
                        <option value="Select" disabled>Select</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    <div className="d-flex gap-5">
                        <button type="submit" className="btn btn-dark px-4">{id ? 'Edit' : 'Add'}</button>
                        <button onClick={()=>clear()}className="btn btn-primary px-4">Clear</button>
                    </div>
                </form>
                <Csvupload/>
            </div>
        </div>
    );
}

export default Addproduct;