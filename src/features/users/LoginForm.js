import { Form, FormGroup, Label, Input, Button, Card } from "reactstrap"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react"

import { useLoginUserMutation } from "./authApi";

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChanged = e => setEmail(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    const [loginUser] = useLoginUserMutation();

    const { token, isLoading, isSuccess, isError, errorMessage } = useSelector(state => state.user);

    useEffect(() => {
        console.log(':::token:::', token)
        console.log('::localStorage::', localStorage.getItem('token'))

    }, [token])

    useEffect(() => {
        if(isSuccess) {
            localStorage.setItem('token', token)
            navigate('/')
        }
        if(isError) {
            navigate('/login')
            toast.error('Login failed')
        }
    }, [isSuccess, isError, errorMessage, token])
    
    const onFormSubmitted = e => {
        e.preventDefault();
        loginUser({ email, password });
        setEmail('');
        setPassword('')
    }

    return (
        <Card style={{ padding: 20, }}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Form className="col-6" onSubmit={onFormSubmitted}>
                <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={onEmailChanged}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        name="text"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />
                </FormGroup>
                <Button color="primary">Login</Button>
            </Form>
        </Card>
    )
}

export default LoginForm;