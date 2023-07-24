//link used for creating the dashboard: https://blog.logrocket.com/use-google-charts-react/
import { ClassNames } from '@emotion/react';
import React, { useState, useEffect } from 'react'
import '../../App.css'
import { Chart } from 'react-google-charts'
import response from './data.json'
export default function Dashboard(prop) {
  return (
    <>

      <h1 style={{'text-align': 'center'}}>Dashboard</h1>
      <div className='chartsContainer'>

      <Chart
      chartType={prop.chart.chartType}
      data={prop.chart.data}
      options={prop.chart.options}
      width={prop.chart.width}
      height={prop.chart.height}
    />

      </div>
    </>
  )
}
