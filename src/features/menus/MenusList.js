import {
    Form,
    Label,
    FormGroup,
    Input,
    Card,
    CardBody,
    CardTitle,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { useState } from "react";
import Loader from '../../layouts/loader/Loader'
import {
    useGetCategoriesQuery,
    useUpdateMenuMutation,
    useRemoveMenuMutation
} from "../api/apiSlice";

import { useGetMenusQuery } from "../api/apiSlice";
import { convertToBase64 } from "../../utils/ImageToBase64";
import ImagePreview from "../../components/ImagePreview";

const MenusList = () => {

    const {
        data: categories,
        isLoading: categoryIsLoading,
        isSuccess: categoryIsSuccess,
        isError: categoryIsError,
        error: categoryError
    } = useGetCategoriesQuery();
    const {
        data: menus,
        isLoading: menuIsLoading,
        isSuccess: menuIsSuccess,
        isError: menuIsError,
        error: menuErorr
    } = useGetMenusQuery();
    const [removeMenu, { isRemoveMenuLoading }] = useRemoveMenuMutation();
    const [updateMenu, { isUpdateMenuLoading }] = useUpdateMenuMutation();

    const [menuId, setMenuId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [oldImageUrl, setOldImageUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [prevImage, setPrevImage] = useState(undefined);
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [currency, setCurrency] = useState('');
    const [available, setAvailable] = useState(false);

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCategorySelected = e => setCategoryId(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onDiscountChanged = e => setDiscount(e.target.value)
    const onImageSelected = async (e) => {
        const imageFile = e.target.files[0];
        const base64Converted = await convertToBase64(imageFile);
        setPrevImage(imageFile);
        setImageName(imageFile.name.split('.')[0])
        setBase64Image(base64Converted)
    }

    const onCurrencySelected = e => setCurrency(e.target.value)
    const onAvailableChanged = e => setAvailable(e.target.checked)

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleUpdate = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen)
        resetInput();
    }
    const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const resetInput = () => {
        setMenuId('');
        setName('');
        setDescription('');
        setOldImageUrl('')
        setPrevImage('');
        setImageName('')
        setBase64Image('')
        setCategoryId('');
        setPrice('');
        setCurrency('');
        setAvailable(false);
    }

    const onUpdateClicked = menuId => {
        if (menuIsSuccess) {
            const {
                _id,
                name,
                description,
                imageUrl,
                category,
                price,
                discount,
                currency,
                available
            } = menus.find(menu => menu._id === menuId);
            setMenuId(_id);
            setName(name);
            setDescription(description);
            setOldImageUrl(imageUrl)
            setCategoryId(category._id);
            setPrice(price);
            setDiscount(discount)
            setCurrency(currency);
            setAvailable(available);
        }
    }

    const onUpdateFormSubmitted = async (e) => {
        e.preventDefault();
        const updatedMenu = {
            _id: menuId,
            name,
            description,
            category: categoryId,
            imageName,
            base64Image,
            price,
            discount,
            currency,
            available
        };
        await updateMenu(updatedMenu).unwrap();
        toggleUpdate();
    }

    const onDeleteMenuClicked = async () => {
        await removeMenu(menuId).unwrap();
        toggleDelete();
    }

    const deleteModal = (
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete}>
            <ModalHeader
                toggle={toggleDelete}>Warning</ModalHeader>
            <ModalBody>
                <h5>Are you sure you want to delete this menu?</h5>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={onDeleteMenuClicked}>Delete</Button>
                <Button onClick={toggleDelete}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
    let categoryComponent;
    if (categoryIsSuccess) {
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

    const updateModal = (
        <Modal isOpen={isUpdateModalOpen} toggle={toggleUpdate}>
            <Form onSubmit={onUpdateFormSubmitted}>
                <ModalHeader
                    toggle={toggleUpdate}>Update Menu</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="menuName">Name</Label>
                        <Input
                            id="menuName"
                            name="menuName"
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
                            placeholder="Menu description"
                            type="description"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="menuPrice">Price</Label>
                        <Input
                            id="menuPrice"
                            name="price"
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={onPriceChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="menuDiscount">Discount</Label>
                        <Input
                            id="menuDiscount"
                            name="discount"
                            placeholder="Discount"
                            type="number"
                            value={discount}
                            onChange={onDiscountChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h6>Old menu image</h6>
                        <img src={oldImageUrl} height='80px' width='80px' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="menuUpdateImage">Update menu image</Label>
                        <Input
                            id="menuUpdateImage"
                            name="menuNewImage"
                            type="file"
                            accept="image/*"
                            onChange={onImageSelected}
                        />
                    </FormGroup>
                    <ImagePreview image={prevImage} txt={'New menu image is not selected yet'} />
                    <FormGroup>
                        <Label for="menuCurrency">Currency</Label>
                        <Input
                            id="currency"
                            name="currencyId"
                            onChange={onCurrencySelected}
                            value={currency}
                            type="select"
                        >
                            <option>Select Currency</option>
                            <option value={1}>
                                Dollar
                            </option>
                            <option value={2}>
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
                            onChange={onAvailableChanged}
                        />&nbsp;
                        <Label check>Is menu available?</Label>
                    </FormGroup>
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

    if (menuIsLoading)
        return <Loader />
    if (menuIsError)
        return (
            <div className="container">
                <div
                    className="alert text-center alert-warning shadow"
                    role="alert">
                    Something went wrong please refresh the page.
                </div>
            </div>
        )
    if (menus.length === 0) {
        return (
            <div className="container">
                <p
                    className="alert text-center alert-info shadow"
                    role="alert">
                    No menu found.
                </p>
            </div>
        )
    }
    if (menuIsSuccess && menus.length !== 0)
        return (
            <div>
                {deleteModal}
                {updateModal}
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Menus List</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless hover striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Avatar</th>
                                    <th>Name & description</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Price with discount</th>
                                    <th>Is available?</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menus.map((menuData, index) => {
                                    const currencyComponent = menuData.currency === 'Dollar' ?
                                <span style={{ fontWeight: "bolder", color: 'gray', fontSize: '16px' }}>&nbsp;$</span> :
                                <span style={{ fontWeight: "bolder", color: 'gray', fontSize: '16px' }}>&nbsp;AED</span>
                                return (
                                <tr key={index} className="border-top">
                                    <td>{++index}</td>
                                    <td>
                                        <div className="d-flex align-items-center p-2">
                                            <img
                                                src={menuData.imageUrl}
                                                className="rounded-circle"
                                                alt="avatar"
                                                width="45"
                                                height="45"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ms-0">
                                            <h6 className="mb-0">{menuData.name}</h6>
                                            <span className="text-muted">{menuData.description}</span>
                                        </div>
                                    </td>
                                    <td>{menuData.category.name}</td>
                                    <td>
                                        {menuData.price}
                                        {currencyComponent}
                                    </td>
                                    <td>{menuData.discount}<span style={{ fontWeight: "bolder", color: 'gray', fontSize: '16px' }}>&nbsp;%</span> </td>
                                    <td>{menuData.price - (menuData.price * (menuData.discount / 100))} {currencyComponent}</td>
                                    <td>
                                        {menuData.available === true ?
                                            <span
                                                className="p-2 bg-success rounded-circle  ms-3 bi bi-check-circle"
                                                style={{ color: 'white' }} />
                                            :
                                            <span
                                                className="p-2 bg-warning rounded-circle ms-3 bi bi-x-circle"
                                                style={{ color: 'white' }} />
                                        }
                                    </td>
                                    <td>
                                        <Button
                                            className="btn btn-sm"
                                            outline
                                            color="primary"
                                            onClick={() => {
                                                toggleUpdate();
                                                onUpdateClicked(menuData._id)
                                            }}>
                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button
                                            className="btn btn-sm"
                                            outline
                                            color="danger"
                                            onClick={() => {
                                                toggleDelete();
                                                setMenuId(menuData._id);
                                            }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>)
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
};

export default MenusList;
