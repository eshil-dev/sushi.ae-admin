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

import { useDispatch } from "react-redux";
import { useState } from "react";
import { categoryAdded } from "./categoriesSlice";

import user1 from "../../assets/images/users/user1.jpg";

const AddCategoryForm = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onAvailableChanged = e => setAvailable(e.target.checked);

    const isValid = Boolean(name) && Boolean(description);

    const onFormSubmitted = e => {
        e.preventDefault();
        const category = {
            id: Date.now().toString(),
            avatar: user1,
            name: name,
            description: description,
            available: available,
        };
        dispatch(categoryAdded(category))
        setName('');
        setDescription('');
        setAvailable('');
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
