import axios from 'axios';
import React, {useState, useEffect,} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom'
import ListEdit from './ListEdit';
export default function ListCateogry(props) {

    // const list category = () => {
        const [category, setCatogery] = useState([])
        const navigate = useNavigate();
        const [showEdit,setShowEdit]=useState(false)
        
        const deleteHandler = async (id) => {
            try {
              const response = await axios.delete(
                `http://127.0.0.1:8000/api/category/${id}/delete/`
              )
              console.log("deleted successfully!")
              navigate('/Delete/ViewAll')
            } catch (error) {
              console.log("Something went wrong", error)
            }
          }
      
        const fetchCategory = async () => {
            const token = localStorage.getItem("token")
            console.log('tokkkken',token);
            const response = await axios.get('http://127.0.0.1:8000/api/category/list/',{
                headers: {
                  'Authorization': `Token ${token}`
                } 
              })
            console.log(response.data)
            setCatogery(response.data)
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
              {/* <button type="button" class="btn bg-gradient-primary btn-lg">Details
              </button> */}
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(cat.id)}>Delete</button>
              {/* <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => navigate('/', {state: {cat}})}>Edit</button> */}
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={()=>{setShowEdit(true)}}>Edit</button>
              {showEdit?
              <ListEdit/>
              :''
            }
              
              
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
