import { Form, Formik } from 'formik'
import { loginSchema } from '../schemas/schema';
import FormInput from './FormInput';

const onSubmit = () =>{ 
    console.log("submitted")
 }


export default function Login() {
   
        
  return (
    <>     
        <div className='form_title'>
            <h1 className='form_title'>Login</h1>
            <p>Welcome back! Please enter your details.</p>
        </div>
        

        <Formik 
            initialValues={{firstName:"", lastName:"", email:"", password:"", confirmPassword:""}}
            validationSchema={loginSchema}
            onSubmit={onSubmit}   
        >
            {({isSubmitting})=> (
                <Form className='form'>
                    <FormInput 
                        label="Email"
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
                    <button disabled={isSubmitting} type="submit" className='btn_submit txt--uppercase'>
                        login
                    </button>                   
                </Form>
            )}           
        </Formik>   
    </>
       
);

}
