import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { menuUpdated, menuRemoved } from "./menusSlice";

const MenusList = () => {

    const dispatch = useDispatch();
    const menus = useSelector(state => state.menus);

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Menus List</CardTitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Name & description</th>
                                <th>Category</th>
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
                                    <td>
                                        {menuData.available === true ? (
                                            <span className="p-2 bg-success rounded-circle  ms-3 bi bi-check-circle" style={{ color: 'white' }}></span>
                                        ) : (
                                            <span className="p-2 bg-warning rounded-circle ms-3 bi bi-x-circle" style={{ color: 'white' }}></span>
                                        )}
                                    </td>
                                    <td>
                                        <Button className="btn btn-sm" outline color="primary">
                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button className="btn btn-sm" outline color="danger" onClick={() => {
                                            dispatch(menuRemoved(menuData.id))
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
