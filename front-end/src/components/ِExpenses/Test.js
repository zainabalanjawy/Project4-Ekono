import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function ListEdit(props) {
    const navigate = useNavigate();
    const [showEditForm, setShowEditForm] = useState(false);
    const[Category,setCategory] = useState([]);
    const [Expenses, setExpenses] = useState([]);
    const [selectedExpenses, setSelectedExpenses] = useState({
        id: '',
        placName: '',
        Items: '',
        Amount: '',
        Category: '',

    });
    useEffect(() => {
        fetchExpenses();
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
    const token = localStorage.getItem("token")
    console.log('tokkkken',token);
      const response = await axios.get(`http://127.0.0.1:8000/api/category/list/`,{
        headers: {
          'Authorization': `Token ${token}`
        } 
      })
      console.log("response___", response)
      setCategory(response.data)
  }

  const category = Category.map((category, index) => {
    console.log('Category:', category)
    return(
      <>
        <option value={category.id}>{category.Category_name}</option>
      </>
    )
  })

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/Expenses/${id}/Delete/`
            );
            console.log("deleted successfully!");
            window.location.reload(false)
            // navigate('/Delete/ViewAll');
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };
    const fetchExpenses = async () => {
        const token = localStorage.getItem("token");
        console.log('tokkkken', token);
        const response = await axios.get('http://127.0.0.1:8000/api/Expenses/List/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        console.log(response.data);
        setExpenses(response.data);
    };
    const saveExpense = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/Expenses/${selectedExpenses.id}/Update/`,
                selectedExpenses
            );
            console.log("Exp updated successfully!");
            setShowEditForm(false); // Hide the edit form after saving
            fetchExpenses(); // Refresh the category list
        } catch (error) {
            console.log("Error updating category:", error);
        }
    };
    const editHandler = async (id) => {
        setShowEditForm(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/Expenses/${id}/Details/`
            );
            console.log("Fetched category data for editing:", response.data);
            setSelectedExpenses(response.data);
            setShowEditForm(true);
        } catch (error) {
            console.log("Error fetching category data for editing:", error);
        }
    };
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSelectedExpenses((prevExp) => ({ ...prevExp, [name]: value }));
    };
    const allExpense = Expenses.map((exp, index) => {
        return (
         
            <div class="col-lg-4 col-md-8" key={index}>
                <div class="card">
                    <div class="card-body">
                        <div class="author">
                            <div class="name">
                                <span>Place Name: {exp.PlaceName}</span>
                                <div class="stats">
                                    <small><i class="far fa-clock"></i>Items: {exp.Items}</small>
                                </div>
                                <div>
                                <label>Category: {exp.Category.Category_name}  </label>
            
                                </div>
                            </div>
                        </div>
                        <p class="mt-4">Amount: {exp.Amount}</p>
                     
                        <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(exp.id)}>Delete</button>
                        <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => editHandler(exp.id)}>Edit</button>
                    </div>
                </div>
                <br/>
            </div>
        );
    });
    if (!showEditForm) {
        return (
            <div>
                <h1>All Expense</h1>
                {allExpense}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Edit Expenses</h1>
                <div>
                    <label>place Name: </label>
                    <input type='text' name="PlaceName" placeholder="PlaceName" onChange={changeHandler} value={selectedExpenses.PlaceName}></input>
                    <input class="form-control" type="hidden" name="id" value={selectedExpenses.id} onChange={changeHandler} />
                </div>
                <div>
                    <label>Items: </label>
                    <input type='text' name="Items" placeholder="Items" onChange={changeHandler} value={selectedExpenses.Items}></input>
                </div>

                <div>
                     <label>Amount: </label>
                    <input type='text' name="Amount" placeholder="Amount" onChange={changeHandler} value={selectedExpenses.Amount}></input> 
                </div>

                <div>
                  
                 <select name='Category'>
                {category}
                 </select>

                 </div>

                <button type="button" class="btn bg-gradient-primary btn-lg" onClick={saveExpense}>Save</button>
            </div>
        );
    }
}