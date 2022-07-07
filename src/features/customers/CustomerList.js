import {
    Card,
    CardBody,
    CardTitle,
    Table,
} from "reactstrap";
import { LocationOn } from '@mui/icons-material';

import { useGetCustomersQuery } from "../api/apiSlice";

const CustomerList = () => {

    const { data: customers, isLoading, isSuccess, isError, error } = useGetCustomersQuery();

    if (isLoading && !isSuccess) {
        return <h2>Loading...</h2>
    } else if (isError) {
        return <h2>Some error occured.</h2>
    } else if (error) {
        return <h2>{error.toString()}</h2>
    }
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
