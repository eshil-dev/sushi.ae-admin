import {
    Card,
    CardBody,
    CardTitle,
    Table,
    Button,
} from "reactstrap";

import { useGetAllUsersQuery } from "../api/apiSlice";

const UsersList = () => {

    const { data: users, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();
    if (isLoading && !isSuccess) {
        return <h2>Loading...</h2>
    } else if (isError) {
        return <h2>Some error occured.</h2>
    } else if (error) {
        return <h2>{error.toString()}</h2>
    }
    if (isSuccess)
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">User List</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless hover striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Avatar</th>
                                    <th>Full name</th>
                                    <th>Email Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userData, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{index}</td>
                                        <td>
                                            <div className="d-flex align-items-center p-2">
                                                <img
                                                    src={userData.imageAvatarUrl}
                                                    className="rounded-circle"
                                                    alt="avatar"
                                                    width="45"
                                                    height="45"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            {userData.fullName}
                                        </td>
                                        <td>
                                            {userData.email}
                                        </td>
                                        <td>
                                            <Button
                                                className="btn btn-sm"
                                                outline
                                                color="primary"
                                            >
                                                Update
                                            </Button>
                                            &nbsp;
                                            <Button
                                                className="btn btn-sm"
                                                outline
                                                color="danger"
                                            >
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

export default UsersList;
