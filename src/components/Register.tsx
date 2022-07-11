import { Form, Formik} from 'formik';
import { registerSchema } from '../schemas/schema';
import FormInput from './FormInput';

const onSubmit = () => { 
    /*
    const data = { username: 'example' };

    fetch("",{
        method: "POST",
        body: JSON.stringify(data)

    })*/
    console.log("submit")
 }

export default function Register() {
    return (
        <>     
            <div className='form_title'>
                <h1 className='form_title'>Register</h1>
                <p>Create account to start using <b>Miru.</b></p>
            </div>
            

            <Formik 
                initialValues={{firstName:"", lastName:"", email:"", password:"", confirmPassword:""}}
                validationSchema={registerSchema}
                onSubmit={onSubmit}   
            >
                {({isSubmitting})=> (
                    <Form className='form'>
                        <FormInput 
                            label="First Name"
                            name="firstName"
                            type="text"
                            placeholder="Enter your first name" 
                        />
                        <FormInput 
                            label="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Enter your last name" 
                        />
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
                        <FormInput 
                            label="Confirm Password"
                            name="confirmPassword"
                            type="Password"
                            placeholder="Confirm your password" 
                        />
                        <button disabled={isSubmitting} type="submit" className='btn_submit'>
                            Register
                        </button>                   
                    </Form>
                )}           
            </Formik>   
        </>
           
    );
}
