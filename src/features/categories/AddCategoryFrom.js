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
    Input,
} from "reactstrap";

import { useState } from "react";

import { useAddNewCategoryMutation } from "../api/apiSlice";

const AddCategoryForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);

    const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onAvailableChanged = e => setAvailable(e.target.checked);

    const isValid = Boolean(name) && Boolean(description) && !isLoading;

    const onFormSubmitted = async (e) => {
        e.preventDefault();

        if (isValid) {
            try {
                await addNewCategory({ name, description, available, imageUrl: 'imageURL' }).unwrap();
                setName('');
                setDescription('');
                setAvailable('');
            } catch (err) {
                console.log('::ERROR during adding category::')
            }
        }
    }

    return (
        <Row>
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
