import { Form, FormGroup, Label, Input, Button, Row } from "reactstrap"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "./authApi";
import { errorToTxt } from "../../utils/errorTotxtHelper";
import '../../assets/css/Login.css';

const EMAIL_REGX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({ emailState: '', passwordState: '' });

    const onEmailChanged = e => {
        EMAIL_REGX.test(e.target.value)
            ? setValidate({ emailState: 'has-success' })
            : setValidate({ emailState: 'has-danger' })
        setEmail(e.target.value)
    };

    const onPasswordChanged = e => {
        e.target.value.length < 8 || e.target.value.length > 32
            ? setValidate({ passwordState: 'has-danger' })
            : setValidate({ passwordState: 'has-success' })
        setPassword(e.target.value)
    };

    const [loginUser, { isLoading, isSuccess, isError, data }] = useLoginUserMutation();

    useEffect(() => {
        clearState();
        const emailError = data?.errors?.email?.msg;
        const passwordError = data?.errors?.password?.msg;
        if (emailError)
            toast.error(errorToTxt(emailError))
        if (passwordError)
            toast.error(errorToTxt(passwordError))
    }, [data]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/', { replace: true })
        }
        if (isSuccess && data.token) {
            localStorage.setItem('token', data.token)
            navigate('/', { replace: true })
        }
        if (isError) {
            navigate('/login')
            toast.error('Login failed')
        }
    }, [isSuccess, isError, data])

    const clearState = () => {
        setEmail('');
        setPassword('')
        setValidate({ emailState: '', passwordState: '' })
    }

    const onFormSubmitted = e => {
        e.preventDefault();
        loginUser({ email, password });
        clearState();
    }

    return (
        <div className="loginForm-container">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Form onSubmit={onFormSubmitted}>
                <FormGroup>
                    <Label className="fs-5" for="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        className="fs-5 rounded-0"
                        onChange={onEmailChanged}
                        valid={validate.emailState === 'has-success'}
                        invalid={validate.emailState === 'has-danger'}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="fs-5" for="password">Password</Label>
                    <Input
                        id="password"
                        className="fs-5 rounded-0"
                        name="text"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                        valid={validate.passwordState === 'has-success'}
                        invalid={validate.passwordState === 'has-danger'}
                    />
                </FormGroup>
                <Row className="px-3">
                <Button color="sushi rounded-0 btn-lg" disabled={isLoading}>Login</Button>
                </Row>
            </Form>
        </div>
    )
}

export default LoginForm;