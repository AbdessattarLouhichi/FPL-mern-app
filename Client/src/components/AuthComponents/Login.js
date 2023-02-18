import React,{useState}  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../config/config'
import { Formik, Form, ErrorMessage,Field } from 'formik';
import * as Yup from 'yup';

function Login() {

  const initialValues = {
    Email: '',
    Password: ''
  }

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    Password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })
  const navigate = useNavigate();

  const [warning, setWarning] = useState(false);
  const [user, setUser] = useState([{
    id:'',
    Name:'',
    lastName: '',
    Email:'',
    userPhoto :''
}]);



const saveUser = (user) => {
  console.log(user)
let[ {id, firstName, lastName,inputEmail,userPhoto }] = user;
      localStorage.setItem('ID', id);
      localStorage.setItem('Name', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('Email', inputEmail);
      localStorage.setItem('userPhoto', userPhoto);
}

  const onSubmit =  async (values)=>{
    await  axios.get('/login')
        .then(response =>{ setUser(response.data);
          saveUser(response.data)
              const Found = response.data.find(user => user.inputEmail === values.Email && user.inputPassword === values.Password)
              if (Found) {
                warning && setWarning(false)
                //SUCCESS LOGIN MESSAGE!  You are successfully logged in
                navigate('/home')

            } else {
                setWarning(true)
            }
        })
        .catch(err=>{console.log(err.message)})   
  }

  const warningMsg = warning && <div className='alert alert-danger mt-5'>Please check your email and password and try again !</div>


  return (
    <div className="row d-flex justify-content-center align-items-center h-50">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-3">
        <div  className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5">
            <div className='mb-md-5 mt-md-4 pb-3'>
              <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
              <p className="text-white-50 mb-5 text-center">Please enter your login and password!</p>
                  {warningMsg}
              <Formik 
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}>
                  {formik => {
                    return(
                    <Form className="row g-3">
                        <div className="form-outline form-white my-2">
                            <label htmlFor="Email" className="">Email</label>
                            <Field type="text"  className="form-control rounded-pill bg-dark text-white" id="Email" name='Email'  placeholder='example@mail'/>
                            <ErrorMessage name='Email' component={'div'} className="text-danger"/>
                        </div>
                        
                        <div className="form-outline form-white my-2">
                            <label htmlFor="Password" className="">Password</label>
                            <Field type="password" className="form-control rounded-pill bg-dark text-white" id="Password" name='Password'   placeholder="Password"/>
                            <ErrorMessage name='Password' component={'div'} className="text-danger"/>
                        </div>
                        <div className="text-center d-grid gap-2">
                            <button type="submit" onClick={()=> saveUser(user)} className="btn btn-outline-light btn-lg px-5 rounded-pill" disabled={!formik.isValid}>Sign In</button>
                        </div>
                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                          <Link to="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></Link>
                          <Link to="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></Link>
                          <Link to="#!" className="text-white"><i className="fab fa-google fa-lg"></i></Link>
                        </div>
                        <div className="text-center">
                          <p className="text-center mt-5 mb-0">Not a member? <Link className='text-white-50 fw-bold' to="/register">Sign Up</Link></p>
                        </div>
                    </Form>
                    )}}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login