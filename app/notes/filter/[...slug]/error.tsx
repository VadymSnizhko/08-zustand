'use client'

interface ErrorPageProps{
    error:Error    
}

const ErrorMessage = ({error}:ErrorPageProps) => {
    return (
        <p style={{color:'red'}}>Could not fetch the list of notes. {error.message}</p>
    )
}

export default ErrorMessage