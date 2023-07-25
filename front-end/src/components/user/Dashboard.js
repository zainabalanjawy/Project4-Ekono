//link used for creating the dashboard: https://blog.logrocket.com/use-google-charts-react/
import { ClassNames } from '@emotion/react';
import React, { useState, useEffect } from 'react'
import '../../App.css'
import { Chart } from 'react-google-charts'
import axios from 'axios';
export default function Dashboard() {
  const [data, setData] = useState([]);   //state that stores all user categories for the categories chart
  const [expenses, setExpenses] = useState([]); //state that stores all user categories for the expenditures per category chart

  useEffect(() => {
    dataToDisplay()
    expensesToDisplay()
  }, [])

  const dataToDisplay = () => {
    const arrayData = [["Category", "Occurence"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/category/view/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => {
        // console.log(response.data)
        response.data.forEach((value, index) => {
          arrayData.push([value.Category_name, 1])

        })
        // for (const obj in response.data){
        // }
        console.log(arrayData);
        setData(arrayData)
      })
      .catch(error => { console.log(error) })
  }
  const expensesToDisplay = () => {
    const arrayData = [["Category", "How many times you spend on it"]]
    const token = localStorage.getItem("token")
    let arr = [] //an empty array to hold the data we want from the response
    const response = axios.get(`http://127.0.0.1:8000/api/Expenses/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      console.log('response coming from expenses list: ', response.data)
      let count = 0
      response.data.forEach((value, index) => { arrayData.push([value.Category, 1]) })
      for (let i = 0; i< arrayData.length; i++){

      }
      console.log('array of data to be used in the chart:',arrayData);
      setExpenses(arrayData)
    }).catch(error => { console.log(error) })
  }
  return (
    <>
      <h1>Dashboard</h1>
      <div className='chartsContainer'>
        <Chart
          chartType="PieChart"
          data={data}
          options={{ title: "Categories" }}
          width={"100%"}
          height={"400px"}
        />

        <Chart
          chartType="PieChart"
          data={expenses}
          options={{ title: "Spendings per category" }}
          width={"100%"}
          height={"400px"}
        />

      </div>
    </>
  )
}
