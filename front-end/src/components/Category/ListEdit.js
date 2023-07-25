import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function ListEdit(props) {
    const navigate = useNavigate();
    const [showEditForm, setShowEditForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: '',
        Category_name: '',
        Description: '',
        owner: '',
        Emojis: ''
    });


    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/category/${id}/delete/`
            );
            console.log("deleted successfully!");
            window.location.reload(false)
            // navigate('/Delete/ViewAll');
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem("token");
        console.log('tokkkken', token);
        const response = await axios.get('http://127.0.0.1:8000/api/category/list/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        console.log(response.data);
        setCategories(response.data);
    };
    const saveCategory = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/category/${selectedCategory.id}/update/`,
                selectedCategory
            );
            console.log("Category updated successfully!");
            setShowEditForm(false); // Hide the edit form after saving
            fetchCategories(); // Refresh the category list
        } catch (error) {
            console.log("Error updating category:", error);
        }
    };

    const editHandler = async (id) => {
        setShowEditForm(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/category/${id}/retrieve/`
            );
            console.log("Fetched category data for editing:", response.data);
            setSelectedCategory(response.data);
            setShowEditForm(true);
        } catch (error) {
            console.log("Error fetching category data for editing:", error);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSelectedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const allCategories = categories.map((cat, index) => {
        return (
            <div class="col-lg-4 col-md-8" key={index}>
                {/* ... (rest of the JSX code remains the same) ... */}
                <div class="card">
                    <div class="card-body">
                        <div class="author">
                            <div class="name">
                                <span>Cateogry name: {cat.Category_name}</span>
                                <div class="stats">
                                    <small><i class="far fa-clock"></i>Description: {cat.Description}</small>
                                </div>
                            </div>
                        </div>
                        <p class="mt-4">Emojes: {cat.Emojis}</p>
                        <p class="mt-4">Owner: {cat.owner}</p>
                        <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(cat.id)}>Delete</button>
                        <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => editHandler(cat.id)}>Edit</button>
                    </div>
                </div>
                <br/>
            </div>
        );
    });

    if (!showEditForm) {
        return (
            <div>
                <h1>All Categories</h1>
                {allCategories}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Edit Category</h1>
                <div>
                    <label>Category name</label>
                    <input type='text' name="Category_name" placeholder="Category_name" onChange={changeHandler} value={selectedCategory.Category_name}></input>
                    <input class="form-control" type="hidden" name="id" value={selectedCategory.id} onChange={changeHandler} />
                </div>
                <div>
                    <label>Description</label>
                    <input type='text' name="Description" placeholder="Description" onChange={changeHandler} value={selectedCategory.Description}></input>
                </div>
                <div>
                    <label>owner:</label>
                    <input type='text' name="owner" placeholder="owner" onChange={changeHandler} value={selectedCategory.owner}></input>
                </div>
                <div>
                    <label>Emojis</label>
                    <input type="text" name="Emojis" placeholder="Emojis" onChange={changeHandler} value={selectedCategory.Emojis}></input>
                </div>
                {/* Add a save button to submit the edited category */}
                <button type="button" class="btn bg-gradient-primary btn-lg" onClick={saveCategory}>Save</button>
            </div>
        );
    }
}