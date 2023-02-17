import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'


function Register() {


    const navigate = useNavigate();
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const handleFileUpload = async (e,setFieldValue)=>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFieldValue('userPhoto', base64)
        
      }

    const handleUser =  (values)=>{
        console.log(values.userPhoto)
        axios.post('http://localhost:3000/users',values)
        .then(response =>{
                            console.log(response.data)
                            navigate ('/login')
                        })
        .catch(error =>{console.log(error.message)})
    };

   const initialValues ={
    firstName: '',
    lastName:'',
    inputEmail:'',
    inputPassword:'',
    confPassword:''
   };

   const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    inputEmail: Yup.string()
      .email('Invalid email format')
      .required('Required'),  
    inputPassword: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confPassword: Yup.string()
     .oneOf([Yup.ref('inputPassword'), null], 'Passwords must match')
  });
         
  return (
   
    <div class="row d-flex justify-content-center align-items-center h-50">
    <div class="col-12 col-md-8 my-3">
      <div  className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
        <div class="card-body p-5">
          <div className='mb-md-5 mt-md-4 pb-3'>
            <h2 className='text-center text-uppercase mb-5'>Create an account</h2>
            <Formik
                initialValues={initialValues}
                validationSchema ={validationSchema}
                onSubmit = {handleUser}>

                {formik => {
                return(
                <Form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <Field type="text" className="form-control rounded-pill bg-dark text-white" id="firstName" name="firstName"/>
                        <ErrorMessage name='firstName' component={'div'} className="text-danger"/>
                    </div>
                    <div className="col-md-6 ">
                        <label htmlFor="validationServer02" className="form-label">Last Name</label>
                        <Field type="text" className="form-control rounded-pill bg-dark text-white" id="lastName" name="lastName"/>
                        <ErrorMessage name='lastName' component={'div'} className="text-danger"/>
                    </div>
                    <div className=" my-2 ">
                        <label htmlFor="inputEmail" className="">Email</label>
                        <Field type="text"  className="form-control rounded-pill bg-dark text-white" id="inputEmail" name="inputEmail" placeholder='example@mail'/>
                        <ErrorMessage name='inputEmail' component={'div'} className="text-danger" />
                    </div>
                    <div className=" my-2">
                        <label htmlFor="inputPassword" className="">Password</label>
                        <Field type="password" className="form-control rounded-pill bg-dark text-white" id="inputPassword" name="inputPassword" placeholder="Password"/>
                        <ErrorMessage name='inputPassword' component={'div'} className="text-danger" />
                    </div>
                    <div className=" my-2">
                        <label htmlFor="confPassword" className="">Confirm Password</label>
                        <Field type="password" className="form-control rounded-pill bg-dark text-white" id="confPassword" name="confPassword"/>
                        <ErrorMessage name='confPassword' component={'div'} className="text-danger" />
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="userPhoto" className="font-weight-bold">Add Photo</label>
                        <Field name="userPhoto">
                        {({ form, field }) => {
                          
                     const { setFieldValue } = form
                        return (
                          <input
                            type="file"
                             className='form-control-file'
                              required
                          onChange={(e) => handleFileUpload(e, setFieldValue)}
                             />
                            )
                          }}
                        </Field>
                    </div>
                    <div className="text-center d-grid gap-2">
                        <button type="submit" className="btn btn-outline-light btn-lg px-5 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>Sign Up</button>
                    </div>
                    <p className="text-center mt-5 mb-0">Have already an account? <Link to="/login"
                            className="text-white-50 fw-bold"><u>Login here</u></Link></p>
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

export default Register