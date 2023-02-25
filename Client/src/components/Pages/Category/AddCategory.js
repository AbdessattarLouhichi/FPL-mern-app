import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { v1 as uuidv1} from 'uuid';
import axios from '../../../config/config'

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([{
                                          name: '' 
                                 }]);
  

  const handleChange =(e )=>{
    
    setCategory({...category,
      id: uuidv1,
      [e.target.id] : e.target.value,
    }) 
  }


  const addCategory = (e)=>{
    e.preventDefault();
    axios.post('/createCategory',{
                                
                                name: category.name
    })
    .then(response =>{
      console.log(response.data)
      navigate ('/admin/books')
      })
    .catch(error =>{console.log(error.message)})
  }
  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
         
            <form onSubmit={addCategory}>
              
              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold">Category</label>
                <input type="text" className="form-control" id="name" onChange={handleChange} placeholder="Category Name"/>
              </div>
              {/*Click button  to add category*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold mt-3">Add Category</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default AddCategory