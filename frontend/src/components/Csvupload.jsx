import axios from "axios";
import { useState } from "react";

function Csvupload(){
    const [file, setFile] = useState();

    async function handleUpload(){
        const formData = new FormData();

        formData.append('file', file);

        const {data} = await axios.post('http://localhost:4000/upload-csv', formData);
        if(data.success){
            alert('CSV Uploaded Successfully');
        }else{
            alert(data.message);
        }
    }

    return(
        <div className="my-4 rounded p-2 py-4 shadow">
                <input type="file" accept=".csv" onChange={(e)=>setFile(e.target.files[0])}/>
                <button className="btn btn-primary" onClick={handleUpload}>Upload CSV File</button>
        </div>
    );
}

export default Csvupload;