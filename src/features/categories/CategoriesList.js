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
import { useState } from "react";

import { useGetCategoriesQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from "../api/apiSlice";

const CategoriesList = () => {

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [catId, setCatId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);

    const { data: categories, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();
    const [updateCategory] = useUpdateCategoryMutation();
    const [removeCategory] = useRemoveCategoryMutation();

    const toggleUpdate = () => setIsUpdateModalOpen(!isUpdateModalOpen);
    const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onAvailableChanged = e => setAvailable(e.target.checked);

    const deleteCategory = async () => {
        try {
            await removeCategory(catId).unwrap();
            setIsDeleteModalOpen(!isDeleteModalOpen);
        } catch (e) {
            console.log('ERRR during delete category');
        }
    }

    const onUpdateButtonClicked = catId => {
        toggleUpdate()
        setCatId(catId);
        const categoryItem = categories.find((item) => item._id === catId);
        setName(categoryItem.name);
        setDescription(categoryItem.description);
        setAvailable(categoryItem.available)
    }

    const onUpdateFormSubmitted = async (e) => {
        e.preventDefault();
        try {
            const updatedCategory = {
                _id: catId,
                imageUrl: 'user.jpg',
                name: name,
                description: description,
                available: available,
            };
            await updateCategory(updatedCategory).unwrap();

        } catch (err) {

        } finally {
            toggleUpdate();
        }

    }

    const deleteModal = (
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete}>
            <ModalHeader
                toggle={toggleDelete}>Warning</ModalHeader>
            <ModalBody>
                <h5>Are you sure you want to delete this category?</h5>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteCategory} >Delete</Button>
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

    if (isLoading && !isSuccess) {
        return <h2>Loading...</h2>
    } else if (isError) {
        return <h2>Some error occured.</h2>
    } else if (error) {
        return <h2>{error.toString()}</h2>
    }
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
                                                src={`../../assets/images/users/${catData.imageUrl}`}
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
                                    <td>{

                                    }
                                        {catData.available === true ? (
                                            <span className="p-2 bg-success rounded-circle  ms-3 bi bi-check-circle" style={{ color: 'white' }}></span>
                                        ) : (
                                            <span className="p-2 bg-warning rounded-circle ms-3 bi bi-x-circle" style={{ color: 'white' }}></span>
                                        )}
                                    </td>
                                    <td>
                                        <Button className="btn btn-sm" outline color="primary" onClick={() => onUpdateButtonClicked(catData._id)}>
                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button className="btn btn-sm" outline color="danger" onClick={() => {
                                            toggleDelete();
                                            setCatId(catData._id);
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
