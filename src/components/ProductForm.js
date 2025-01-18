import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = ({ fetchProducts, productToEdit, setProductToEdit }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price);
            setDescription(productToEdit.description);
            setQuantity(productToEdit.quantity);
        }
    }, [productToEdit]);

    const resetForm = () => {
        setName("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setProductToEdit(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, price, description, quantity };

        try {
            const token = localStorage.getItem("token");

            if (productToEdit) {
                await axios.put(
                    `http://localhost:5001/api/products/${productToEdit._id}`,
                    productData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Product updated successfully!");
            } else {
                await axios.post("http://localhost:5001/api/products", productData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Product created successfully!");
            }
            fetchProducts();
            resetForm();
        } catch (error) {
            toast.error("Error saving product. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="mb-3">
                <label>Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {productToEdit ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
};

export default ProductForm;
