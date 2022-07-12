import { useField } from 'formik'
import React from 'react'

export default function FormInput(props: any) {
    const {label, ...properties} = props
    
    const [field, meta] = useField(properties)
    return (
        <> 
            <label htmlFor={label} className="form_label">{label}*</label> 

            <input
                {...field}
                {...properties}
                className={`form_input  ${ meta.touched && meta.error ? "form_input--error" : ""}`}
            />

            {(meta.touched && meta.error) ? <p className="form_error">{meta.error}</p> : <p className="form_error form_error--hidden">Error</p> }
           
        </>
    )
}
