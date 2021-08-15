//import React from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

const Home = () => {
   const history =  useHistory()

    const handleLogout = ()=> {
        localStorage.removeItem("user")
        toast.success("Come back soon!")
        history.push("/login")
    }
    return (
        <div>
            <h1 className="text-center mt-5">You're home now</h1>
            <div className="d-flex justify-content-center">
                <Button variant="primary" onClick ={handleLogout} className="mt-3 ">
                    Log Out
                </Button>

            </div>
            
        </div>
    )
}

export default Home
