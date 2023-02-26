import React, { useReducer, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import axios from '../config/config'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

const initialState ={
  loading : true,
  books : {},
  error : ''
}
const reducer = (state, action)=>{
  switch (action.type) {
    case 'FETCH_SUCESS':
      return{...state,
        loading : false,
        books : action.payload,
        error:''
      }
    
    case 'FETCH_ERROR':
      return{
        loading: false,
        books:{},
        error: 'error.message'
      }
  
    default:
      return state   
  }
}

function Books() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('/books')
    .then(res=>
              dispatch({type:'FETCH_SUCESS', payload: res.data})
              
      )
    .catch(error =>
                  dispatch({type:'FETCH_ERROR', error : error.message})
                 
      )
  }, [])
  
  const downloadBook = async (id)=> {
       await axios.get('/download/'+id)  
      .then((response) => {
        //response contains PDF file
        console.log(response.data.data.title)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        // Download pdf
        let alink = document.createElement('a');
        alink.href = url;
        alink.download = `${response.data.data.title}.pdf`;
        alink.click();
        toast.success(response.data.message)
        }).catch((error) => {
          toast.error(error.response.data.message)
        })
    
}

  return (
    
    <section>
    <ToastContainer />
     <div className="container-md py-5">
       <div className="row d-flex justify-content-center align-items-center  mt-5">
         <div className="col-md-12 col-xl-10">
           <div className="card">
             <div className="card-header p-3 bg-secondary d-flex justify-content-between stiky-top">
               <h5 className="mb-0 mt-2 text-white"><i className="fa-solid fa-list-check me-2"></i>List of Books</h5>
             </div>
             <div className="card-body" data-mdb-perfect-scrollbar="true" style={{position: "relative"}}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">Category</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {  
                        state.loading ? 'loading' :   state.books.map((item)=>
                            <tr key={item._id}> 
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td className="align-middle">
                                             
                                  <a title="Download" className='btn btn-outline-success text-dark ' onClick={()=> downloadBook(item._id)}>
                                        <p>Download</p>
                                  </a>
                                </td>
                            </tr>
                            ) 
                    }
                    {state.error ? state.error : null}    
                  </tbody>
                </table>
             </div>
           </div>
         </div>
       </div>
     </div>
       
   </section>
  )
}
export default Books
