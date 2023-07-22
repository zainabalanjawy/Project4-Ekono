import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListExpenses = () => {
    // const listExpenses = () => {
        const [Expenses, setExpenses] = useState([])
        const fetchExpenses = async () => {
            const list = await axios.get('http://127.0.0.1:8000/api/Expenses/List/')
            console.log(list.data)
            setExpenses(list.data)
        }
        useEffect(() => {
            fetchExpenses();
        }, [])
    

    // }
  const allExp = Expenses.map((Exp, index)=> {
    return(
        <div>
            <h1>Your Exp</h1>
            <h2>{Exp.PlaceName}</h2>
        </div>
    )
    
  })
}
export default ListExpenses;