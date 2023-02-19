import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
//import { v1 as uuidv1} from 'uuid';
import axios from '../../../config/config'
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
  
  const addBook = (values)=>{
    
    axios.post('/addBook',values)
    .then(response =>{
      console.log(response.data)
      navigate ('/admin/books')
      })
    .catch(error =>{console.log(error.message)})
  }
  const handleFileUpload = async (e,setFieldValue)=>{
    const file = e.target.files[0];
    console.log(file)
    setFieldValue('image', file)
  }

  const initialValues ={
    title: '',
    author:'',
    category:'',
    description:'', 
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
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
          <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={addBook}>
                {formik => {
              return(
            <Form>
              {/* Product Name input type text*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="title" className="font-weight-bold">Title</label>
                <Link to="/admin/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of Books</Link>
                </div>
                <Field type="text" className="form-control" id="title" name='title' placeholder="Name"/>
                <ErrorMessage name='title' component={'div'} className="text-danger"/>
              </div>
              <div className="form-group my-3">
                <label htmlFor="author" className="font-weight-bold">Author</label>
                <Field as="textarea" className="form-control" id="Description" name='author'  rows="3"/>
                <ErrorMessage name='author' component={'div'} className="text-danger"/>
              </div>
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <Field as="textarea" className="form-control" id="Description" name='description'  rows="3"/>
                <ErrorMessage name='description' component={'div'} className="text-danger"/>
              </div>
              <div className='my-4'>
                <label htmlFor="category" className="font-weight-bold">Category</label>
                <Field as="select" name="category" id="category" >
                  {
                    loading ? 'loading' : data.map((item)=>
                    <option key={item.category} >{item.category}</option>
                    )
                  }
                  {error ? error : null}
                </Field>
              </div>
              <div className="form-group my-4">
                        <label htmlFor="file" className="font-weight-bold">File link</label>
                        <Field name="file" encType="multipart/form-data">
                        {({ form, field }) => {
                          const { setFieldValue } = form
                          return (
                            <input
                              type="file"
                              className='form-control-file'
                              onChange={(e) => handleFileUpload(e, setFieldValue)}
                            />
                          )
                        }}
                        </Field>
                    </div>
          
              <button  type="submit"  className="btn btn-dark   font-weight-bold" disabled={!formik.isValid || formik.isSubmitting}>Add product</button>
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