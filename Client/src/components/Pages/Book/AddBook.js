import React, {useState,useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../../config/config'
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({});

 
 useEffect(() => {
    axios.get('/categories')
    .then(res=>{
              setLoading(false)
              setData(res.data)
              setError('')
            }      
    )
    .catch(error =>{
      setLoading(false)
      setData({})
      setError({error: error.message})
    })
  }, [])
 
  const onSubmit = async (values, { setSubmitting }) => {
    let formData = new FormData();
    
      Object.keys(values).forEach(fieldName => {
        formData.append(fieldName, values[fieldName]);
      });
      console.log(formData)
      await  axios.post('/addBook',formData)
      .then((response)=>{
        navigate('/admin/books')
        toast.success(response.data.message)
      })
      .catch((error)=>{
        toast.error(error.response.data.message)
      })
  }
  const initialValues ={
    title: '',
    author:'',
    category:'',
    description:'',
    content:''
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Required!'),
    description: Yup.string()
    .required('required!'),
    author: Yup.string()
    .required('required!'),
    category: Yup.string()
  })

  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
      <ToastContainer />
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
          <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
          >
                {formik => { console.log(formik)
              return(
            <Form encType="multipart/form-data">
              {/* Product Name input type text*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="title" className="font-weight-bold">Title</label>
                <Link to="/admin/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of Books</Link>
                </div>
                <input type="text" className="form-control" id="title" name='title' placeholder="Name"  onChange={formik.handleChange}/>
                <ErrorMessage name='title' component={'div'} className="text-danger"/>
              </div>
              <div className="form-group my-3">
                <label htmlFor="author" className="font-weight-bold">Author</label>
                <input type="text" className="form-control" id="Description" name='author'  rows="3"  onChange={formik.handleChange}/>
                <ErrorMessage name='author' component={'div'} className="text-danger"/>
              </div>
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="Description" name='description'  rows="3"  onChange={formik.handleChange}/>
                <ErrorMessage name='description' component={'div'} className="text-danger"/>
              </div>
              <div className='my-4'>
                <label htmlFor="category" className="font-weight-bold">Category</label>
                <select name="category" id="category" onChange={formik.handleChange} >
                  {
                    loading ? 'loading' : data.map((item)=>
                   
                    <option key={item._id}  onChange={formik.handleChange}>{item.name}</option>
                    )
                  }
                  {error ? error : null}
                </select>
              </div>
              <div className="form-group my-4">
                        <label htmlFor="content" className="font-weight-bold">File</label>
                        <input
                          type="file"
                          name="content"
                          className='form-control-file'
                          onChange={(e) =>
                            formik.setFieldValue('content', e.currentTarget.files[0])
                          }
                        />    
              </div>
              <button  type="submit"  className="btn btn-dark   font-weight-bold" disabled={!formik.isValid || formik.isSubmitting}>Add Book</button>
            </Form>
            )}}
          </Formik>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default AddBook