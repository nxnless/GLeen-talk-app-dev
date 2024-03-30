// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState } from 'react';
import axios from 'axios';

const Getfilter = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const [product, setProduct] = useState([]);
    //Normal Get
    React.useEffect(() => {
        axios.get(baseURL+"/api/products").then((response) => {
            //setProduct mean set product is reponse.data
            setProduct(response.data);
        });
        }, []);

    
    let productFilter;
    productFilter = product.filter(p=>{
        //condition
        return p.price >1000;
    })

    let pnd;

    //To generate data
    if (Array.isArray(product)) {
    pnd = productFilter.map(p => (
        <div key={p._id}>
        ID :{p._id}
        <span> {p.name}</span>
        <img src={p.image}/> 
        {p.price}
        {/* <button onClick={() => onDeleteProduct(p._id)}>Delete</button> */}
        </div>
    ));
    } else {
        productFilter = []; 
    }

    return (
        <>
        <div>{pnd.length}</div>
        <div>
            {pnd}
        </div>
        </>
    )
}
export default Getfilter;