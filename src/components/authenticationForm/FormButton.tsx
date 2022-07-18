import React from 'react'

function FormButton({...props}) {
    const {label, ...properties} = props

    return (
        <button {...properties}>{label}</button>
    )
}

export default FormButton