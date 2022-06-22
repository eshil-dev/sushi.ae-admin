import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState } from "react"

import { useRegisterUserMutation } from "../api/apiSlice";

const RegiserForm = () => {

    const [RegisterUser, { isLoading }] = useRegisterUserMutation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFullNameChanged = e => setFullName(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value);

    const isValid = Boolean(fullName) && Boolean(email) && (Boolean(password) && Boolean(confirmPassword) && password === confirmPassword);

    const onFormSubmitted = async (e) => {
        e.preventDefault();        
        const userData = { fullName, email, password, confirmPassword }

        await RegisterUser(userData).unwrap();

        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        

    }

    return (
        <Form className="col-12" onSubmit={onFormSubmitted}>
            <FormGroup className="row">
                <FormGroup className="col-4">
                    <Label for="fullName">Full name</Label>
                    <Input
                        id="fullName"
                        name="text"
                        placeholder="Full Name"
                        type="text"
                        value={fullName}
                        onChange={onFullNameChanged}
                    />
                </FormGroup>
                <FormGroup className="col-4">
                    <Label for="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Emaill address"
                        type="email"
                        value={email}
                        onChange={onEmailChanged}
                    />
                </FormGroup>
            </FormGroup>
            <FormGroup className="row">
                <FormGroup className="col-4">
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
                <FormGroup className="col-4">
                    <Label for="confirmPassword">Confirm password</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChanged}
                    />
                </FormGroup>
            </FormGroup>
            <Button disabled={!isValid} outline color="info">Register</Button>
        </Form>
    )
}

export default RegiserForm;