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
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

 const ResetPasswordSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .max(50, "Password must not exceed 50 characters!")
        .required("Required"),
        confirmPassword: Yup.string()
        .required('Required!')
        .test(
          'passwords-match',
          'Passwords must match',
          function validatePassword(value) {
            return this.parent.password === value
          },
        ),
    })  
type ResetPasswordFormData = Yup.InferType<typeof ResetPasswordSchema>

const ResetPassword = () => {
    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ResetPasswordSchema)
    })  
    const history = useHistory()
    const {token} = useParams<{token: string}>()


  /*   const config = {
        header: {
            "Content-Type": "application/json"
        }
    } */
const handleRegister = async(userData: ResetPasswordFormData): Promise<void> => {
    const {password} = userData
    try {
       const response =  await axios.put(`http://localhost:5000/api/auth/resetPassword/${token}`, {password})
       toast.success(response.data.message)
       history.push("/login")

    } catch (error) {
     toast.error(error.response.data.message)   
     console.log(error.message)
    }
}
    const onSubmit = (data: ResetPasswordFormData) => {
        handleRegister(data)
        console.log(data)
    }

    return (
        <Container> 
            <Row className="justify-content-center align-items-center mt-5 h-100"> 
                 <Col xs={4} className="border mt-5"> 
                    <Form noValidate  onSubmit={handleSubmit(onSubmit)} className="my-3 mx-2">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  {...register("password")}  isInvalid={!!errors.password} />

                            <Form.Control.Feedback type="invalid">
                                {errors.password ? errors.password.message: null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label> Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password"  {...register("confirmPassword")}  isInvalid={!!errors.confirmPassword} />

                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword ? errors.confirmPassword.message: null}
                            </Form.Control.Feedback>
                        </Form.Group>
              {/*           <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit" className="mt-3">
                            Reset Password
                        </Button>
                </Form>
            </Col>
            </Row>
           
        </Container>
    )
}

export default ResetPassword
