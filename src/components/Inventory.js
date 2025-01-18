import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null); // Define state for editing

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/products");
            setProducts(response.data);
        } catch (error) {
            toast.error("Error fetching products. Please try again.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Inventory Management</h1>
            <div className="row">
                <div className="col-md-6">
                    <ProductForm
                        fetchProducts={fetchProducts}
                        productToEdit={productToEdit} // Pass productToEdit to ProductForm
                        setProductToEdit={setProductToEdit} // Allow clearing after saving
                    />
                </div>
                <div className="col-md-6">
                    <ProductList
                        products={products}
                        fetchProducts={fetchProducts}
                        setProductToEdit={setProductToEdit} // Pass setProductToEdit to ProductList
                    />
                </div>
            </div>
        </div>
    );
};

export default Inventory;
