import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // To decode the JWT and extract the logged-in user's ID

const ProductList = ({ products, fetchProducts, setProductToEdit }) => {
    let loggedInUserId = null;

    // Decode the token if it exists
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            loggedInUserId = decodedToken.id;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
    }

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5001/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Product deleted successfully!");
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.error || "Error deleting product. Please try again.");
        }
    };

    return (
        <div>
            {products.map((product) => (
                <div key={product._id} className="card mb-3">
                    <div className="card-body">
                        <h4 className="card-title">{product.name}</h4>
                        <p className="card-text">
                            <strong>Description:</strong>{" "}
                            {product.description.length > 100
                                ? `${product.description.substring(0, 100)}...`
                                : product.description}
                        </p>
                        <p className="card-text">
                            <strong>Price:</strong> ${product.price}
                        </p>
                        <p className="card-text">
                            <strong>Quantity:</strong> {product.quantity}
                        </p>
                        <p className="card-text">
                            <strong>Created By:</strong>{" "}
                            {product.userId
                                ? `${product.userId.firstName} ${product.userId.lastName}`
                                : "Unknown"}
                        </p>
                        {loggedInUserId === product.userId?._id && (
                            <>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => setProductToEdit(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
