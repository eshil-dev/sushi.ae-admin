import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState } from "react"

import { useRegisterUserMutation } from "../api/apiSlice";
import { convertToBase64 } from "../../utils/ImageToBase64";
import ImagePreview from "../../components/ImagePreview";

const RegiserForm = () => {

    const [RegisterUser, { isLoading, isSuccess, isError, data }] = useRegisterUserMutation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [imageName, setImageName] = useState('');
    const [prevImage, setPrevImage] = useState('');
    const [imageBase64, setImageBase64] = useState(undefined);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFullNameChanged = e => setFullName(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);

    const onImageSelected = async (e) => {
        const image = e.target.files[0]
        const base64Converted = await convertToBase64(image);
        setPrevImage(image)
        setImageName(image.name.split('.')[0])
        setImageBase64(base64Converted)
    }

    const onPasswordChanged = e => setPassword(e.target.value);
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value);

    const isValid = Boolean(fullName) && Boolean(email) && (Boolean(password) && Boolean(confirmPassword) && password === confirmPassword);

    const clearState = () => {
        setFullName('');
        setEmail('');
        setImageBase64(undefined);
        setPrevImage(undefined)
        setPassword('');
        setConfirmPassword('');
    }

    const onFormSubmitted = async (e) => {
        e.preventDefault();
        const userData = { fullName, email, imageName, imageBase64, password, confirmPassword }
        await RegisterUser(userData).unwrap();
        clearState();
    }

    return (
        <Form className="form" onSubmit={onFormSubmitted}>
            <FormGroup>
                <FormGroup>
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
                <FormGroup>
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
            <FormGroup>
                <Label for="imageFile">Add Image profile</Label>
                <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={onImageSelected}
                />
            </FormGroup>
            <ImagePreview image={prevImage} txt={'Profile is not selected yet'}/>
            <FormGroup className="row">
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
                <FormGroup>
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
            <Button disabled={!isValid} color="primary">Create user</Button>
        </Form>
    )
}

export default RegiserForm;