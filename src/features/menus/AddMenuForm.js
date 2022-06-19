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
import {
    useGetCategoriesQuery,
    useAddNewMenuMutation
} from "../api/apiSlice";

const AddMenuForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [available, setAvailable] = useState(false);

    const { data: categories, isSuccess } = useGetCategoriesQuery();
    const [addNewMenu, { isLoading: isAddMenuLoading }] = useAddNewMenuMutation();

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onCategorySelected = e => setCategoryId(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value);
    const onCurrencySelected = e => setCurrency(e.target.value);
    const onAvailableChecked = e => setAvailable(e.target.checked);

    const isValid = Boolean(name) && Boolean(description) && Boolean(price) && Boolean(categoryId);

    const onFormSubmitted = async (e) => {
        e.preventDefault();
        const newMenu = {
            name,
            description,
            price,
            currency,
            category: categoryId,
            available,
            imageUrl: 'imageUrl'
        }
        await addNewMenu(newMenu).unwrap();
        setName('');
        setDescription('');
        setPrice('');
        setCurrency('');
        setCategoryId('');
        setAvailable(false);
    }

    let categoryComponent;
    if (isSuccess) {
        categoryComponent = (<FormGroup>
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
                        key={category._id}
                        value={category._id}
                    >
                        {category.name}
                    </option>
                ))}
            </Input>
        </FormGroup>)
    } else {
        categoryComponent = (<FormGroup>
            <Label for="category">Category</Label>
            <Input
                id="category"
                name="catId"
                onChange={onCategorySelected}
                type="select"
            >
                <option>Select Category</option>
            </Input>
        </FormGroup>)
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
                                <Label for="menuPrice">Price</Label>
                                <Input
                                    id="menuPrice"
                                    name="price"
                                    placeholder="menu Price"
                                    type="number"
                                    value={price}
                                    onChange={onPriceChanged}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="menuCurrency">Currency</Label>
                                <Input
                                    id="currency"
                                    name="currencyId"
                                    onChange={onCurrencySelected}
                                    value={currency}
                                    type="select"
                                >
                                    <option>Select Category</option>
                                    <option>
                                        Dollar
                                    </option>
                                    <option>
                                        Derham
                                    </option>
                                </Input>
                            </FormGroup>
                            {categoryComponent}
                            <FormGroup>
                                <Input
                                    type="checkbox"
                                    value={available}
                                    checked={available}
                                    onChange={onAvailableChecked}
                                />&nbsp;
                                <Label check>Is menu available?</Label>
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
