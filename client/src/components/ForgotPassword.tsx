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
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

 const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
        .trim()
        .min(2)
        .max(50, "Email must not exceed 50 characters!")
        .email("Invalid email")
        .required("Required"),
    })  
type ForgotPasswordFormData = Yup.InferType<typeof ForgotPasswordSchema>

const ForgotPassword = () => {
    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ForgotPasswordSchema)
    })  
    const history = useHistory()


  /*   const config = {
        header: {
            "Content-Type": "application/json"
        }
    } */
const handleForgotPassword = async(userData: ForgotPasswordFormData): Promise<void> => {
    try {
       const response =  await axios.post("http://localhost:5000/api/auth/forgotPassword", {...userData})
       const {message} = response.data
       toast.success(/* "Reset Password request sent successfully" */ message)
       history.push("/reset-password")

    } catch (error) {
     toast.error(error.response.data.message)   
     console.log(error.response)
    }

}
    const onSubmit = (data: ForgotPasswordFormData) => {
        handleForgotPassword(data)
        console.log(data)
    }

    return (
        <Container> 
            <Row className="justify-content-center align-items-center mt-5 h-100"> 
                 <Col xs={4} className="border mt-5"> 
                    <Form noValidate  onSubmit={handleSubmit(onSubmit)} className="my-3 mx-2">
                        <p className="small text-muted pt-3">Please enter the email associated with this account.</p>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email"   placeholder="Enter email" {...register("email")}  isInvalid={!!errors.email} />
                             <Form.Control.Feedback type="invalid">
                                {errors.email ? errors.email.message: null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                </Form>
            </Col>
            </Row>
           
        </Container>
    )
}

export default ForgotPassword
