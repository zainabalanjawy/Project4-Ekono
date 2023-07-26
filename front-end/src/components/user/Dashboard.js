//link used for creating the dashboard: https://blog.logrocket.com/use-google-charts-react/
import { ClassNames } from '@emotion/react';
import React, { useState, useEffect } from 'react'
import '../../App.css'
import { Chart } from 'react-google-charts'
import axios from 'axios';
export default function Dashboard() {
  const [user, setUser] = useState([]);   //state that stores current user informtion
  const [data, setData] = useState([]);   //state that stores all user categories for the categories chart
  const [expenses, setExpenses] = useState([]); //state that stores all user categories for the expenditures per category chart
  const [receipt, setReceipt] = useState([]); //state that stores all user receipt and the amount sepnt on each
  const [total, setTotal] = useState(0) //state to keep track of user's total expenditures
  const [amount, setAmount] = useState([]); //state that stores all user categories for the expenditures per category chart
  const [message, setMessage] = useState(''); //state that stores a message based on the budget and expenditures

  useEffect(() => {
    handleUser()
    dataToDisplay()
    expensesToDisplay()
    receipstToDisplay()
    cat_amount()
    // amountToDisplay()
    userMessage()
  }, [total])
  function userMessage() {
    if (user.budget > total.toFixed(2)) {
      setMessage('You are all good, keep it up!')
    }
    else {
      setMessage('You exceeded the limit, Be careful!')
    }
  }
  async function handleUser() {
    const token = localStorage.getItem('token')
    console.log('handleUse token: ', token)
    const response = await axios.get(`http://127.0.0.1:8000/auth/profile/`, {
      headers:
      {
        'Authorization': `Token ${token}`
      }
    })
    // console.log("profile response.data: ", response.data[0])
    setUser(response.data[0])
    console.log('User Info:', user)
  }

  //displays uncategorized cateogries multiple times. it shouldn't.
  const dataToDisplay = () => {
    const arrayData = [["Category", "Occurence"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/category/list/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        response.data.forEach((value, index) => {
          arrayData.push([value.Category_name, 1])
        })
        // for (const obj in response.data){
        // }
        console.log("arrayData", arrayData);
        setData(arrayData)
      })
      .catch(error => { console.log(error) })
  }

  const expensesToDisplay = () => {
    const arrayData = [["Category", "Expending Amount"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/Expenses/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      let total = 0
      console.log('response coming from expenses list: ', response.data)
      response.data.forEach((value, index) => {
        arrayData.push([value.Items, value.Amount])
        total += value.Amount
      })
      console.log('array of data to be used in the chart:', arrayData);
      setExpenses(arrayData)
      setTotal(total)

    }).catch(error => { console.log(error) })
  }
  const receipstToDisplay = () => {
    const arrayData = [["Receipt", "Amount sepnt in BD"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/Recipet/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      console.log('response coming from RECEIPT list: ', response.data)
      response.data.forEach((value, index) => { arrayData.push([value.PlaceName, value.Amount]) })
      console.log('array of data to be used in the chart:', arrayData);
      setReceipt(arrayData)
    }).catch(error => { console.log(error) })
  }
  // const amountToDisplay = () => {
  //   const token = localStorage.getItem("token")
  //   const arrayData = [["Category", "How many times you spend on it"]]

  //   const response = axios.get(`http://127.0.0.1:8000/api/Expenses/List/`, {
  //     headers: {
  //       'Authorization': `Token ${token}`
  //     }
  //   }).then(response => {

  //     console.log('response coming from expenses list: ', response.data)
  //     let count = 0
  //     response.data.forEach((value, index) => { arrayData.push([value.Category.Category_name, value.Amount]) })
  //     let expObj = []
  //     for (let i = 0; i < arrayData.length; i++) {
  //       if (i = 0) expObj.push([arrayData[i][0], arrayData[i][1]])
  //       else {
  //         for (let x = 0; x < expObj.length; x++) {
  //           if (arrayData[i][0] = expObj[x][0])
  //             expObj[x][1] += arrayData[i][1]
  //           else {
  //             expObj.push([arrayData[i][0], arrayData[i][1]])
  //           }
  //         }
  //       }
  //     }
  //     console.log('expObj', expObj)

  //     setAmount(expObj)

  //   }).catch(error => { console.log(error) })
  // }
  async function cat_amount() {
    const arrayData = [["Category", "Occurence"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/Expenses/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      const exp={}
      response.data.forEach((value,index)=>{
          let key=value.Category.Category_name
          let price=value.Amount
          exp[key]=exp[key]?exp[key]+price :  exp[key]=price
      })
      for (const [key, value] of Object.entries(exp)) {
                arrayData.push([key,value])
      } 
      console.log(arrayData);
      setAmount(arrayData)

    }).catch(error => { console.log(error) })  }
  return (
    <>
      <h1>Dashboard</h1>
      <div className='chartsContainer'>
        <div style={{ width: '50vw' }}>
          <h3>Your Budget: {user.budget} </h3>
          <h3>Your Total Expenditures: {total.toFixed(2)}</h3>
          <p>{message}</p>
        </div>
        <Chart
          chartType="PieChart"
          data={data}
          options={{ title: "Categories" }}
          width={"50vw"}
          height={"400px"}
        />

        <Chart
          chartType="ColumnChart"
          data={expenses}
          options={{
            title: "Spendings per item", hAxis: {
              title: "Item",
              minValue: 0,
            },
            vAxis: {
              title: "Amount in BD",
            }
          }}
          width={"45vw"}
          height={"400px"}
        />

        <Chart
          chartType="ScatterChart"
          data={receipt}
          options={{
            title: "Spendings per receipt", hAxis: {
              title: "Place Name",
              minValue: 0,
            },
            vAxis: {
              title: "Amount in BD",
            }
          }}
          width={"45vw"}
          height={"400px"}
        />

        <Chart
          chartType="PieChart"
          data={amount}
          options={{ title: "Spendings per category" }}
          width={"50vw"}
          height={"400px"}
        />

      </div>
    </>
  )
}
