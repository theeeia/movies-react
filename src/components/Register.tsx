import axios from 'axios';
import { Form, Formik} from 'formik';
import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { registerSchema } from '../schemas/schema';
import FormCheckbox from './FormCheckbox';
import FormInput from './FormInput';



export default function Register() {
    const [navigate, setNavigate] = useState(false)
    const formRef:any  = useRef()


    const onSubmit = async () => { 
       
        const {confirmPassword, ...data} = formRef.current.values
        console.log(data)
        /*
        const response = await fetch("https://movies.codeart.mk/api/auth/register",{   //da go zemime access tokenot
        mode: 'no-cors',
            credentials: "include", //za refresh tokenot v cookie
            method: "POST",
            body: JSON.stringify(data)

        })  */ 
        const response = await axios.post("https://movies.codeart.mk/api/auth/register", data)
        setNavigate(true)
        console.log(response)
    }

    if(navigate) {
        return <Navigate to="/login"/>
    }


    return (
        <>     
            <div className='form_title'>
                <h1 className=''>Register</h1>
                <p>Create account to start using <b>Miru.</b></p>
            </div>
            

            <Formik 
                innerRef={formRef}
                initialValues={{first_name:"", last_name:"", email:"", password:"", confirmPassword:""}}
                validationSchema={registerSchema}
                onSubmit={onSubmit}   
            >
                {({isSubmitting})=> (
                    <Form className='form'>
                        <FormInput 
                            label="First Name"
                            name="first_name"
                            type="text"
                            placeholder="Enter your first name" 
                        />
                        <FormInput 
                            label="Last Name"
                            name="last_name"
                            type="text"
                            placeholder="Enter your last name" 
                        />
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
                        <FormInput 
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password" 
                        />
                        <FormCheckbox
                            label="Remember me"
                            name="rememberMe"
                            type="checkbox"
                         />

                        <button disabled={isSubmitting} type="submit" className='btn_submit'>
                            Register
                        </button>   

                        <p className='txt--center '>You already have an account? <Link to={"/login"} className="txt--underline">Login</Link></p>              
                    </Form>
                )}           
            </Formik>   
        </>
           
    );
}
