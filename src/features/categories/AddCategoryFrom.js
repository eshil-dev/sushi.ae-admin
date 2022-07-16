import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useAddNewCategoryMutation } from "../api/apiSlice";
import { convertToBase64 } from "../../utils/ImageToBase64";
import ImagePreview from "../../components/ImagePreview";

const AddCategoryForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageName, setImageName] = useState('');
    const [prevImage, setPrevImage] = useState(undefined);
    const [imageBase64, setImageBase64] = useState(undefined);
    const [available, setAvailable] = useState(false);

    const [addNewCategory, { isLoading, isSuccess, isError }] = useAddNewCategoryMutation();

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onImageSelected = async (e) => {
        const imageFile = e.target.files[0];
        const base64Converted = await convertToBase64(imageFile);
        setPrevImage(imageFile);
        setImageName(imageFile.name.split('.')[0])
        setImageBase64(base64Converted)
    }

    const onAvailableChanged = e => setAvailable(e.target.checked);
    const isValid = Boolean(name) && Boolean(description) && !isLoading;

    useEffect(() => {
        if (isSuccess)
            toast.success('Category added successfully')
        if (isError)
            toast.success('Oops, something went wrong. please try again')
    }, [isLoading, isSuccess, isError])

    const clearState = () => {
        setName('');
        setDescription('');
        setImageName('');
        setPrevImage('');
        setImageBase64('');
        setAvailable('');
    }

    const onFormSubmitted = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const category = { name, description, imageName, imageBase64, available }
                await addNewCategory(category).unwrap();
                clearState()
            } catch (err) {
                toast.success('Oops, something went wrong. please try again')
            }
        }
    }

    return (
        <Row>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Add Categories
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={onFormSubmitted}>
                            <FormGroup>
                                <Label for="categoryName">Name</Label>
                                <Input
                                    id="categoryName"
                                    name="text"
                                    placeholder="Category name"
                                    type="text"
                                    value={name}
                                    onChange={onNameChanged}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryDescription">Description</Label>
                                <Input
                                    id="categoryDescription"
                                    name="text"
                                    placeholder="Category description"
                                    type="text"
                                    value={description}
                                    onChange={onDescriptionChanged}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryImage">Image</Label>
                                <Input
                                    id="categoryImage"
                                    name="catImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={onImageSelected}
                                />
                            </FormGroup>
                            <ImagePreview
                                image={prevImage}
                                txt={'Image for this category is not selected yet'}
                            />
                            <FormGroup>
                                <Input
                                    type="checkbox"
                                    value={available}
                                    checked={available}
                                    onChange={onAvailableChanged}
                                />&nbsp;
                                <Label check>Is category available?</Label>
                            </FormGroup>
                            <Button disabled={!isValid}>Save</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddCategoryForm;
