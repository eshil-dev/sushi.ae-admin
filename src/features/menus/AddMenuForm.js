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

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { menuAdded } from "./menusSlice";

import user1 from "../../assets/images/users/user1.jpg";

const AddMenuForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [available, setAvailable] = useState(false);

    const categories = useSelector(state => state.categories);

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onCategorySelected = e => setCategory(e.target.value)
    const onAvailableChecked = e => setAvailable(e.target.checked);

    const isValid = Boolean(name) && Boolean(description) && Boolean(category);

    const onFormSubmitted = e => {
        e.preventDefault();
        const menu = {
            id: Date.now().toString(),
            name: name,
            description: description,
            category: category,
            available: available,
            avatar: user1
        }
        dispatch(menuAdded(menu))
        setName('');
        setDescription('');
        setCategory('');
        setAvailable(false);

    }

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Add Menu
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={onFormSubmitted}>
                            <FormGroup>
                                <Label for="menuName">Name</Label>
                                <Input
                                    id="menuName"
                                    name="text"
                                    placeholder="Menu name"
                                    type="text"
                                    value={name}
                                    onChange={onNameChanged}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="menuDescription">Description</Label>
                                <Input
                                    id="menuDescription"
                                    name="text"
                                    placeholder="menu description"
                                    type="text"
                                    value={description}
                                    onChange={onDescriptionChanged}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input
                                    id="category"
                                    name="catId"
                                    onChange={onCategorySelected}
                                    type="select"
                                >
                                    <option>Select Category</option>
                                    {categories.map(category => (
                                        <option
                                            key={category.id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Input
                                type="checkbox"
                                value={available}
                                checked={available}
                                onChange={onAvailableChecked}
                            />&nbsp;
                            <Label check>Is menu available?</Label>
                            <FormGroup>
                            </FormGroup>
                            <Button disabled={!isValid}>Save</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddMenuForm;
