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
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { menuRemoved } from "./menusSlice";

const MenusList = () => {

    const dispatch = useDispatch();
    const menus = useSelector(state => state.menus);
    const categories = useSelector(state => state.categories.categories);

    const [menuId, setMenuId] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [available, setAvailable] = useState(false);

    const toggleUpdate = () => setIsUpdateModalOpen(!isUpdateModalOpen);
    const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCategorySelected = e => setCategory(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onCurrencySelected = e => setCurrency(e.target.value)
    const onAvailableChanged = e => setAvailable(e.target.checked)

    const onUpdateClicked = menuId => {
        const { name, description, category, price, currency, available } = menus.find(menu => menu.id === menuId);
        setName(name);
        setDescription(description);
        setCategory(category);
        setPrice(price);
        setCurrency(currency);
        setAvailable(available);
    }

    const onFormSubmitted = e => {
        e.preventDefault();
        console.log(name, description, category, price, currency, available)
    }

    const onDeleteMenuClicked = () => {
        dispatch(menuRemoved(menuId));
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

    const updateModal = (
        <Modal isOpen={isUpdateModalOpen} toggle={toggleUpdate}>
            <Form onSubmit={onFormSubmitted}>
                <ModalHeader
                    toggle={toggleUpdate}>Update Menu</ModalHeader>
                <ModalBody>
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
                            placeholder="Menu description"
                            type="text"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="menuDescription">Description</Label>
                        <Input
                            id="menuDescription"
                            name="text"
                            placeholder="Menu description"
                            type="text"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="menuPrice">Price</Label>
                        <Input
                            id="menuPrice"
                            name="text"
                            placeholder="Price"
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
                            <option value={1}>
                                Dollar
                            </option>
                            <option value={2}>
                                Derham
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-4">
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
                                <th>Is available?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menuData, index) => (
                                <tr key={index} className="border-top">
                                    <td>{index}</td>
                                    <td>
                                        <div className="d-flex align-items-center p-2">
                                            <img
                                                src={menuData.avatar}
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
                                    <td>{menuData.category}</td>
                                    <td>{menuData.price} {menuData.currency === 1 ? <span style={{ fontWeight: "bolder", color: 'gray' }}>$</span> : <span style={{ fontWeight: "bolder", color: 'gray' }}>&</span>}</td>
                                    <td>
                                        {menuData.available === true ? (
                                            <span className="p-2 bg-success rounded-circle  ms-3 bi bi-check-circle" style={{ color: 'white' }}></span>
                                        ) : (
                                            <span className="p-2 bg-warning rounded-circle ms-3 bi bi-x-circle" style={{ color: 'white' }}></span>
                                        )}
                                    </td>
                                    <td>
                                        <Button className="btn btn-sm" outline color="primary" onClick={() => {
                                            toggleUpdate();
                                            onUpdateClicked(menuData.id)
                                        }}>
                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button className="btn btn-sm" outline color="danger" onClick={() => {
                                            setMenuId(menuData.id);
                                            toggleDelete();
                                        }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};

export default MenusList;
