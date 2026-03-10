import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

 function Home(){
    const {products, updateData, deleteData} = useContext(ProductContext);
    const navigate = useNavigate()

    return(
        <div className="p-2 rounded text-center shadow-lg">
            {
                products.length > 0
                ? <table className="table table-bordered text-center" border={'2'}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index)=>(
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category}</td>
                                    <td className="d-flex gap-4 justify-content-center">
                                        <button className="btn btn-warning" onClick={()=> navigate(`/edit/${item._id}`)}>Edit</button>
                                        <button className="btn btn-danger" onClick={()=>deleteData(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                : <p>No products Available</p>
            }
        </div>
    );
}

export default Home;