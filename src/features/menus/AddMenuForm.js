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
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
    useGetCategoriesQuery,
    useAddNewMenuMutation
} from "../api/apiSlice";
import { convertToBase64 } from "../../utils/ImageToBase64";
import ImagePreview from "../../components/ImagePreview";

const AddMenuForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [currency, setCurrency] = useState('');
    const [imageName, setImageName] = useState('');
    const [prevImage, setPrevImage] = useState(undefined);
    const [imageBase64, setImageBase64] = useState(undefined);
    const [categoryId, setCategoryId] = useState('');
    const [available, setAvailable] = useState(false);

    const { data: categories, isSuccess } = useGetCategoriesQuery();
    const [addNewMenu, { isLoading: isAddMenuLoading, isSuccess: isAddMenuSucces, isError: isAddMenuError }] = useAddNewMenuMutation();

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onCategorySelected = e => setCategoryId(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value);
    const onDiscountChanged = e => setDiscount(e.target.value);
    const onCurrencySelected = e => setCurrency(e.target.value);
    const onImageSelected = async (e) => {
        const image = e.target.files[0]
        const base64Converted = await convertToBase64(image);
        setPrevImage(image)
        setImageName(image.name.split('.')[0])
        setImageBase64(base64Converted)
    }

    const onAvailableChecked = e => setAvailable(e.target.checked);

    const isValid = Boolean(name) && Boolean(description) && Boolean(price) && Boolean(categoryId);

    const clearState = () => {
        setName('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setImageName('')
        setPrevImage('')
        setImageBase64('')
        setCurrency('');
        setCategoryId('');
        setAvailable(false);
    }

    useEffect(() => {
        if (isAddMenuSucces)
            toast.success('Menu added successfully')
        if (isAddMenuError)
            toast.success('Oops, something went wrong. please try again')
    }, [isAddMenuLoading, isAddMenuSucces, isAddMenuError])

    const onFormSubmitted = async (e) => {
        e.preventDefault();
        const newMenu = {
            name,
            description,
            price,
            discount,
            imageName,
            imageBase64,
            currency,
            category: categoryId,
            available,
        }
        await addNewMenu(newMenu).unwrap();
        clearState();
    }

    let categoryComponent;
    if (isSuccess) {
        categoryComponent =
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
                            key={category._id}
                            value={category._id}
                        >
                            {category.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
    } else {
        categoryComponent =
            <FormGroup>
                <Label for="category">Category</Label>
                <Input
                    id="category"
                    name="catId"
                    onChange={onCategorySelected}
                    type="select"
                >
                    <option>Select Category</option>
                </Input>
            </FormGroup>
    }

    const currencyComponent =
        currency === 'Dollar' ?
            <span
                style={{ fontWeight: "bolder", color: 'gray', fontSize: '16px' }}>
                &nbsp;$&nbsp;
            </span>
            : currency === 'Derham' ?
                <span
                    style={{ fontWeight: "bolder", color: 'gray', fontSize: '16px' }}>
                    &nbsp;AED&nbsp;
                </span>
                : ''
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
                            <FormGroup>
                                <Label for="menuDiscount">Discount (%)</Label>
                                <Input
                                    id="menuDiscount"
                                    name="discount"
                                    placeholder="menu Discount"
                                    type="number"
                                    value={discount}
                                    onChange={onDiscountChanged}
                                />
                            </FormGroup>
                            {
                                currency && discount &&
                                <p>
                                    Price after discount: {price - (price * (discount / 100))} {currencyComponent}
                                </p>
                            }
                            <FormGroup>
                                <Label for="imageFile">Image</Label>
                                <Input
                                    id="imageFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={onImageSelected}
                                />
                            </FormGroup>
                            <ImagePreview
                                image={prevImage}
                                txt={'Image for this menu is not selected yet'}
                            />
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
