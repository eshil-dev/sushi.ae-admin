import {
    Card,
    CardBody,
    CardTitle,
    Table,
} from "reactstrap";
import { LocationOn } from '@mui/icons-material';

import Loader from '../../layouts/loader/Loader'
import { useGetCustomersQuery } from "../api/apiSlice";

const CustomerList = () => {

    const { data: customers, isLoading, isSuccess, isError } = useGetCustomersQuery();

    if (isLoading)
        return <Loader />
    if (isError)
        return (
            <div className="container">
                <div class="alert text-center alert-warning shadow" role="alert">Something went wrong please refresh the page.</div>
            </div>
        )
    if (customers.length === 0) {
        return (
            <div className="container">
                <p class="alert text-center alert-info shadow" role="alert">No customer found.</p>
            </div>
        )
    }
    if (isSuccess && customers.length !== 0)
        return (
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Customers List</CardTitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless hover striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer Name</th>
                                <th>phone</th>
                                <th className="text-center">Locations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={index} className="border-top">
                                    <td>{++index}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        {customer.locations.map(loc => {
                                            return <div className="ms-0 text-center" key={loc._id}>
                                                <p className="mb-1">{loc.address}</p>
                                                <LocationOn onClick={() => { console.log('::loc.location::', loc.location) }} />
                                            </div>
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
};

export default CustomerList;
