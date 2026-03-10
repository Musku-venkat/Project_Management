import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(id){
                const {data} = await axios.put(`http://localhost:4000/update-products/${id}`, {name, sku, price, quantity, category});
                if(data.success){
                    alert('Product Updated');
                }
            } else{
                const {data} = await axios.post('http://localhost:4000/add-products', {name, sku, price, quantity, category});
                if(data.success){
                    alert('Product Added');
                }
            }
            navigate('/');

            setName('');
            setSku('');
            setPrice('');
            setQuantity('')
            setCategory('Select');
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
            <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center gap-2 rounded shadow p-2">
                <input type="text" className="form-control" placeholder="Product Name" onChange={(e)=>setName(e.target.value)} value={name} required/>
                <input type="text" className="form-control" placeholder="Product SKU" onChange={(e)=>setSku(e.target.value)} value={sku} required/>
                <input type="number" className="form-control" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} value={price} required/>
                <input type="number" className="form-control" placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} value={quantity} required/>
                <select className="form-select" onChange={(e)=>setCategory(e.target.value)} value={category} required>
                    <option value="Select" disabled>Select</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <button type="submit" className="btn btn-dark form-control">{id ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
}

export default Addproduct;