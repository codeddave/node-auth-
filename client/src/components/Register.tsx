import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import InputGroup from 'react-bootstrap/InputGroup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import * as Yup from "yup" 
/* import axios from "axios"  
import { RegisterFormData } from './Yup/RegisterSchema' */


 const RegisterSchema = Yup.object().shape({
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
const Register = () => {
    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema)
    })
/* const handleRegister = async(userData: RegisterFormData) => {
    try {
       const response =  await axios.post("/api/auth", {userData})
       const token = response.data
       
    } catch (error) {
        
    }

} */
    const onSubmit = (data: any) => console.log(data);

    return (
        <Container> 
            <Row className="border justify-content-center align-items-center mt-5 h-100"> 
                 <Col xs={4} className="border"> 
                    <Form noValidate  onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                </Form>
            </Col>
            </Row>
           
        </Container>
    )
}

export default Register
