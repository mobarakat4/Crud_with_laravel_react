import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products');
            console.log('Fetched Products:', data); // Log fetched products
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('API response is not an array:', data);
            }
        } catch (error) {
            console.log(error.response ? error.response.data.message : error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
            console.log(data.message);
            fetchProducts();
        } catch (error) {
            console.log(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Link className="btn btn-primary mb-2 float-end" to="/product/create">Create</Link>
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    console.log('hello')
                                }
                                {console.log(products)}
                                {

                                console.log('hi')
                                }
            
                                {
                                    products.map((row, key) => (
                                        <tr key={key}>
                                            <td>{row.title}</td>
                                            <td>{row.description}</td>
                                            <td>
                                                <img width="100px" src={`http://127.0.0.1:8000/storage/img/products/${row.image}`} alt={row.title} />
                                            </td>
                                            <td>
                                                <Link className="btn btn-success mb-2" to={`/product/edit/${row.id}`}>Edit</Link>
                                                <button className="btn btn-danger ms-2" onClick={() => deleteProduct(row.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
