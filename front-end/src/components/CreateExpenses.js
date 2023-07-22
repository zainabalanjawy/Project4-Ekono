import React, { useState,useEffect } from 'react';
import axios from 'axios';


function CreateExpenses() {

  const [PlaceName, setPlaceName] = useState('');
  const [Items, setItems] = useState('');  
  const [Catogries, setCatogries] = useState('');
  const [Amount, setAmount] = useState('');



  // const [newExpenses, setExpenses] = useState({
  //   PlaceName: '',
  //   Items: '',
  //   Catogries: '',
  //   Amount: ''
  // });

  // const handleChange =(event) =>{
  //   const Expenses = {...newExpenses}
  //   Expenses[event.target.name]= event.target.value
  //   console.log('data:  ', Expenses)
  //   setExpenses(Expenses)
  // }

  const formSubmit= async ()=>{
    
    const _formData = new FormData();
    _formData.append('PlaceName', PlaceName);
    _formData.append('Items', Items);
    _formData.append('Catogries', Catogries);
    _formData.append('Amount', Amount);

    await axios ({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/Expenses/Create/',
      data: _formData,

    }).then((response)=> {
      console.log(response.data)
      console.log("added successfully")
    },(error) => {
      console.log(error);
    }
    ); 
    console.log("sklflkfsn")
  }

  return (
    <div>
       <h2>CreateExpenses</h2>
        <form>
            <label for="PlaceName">Place Name</label>
            <input type='text' id='PlaceName' name='PlaceName'value ={PlaceName} onChange={(e) => setPlaceName(e.target.value)} required/><br></br>

            <label for="Items">Items</label>
            <input type='text' id='Items' name='Items' value={Items} onChange={(e) => setItems(e.target.value)} required/> <br></br>


            <label for="Catogries">Catogries</label>
            <input type='text' id='Catogries' name='Catogries' value={Catogries} onChange={(e) => setCatogries(e.target.value)}/><br></br>

            <label for="Amount">Amount</label>
            <input type='number' id='Amount' name='Amount' value={Amount} onChange={(e) => setAmount(e.target.value)} required/><br></br>

            <input value="Create Expenses" type="submit" onClick={formSubmit}/>


        </form>
        </div>
  )
}
export default CreateExpenses;