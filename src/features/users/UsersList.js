import {
    Card,
    CardBody,
    CardTitle,
    Table,
    Button,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from "reactstrap";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useRemoveUserMutation,
    useChangeUserPasswordMutation
} from "../api/apiSlice";
import { convertToBase64 } from "../../utils/ImageToBase64";
import ImagePreview from "../../components/ImagePreview";
import { errorToTxt } from "../../utils/errorTotxtHelper";

const UsersList = () => {

    const { data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllUsersQuery();
    const [updateUser,
        { isSuccess: isUpdateSuccess,
            isLoading: isUpdateLoading,
            isError: isUpdateError
        }] = useUpdateUserMutation()
    const [removeUser,
        { isSuccess: isRemoveSucces,
            isLoading: isRemoveLoading,
            isError: isRemoveError
        }] = useRemoveUserMutation();

    const [changePassword, { data: response }] = useChangeUserPasswordMutation();

    // Operation updating userInfo
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const toggleUpdate = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen);
        clearUpdateState();
    };
    const [userId, setUserId] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [oldImageUrl, setOldImageUrl] = useState('')
    const [imageName, setImageName] = useState('')
    const [prevImage, setPrevImage] = useState('')
    const [base64Image, setBase64Image] = useState('')

    const clearUpdateState = () => {
        setUserId('')
        setFullName('')
        setEmail('')
        setOldImageUrl('')
        setImageName('')
        setPrevImage('')
        setBase64Image('')
    }

    const onFullNameChanged = e => setFullName(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onImageSelected = async (e) => {
        const imageFile = e.target.files[0];
        const base64Converted = await convertToBase64(imageFile);
        setPrevImage(imageFile);
        setImageName(imageFile.name.split('.')[0])
        setBase64Image(base64Converted)
    }

    const onUpdateButtonClicked = userId => {
        toggleUpdate()
        setUserId(userId);
        const userInfo = users.find(
            user => user._id === userId
        );
        setFullName(userInfo.fullName);
        setEmail(userInfo.email);
        setOldImageUrl(userId.imageAvatarUrl);
    }

    const onUpdateFormSubmitted = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                _id: userId,
                fullName,
                email,
                imageName,
                base64Image,
            };
            await updateUser(updatedUser).unwrap();
        } catch (err) {
            console.log('Error during update operation')
        } finally {
            toggleUpdate();
            clearUpdateState();
        }
    }

    useEffect(() => {
        if (isUpdateError)
            toast.error('Something went wrong, could not update it')
        if (isUpdateSuccess)
            toast.success('User profile updated successfully')
    }, [isUpdateError, isUpdateLoading, isUpdateSuccess])

    // Operation for user deletion
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const deleteUser = async () => {
        try {
            await removeUser(userId).unwrap();
            setIsDeleteModalOpen(!isDeleteModalOpen);
        } catch (e) {
            console.log('ERRR during delete user');
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        if (isRemoveError)
            toast.error('Something went wrong, could not delete it')
        if (isRemoveSucces)
            toast.success('User deleted successfully')
    }, [isRemoveError, isRemoveLoading, isRemoveSucces])

    // Operation for changing password
    const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);
    const toggleChangePassword = () => setIsPasswordChangeModalOpen(!isPasswordChangeModalOpen);

    const [emailAdd, setEmailAdd] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [currentPasswordValidationState, setCurrentPasswordValidationState] = useState({ state: '', msg: '' })
    const [newPasswordValidationState, setNewPasswordValidationState] = useState('')
    const [confirmPasswordValidationState, setConfirmPasswordValidationState] = useState('')

    const changeCurrentPassword = userEmail => {
        if (userEmail) {
            setEmailAdd(userEmail);
            toggleChangePassword();
        }
    }

    const onCurrentPasswordChanged = e => {
        const curPass = e.target.value;
        curPass.length < 8 || curPass.length > 32
            ? setCurrentPasswordValidationState({
                state: 'has-danger',
                msg: 'Current password must be at least 8 characters'
            })
            : setCurrentPasswordValidationState({ state: 'has-success', msg: '' })
        setCurrentPassword(curPass)
    };
    const onNewPasswordChanged = e => {
        const newPass = e.target.value;
        newPass.length < 8 || newPass.length > 32
            ? setNewPasswordValidationState({
                state: 'has-danger', msg:
                    'Password length must be at least 8'
            })
            : newPass === currentPassword
                ? setNewPasswordValidationState({
                    state: 'has-danger',
                    msg: 'New password cannet be like old password'
                })
                : setNewPasswordValidationState({ state: 'has-success', msg: '' })
        setNewPassword(newPass)
    };
    const onConfirmNewPasswordChanged = e => {
        const confPass = e.target.value;
        confPass.length < 8 || confPass.length > 32
            ? setConfirmPasswordValidationState({
                state: 'has-danger',
                msg: 'Password length must be at least 8'
            })
            : confPass !== newPassword
                ? setConfirmPasswordValidationState({
                    state: 'has-danger',
                    msg: 'Confirmation password is not matched with new password'
                })
                : setConfirmPasswordValidationState({ state: 'has-success', msg: '' })
        setConfirmNewPassword(confPass)
    };

    const isValid = currentPasswordValidationState.state
        === 'has-success' && newPasswordValidationState.state
        === 'has-success' && confirmPasswordValidationState.state
        === 'has-success';

    const clearChangePasswordState = () => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setCurrentPasswordValidationState({ state: '', msg: '' })
        setNewPasswordValidationState({ state: '', msg: '' })
        setConfirmPasswordValidationState({ state: '', msg: '' })
    }

    const onPasswordChangeFormSubmitted = async (e) => {
        e.preventDefault();
        try {
            const newCredential = { emailAdd, currentPassword, confirmNewPassword };
            await changePassword(newCredential).unwrap();
        } catch (err) {
            console.log('Error during changing password')
            toast.err('Something went wrong')
        }
    }

    useEffect(() => {
        if (response?.acknowledged === true) {
            toast.success('Change password success')
            toggleChangePassword();
            clearChangePasswordState()
        }
        if (response?.code) {
            toast.error(errorToTxt(response?.errors?.password?.msg))
            clearChangePasswordState()
        }
    }, [response])

    const deleteModal = (
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete}>
            <ModalHeader
                toggle={toggleDelete}>Warning</ModalHeader>
            <ModalBody>
                <h5>Are you sure you want to delete this user?</h5>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteUser} >Delete</Button>
                <Button onClick={toggleDelete}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )

    const updateModal = (
        <Modal isOpen={isUpdateModalOpen} toggle={toggleUpdate}>
            <Form onSubmit={onUpdateFormSubmitted}>
                <ModalHeader
                    toggle={toggleUpdate}>Update User</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="fullName">Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Full name"
                            type="text"
                            value={fullName}
                            onChange={onFullNameChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="emailAddress">Email address</Label>
                        <Input
                            id="emailAddress"
                            name="email"
                            placeholder="Email address"
                            type="email"
                            value={email}
                            onChange={onEmailChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h6>Old profile</h6>
                        <img src={oldImageUrl} height='80px' width='80px' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="updateImageProfile">Update profile</Label>
                        <Input
                            id="updateImageProfile"
                            name="userImage"
                            type="file"
                            accept="image/*"
                            onChange={onImageSelected}
                        />
                    </FormGroup>
                    <ImagePreview image={prevImage} txt={'New profile image is not selected yet'} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Update</Button>
                    <Button onClick={toggleUpdate}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

    const changePasswordModal = (
        <Modal isOpen={isPasswordChangeModalOpen} toggle={toggleChangePassword}>
            <Form onSubmit={onPasswordChangeFormSubmitted}>
                <ModalHeader
                    toggle={toggleChangePassword}>Change password</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="emailAddress">Email address (Not changable)</Label>
                        <Input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={emailAdd}
                            disabled
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="currentPassword">Enter current password</Label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            type="password"
                            value={currentPassword}
                            onChange={onCurrentPasswordChanged}
                            valid={currentPasswordValidationState.state === 'has-success'}
                            invalid={currentPasswordValidationState.state === 'has-danger'}
                        />
                        <FormFeedback>{currentPasswordValidationState.msg}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="newPassword">Enter new password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            placeholder="New password"
                            type="password"
                            value={newPassword}
                            onChange={onNewPasswordChanged}
                            valid={newPasswordValidationState.state === 'has-success'}
                            invalid={newPasswordValidationState.state === 'has-danger'}
                        />
                        <FormFeedback>{newPasswordValidationState.msg}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmNewPassword">Confirm new password</Label>
                        <Input
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="Confirm new password"
                            type="password"
                            value={confirmNewPassword}
                            onChange={onConfirmNewPasswordChanged}
                            valid={confirmPasswordValidationState.state === 'has-success'}
                            invalid={confirmPasswordValidationState.state === 'has-danger'}
                        />
                        <FormFeedback>{confirmPasswordValidationState.msg}</FormFeedback>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={!isValid}>Change Password</Button>
                    <Button onClick={toggleChangePassword}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

    if (isLoading && !isSuccess) {
        return <h2>Loading...</h2>
    } else if (isError) {
        return <h2>Some error occured.</h2>
    } else if (error) {
        return <h2>{error.toString()}</h2>
    }
    if (isSuccess)
        return (
            <Card>
                {deleteModal}
                {updateModal}
                {changePasswordModal}
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <CardBody>
                    <CardTitle tag="h5">User List</CardTitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless hover striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Full name</th>
                                <th>Email Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((userData, index) => (
                                <tr key={index} className="border-top">
                                    <td>{index}</td>
                                    <td>
                                        <div className="d-flex align-items-center p-2">
                                            <img
                                                src={userData.imageAvatarUrl}
                                                className="rounded-circle"
                                                alt="avatar"
                                                width="45"
                                                height="45"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        {userData.fullName}
                                    </td>
                                    <td>
                                        {userData.email}
                                    </td>
                                    <td>
                                        <Button
                                            className="btn btn-sm"
                                            outline
                                            color="primary"
                                            onClick={() => { onUpdateButtonClicked(userData._id) }}
                                        >
                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button
                                            className="btn btn-sm"
                                            outline
                                            color="danger"
                                            onClick={() => {
                                                setUserId(userData._id);
                                                toggleDelete();
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        &nbsp;
                                        <Button
                                            className="btn btn-sm"
                                            outline
                                            color="warning"
                                            onClick={() => {
                                                console.log('::userData.email::', userData.email)
                                                changeCurrentPassword(userData.email)
                                            }}
                                        >
                                            Change password
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
};

export default UsersList;
