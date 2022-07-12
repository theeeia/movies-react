import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom';
import { loginSchema } from '../schemas/schema';
import FormCheckbox from './FormCheckbox';
import FormInput from './FormInput';

const onSubmit = () =>{ 
    console.log("submitted")
 }


export default function Login() {
    return (
        <>     
            <div className='form_title'>
                <h1 className=''>Login</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>
            

            <Formik 
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
