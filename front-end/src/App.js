import './App.css';
// import CreateExpense from '../components/CreateExpense';
import {BrowserRouter as Router,Navigate, Route , Routes, Link, useNavigate} from 'react-router-dom'
import CreateExpense from './components/CreateExpenses'
import ListExpenses from './components/ListExpenses';
import axios from 'axios';


function App() {

  return (
    
    <div className="App">
      <div class="topnav">
           <li>
              <Link to="/Expenses/Create">
                Create Expense
              </Link>

              <Link to="/Expenses/List">
                List Expense
              </Link>
            </li>
    </div>
    <Routes>
       <Route path='/Expenses/Create'element={<CreateExpense />}  />
       <Route path='/Expenses/List'element={<ListExpenses />}  />
       </Routes>

    </div>
  );
}

export default App;
