// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate, useLocation } from 'react-router-dom';

// export default function EditCategory(props) {
//   // state to save user information
//   const { state } = useLocation();
//   const { cat } = state;
//   // console.log('ddddxxdddddddddddddddddddddddddddd',cat);
//   const [newCatogery, setCatogery] = useState({});

//   // useEffect(() => {
//   //   setCatogery(cat); // Set the initial category when the component mounts
//   // }, []); // Add the "cat" dependency here

//   const changeHandler = (e) => {
//     // // Set copy of newuser into user every time
//     // const catogery = { ...newCatogery };
//     // // Set key with value for fields sent in the form
//     // catogery[e.target.name] = e.target.value;
//     // console.log(e.target.name + "-------" + e.target.value)
//     // Set user to new user
//     const {name,value} = e.target
//     setCatogery(pre =>{return {...pre,[name]:value}});
//     console.log('catogery', newCatogery);
//   };

//   async function UpdateHandler() {
//     const token = localStorage.getItem('token');
//     console.log('handleUse token: ', token);
//     try {
//       const response = await axios.put(
//         'http://127.0.0.1:8000/Category/Edit/',
//         {
//           // Assuming the newCatogery state contains the updated category data
//           ...newCatogery
//         },
//         {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         }
//       );
//       console.log('list response.data: ', response.data[0]);
//     } catch (error) {
//       // Handle any potential errors here
//       console.error('Error updating category:', error);
//     }
//   }

// //   return (
// //     <>
// //       <h1> Edit Category</h1>
// //       <form>
// //         {/* Rest of your form elements */}
        
//                 // <div>
//                 //     <label>  Category name </label>
//                 //     <input type='text'name="Category_name" placeholder=" Category_name" onChange={changeHandler} value={newCatogery.Category_name||cat.Category_name}></input>
//                 //     <input class="form-control"type="hidden" name="id" value={cat.id} onChange={changeHandler} />
//                 // </div>
//                 // <div>
//                 //     <label> Description </label>
//                 //     <input type='text' name="Description" placeholder="Description " onChange={changeHandler} value={newCatogery.Description||cat.Description}></input>
//                 // </div>
//                 // <div>
//                 //     <label> owner: </label>
//                 //     <input type='text' name="owner" placeholder="owner" onChange={changeHandler} value={newCatogery.owner||cat.owner}></input>
//                 // </div>
//                 // <div>
//                 //     <label> Emojis </label>
//                 //     <input type="Emojis" name="Emojis" placeholder="Emojis" onChange={changeHandler}value={newCatogery.Emojis||cat.Emojis}></input>
//                 // </div>
              
// //                 <button onClick={UpdateHandler}> Edite</button>
                
// //       </form>
// //     </>
// //   );
// // }





