import axios from 'axios';
import { Form, Formik } from 'formik'
import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { loginSchema } from '../schemas/schema';
import FormCheckbox from './FormCheckbox';
import FormInput from './FormInput';



export default function Login() {
    const [navigate, setNavigate] = useState(false)
    const formRef:any  = useRef()

    const onSubmit = async () => { 
        console.log(formRef.current.values)
        
        const data = formRef.current.values
        /*
        const response = await fetch("https://movies.codeart.mk/api/auth/login",{   //da go zemime access tokenot
            mode: 'no-cors',
            credentials: "include", //za refresh tokenot v cookie
            method: "POST",
            body: JSON.stringify(data)

        })*/

        const response = await axios.post("https://movies.codeart.mk/api/auth/login", data, {withCredentials:true})

        setNavigate(true)
        console.log(response)
    }

    if(navigate) {
        return <Navigate to="/"/>
    }
    
    return (
        <>     
            <div className='form_title'>
                <h1 className=''>Login</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>
            

            <Formik 
                innerRef={formRef}
                initialValues={{email:"", password:"", rememberMe: false}}
                validationSchema={loginSchema}
                onSubmit={onSubmit}   
            >
                {({isSubmitting})=> (
                    <Form className='form'>
                        <FormInput 
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Enter your email" 
                        />
                        <FormInput 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password" 
                        />
                        <FormCheckbox
                            label="Remember me"
                            name="rememberMe"
                            type="checkbox"
                        />

                        <button disabled={isSubmitting} type="submit" className='btn_submit txt--uppercase'>
                            login
                        </button>   

                        <p className='txt--center '>Don't have an account? <Link to={"/register"} className="txt--underline">Register</Link></p>                              
                    </Form>
                )}           
            </Formik>   
        </>  
    );
}
