import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

class Student extends Component {

    state = {
        'customer': '',
        'loading': 'true',
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/LaravelProjectDemoAdminLte/api/customer');
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                customer: res.data.customer,
                loading: false,
            });
        }
    }



    render() {

        var customer_HTML_TABLE = '';
        if (this.state.loading) {
            customer_HTML_TABLE = <tr className="text-center"><td colSpan="6"><h2>Loading...</h2></td></tr>
        }
        else {
            customer_HTML_TABLE =
                this.state.customer.map((item) => {
                    return (
                        <tr className="text-center" key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.first_name} {item.last_name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone_no}</td>
                            <td>
                                <Link to={'edit-customer/${item.id}'} className="btn btn-primary btn-small mb-2">Edit</Link><br></br>
                                <button type="button" className="btn btn-danger btn-small">Delete</button>
                            </td>
                        </tr>
                    );
                });
        }

        return (
            <div className="container student-div">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            <h4 className="bold">Customer Details
                                <Link to="add-customer" className="btn btn-primary btn-sm float-end">Add Customer</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr className="text-center">
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer_HTML_TABLE}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Student;