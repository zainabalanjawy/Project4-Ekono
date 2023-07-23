import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ListCateogry = () => {
    // const listExpenses = () => {
        const [category, setCatogery] = useState([])
        const fetchCategory = async () => {
            const token = localStorage.getItem("token")
            console.log('tokkkken',token);
            const list = await axios.get('http://127.0.0.1:8000/api/category/list/',{
                headers: {
                  'Authorization': `Token ${token}`
                } 
              })
            console.log(list.data)
            setCatogery(list.data)
        }
        useEffect(() => {
            fetchCategory();
        }, [])
    // }
    const allCategory = category.map((cat, index) => {
        return (
          <div class="col-lg-4 col-md-8">
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
              <p class="mt-4">Emojes: { cat.Emojis }</p>
              <p class="mt-4">Owner: { cat.owner }</p>
              <button type="button" class="btn bg-gradient-primary btn-lg">Details
              </button>
            </div>
          </div>
          <br></br>
        </div>
      )
      })
    return (
    <container>
        <h1>All Cateogries</h1>
        {allCategory}
    </container>
    )
}
export default ListCateogry  ;