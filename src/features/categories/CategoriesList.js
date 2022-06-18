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
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { categoryRemoved, categoryUpdated } from "./categoriesSlice";
import { fetchCategories } from './categoriesSlice';

import user1 from "../../assets/images/users/user1.jpg";

const CategoriesList = () => {

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [catId, setCatId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);

    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.categories);
    const categoryStatus = useSelector(state => state.categories.status);

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, categoryStatus])

    const toggleUpdate = () => setIsUpdateModalOpen(!isUpdateModalOpen);
    const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onAvailableChanged = e => setAvailable(e.target.checked);

    const deleteCategory = () => {
        dispatch(categoryRemoved(catId));
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const onUpdateButtonClicked = catId => {
        toggleUpdate()
        setCatId(catId);
        const catItem = categories.find((item) => item.id === catId);
        setName(catItem.name);
        setDescription(catItem.description);
        setAvailable(catItem.available)
    }

    const onUpdateFormSubmitted = e => {
        e.preventDefault();
        const newCategory = {
            catId: catId,
            avatar: user1,
            name: name,
            description: description,
            available: available,
        };
        dispatch(categoryUpdated(newCategory));
        toggleUpdate();

    }

    const deleteModal = (
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete}>
            <ModalHeader
                toggle={toggleDelete}>Warning</ModalHeader>
            <ModalBody>
                <h5>Are you sure you want to delete this category?</h5>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteCategory}>Delete</Button>
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
                    toggle={toggleUpdate}>Update Category</ModalHeader>
                <ModalBody>
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
            {updateModal}
            {deleteModal}
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Categories List</CardTitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless hover striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Name & description</th>
                                <th>Is available?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((catData, index) => (
                                <tr key={index} className="border-top">
                                    <td>{index}</td>
                                    <td>
                                        <div className="d-flex align-items-center p-2">
                                            <img
                                                src={catData.avatar}
                                                className="rounded-circle"
                                                alt="avatar"
                                                width="45"
                                                height="45"
                                            />

                                        </div>
                                    </td>
                                    <td>
                                        <div className="ms-0">
                                            <h6 className="mb-0">{catData.name}</h6>
                                            <span className="text-muted">{catData.description}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {catData.available === true ? (
                                            <span className="p-2 bg-success rounded-circle  ms-3 bi bi-check-circle" style={{ color: 'white' }}></span>
                                        ) : (
                                            <span className="p-2 bg-warning rounded-circle ms-3 bi bi-x-circle" style={{ color: 'white' }}></span>
                                        )}
                                    </td>
                                    <td>
                                        <Button className="btn btn-sm" outline color="primary" onClick={() => onUpdateButtonClicked(catData.id)}>
                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button className="btn btn-sm" outline color="danger" onClick={() => {
                                            toggleDelete();
                                            setCatId(catData.id);
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

export default CategoriesList;
