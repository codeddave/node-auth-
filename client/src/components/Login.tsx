import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import InputGroup from 'react-bootstrap/InputGroup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import * as Yup from "yup" 
import axios from "axios"  
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

 const LoginSchema = Yup.object().shape({
        email: Yup.string()
        .trim()
        .min(2)
        .max(50, "Email must not exceed 50 characters!")
        .email("Invalid email")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .max(50, "Password must not exceed 50 characters!")
        .required("Required"),
    })  
type LoginFormData = Yup.InferType<typeof LoginSchema>

const Login = () => {
    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    })  
    const history = useHistory()


  /*   const config = {
        header: {
            "Content-Type": "application/json"
        }
    } */
const handleLogin = async(userData: LoginFormData): Promise<void> => {
    try {
       const response =  await axios.post("http://localhost:5000/api/auth/login", {...userData})
       const {token} = response.data
       localStorage.setItem("user", token )
       toast.success("you're logged in")
       history.push("/app")

    } catch (error) {
     //toast.error("Some")   
     toast.error(error.response.data.message)   

     console.log(error.message)
    }

}
    const onSubmit = (data: LoginFormData) => {
        handleLogin(data)

    }

    return (
        <Container> 
            <Row className="justify-content-center align-items-center mt-5 h-100"> 
                 <Col xs={4} className="border mt-5"> 
                    <Form noValidate  onSubmit={handleSubmit(onSubmit)} className="my-3 mx-2">
                   
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email"   placeholder="Enter email" {...register("email")}  isInvalid={!!errors.email} />
                             <Form.Control.Feedback type="invalid">
                                {errors.email ? errors.email.message: null}
                            </Form.Control.Feedback>
                           
                            {/*    <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  {...register("password")}  isInvalid={!!errors.password} />

                            <Form.Control.Feedback type="invalid">
                                {errors.password ? errors.password.message: null}
                            </Form.Control.Feedback>
                        </Form.Group>
              {/*           <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit" className="mt-3">
                            Log In 
                        </Button>

                        <p className="mt-2 text-muted small text-center">Don't have an account? <Link to="/register">Register</Link></p>
                </Form>
            </Col>
            </Row>
           
        </Container>
    )
}

export default Login
