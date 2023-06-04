import React, { Component, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Customer() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        const getCustomer = () => {
            fetch("http://localhost:8080/LaravelProjectDemoAdminLte/api/customer")
                .then(res => { return res.json() })
                .then(response => {
                    setCustomer(response.customer)
                })
                .catch(error => { console.log(error) });
        }
        getCustomer();
    }, []);


    const deleteCustomer = (id) => {
        axios.delete('http://localhost:8080/LaravelProjectDemoAdminLte/api/customer-delete/' + id).then(function (response) {
            // console.log(response.data.message);
            if (response.data.status === 200) {
                swal({
                    title: "Deleted!",
                    text: response.data.message,
                    icon: "success",
                    button: "Ok!",
                });

                console.log(response)
                setTimeout(() => {
                    navigate('/');
                }, 2000);

            } else if (response.data.status === 402) {
                swal({
                    title: "Something wrong here!",
                    text: response.data.message,
                    icon: "error",
                    button: "Ok!",
                });
            } else {
                swal({
                    title: "Something wrong here!",
                    text: response.data.message,
                    icon: "error",
                    button: "Ok!",
                });
            }
        });
    }

    return (
        <React.Fragment>
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
                                        <th>Photo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customer.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1} </td>
                                                <td>{data.first_name} {data.last_name}</td>
                                                <td>{data.username}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone_no}</td>
                                                <td>
                                                    <img src={`http://localhost:8080/LaravelProjectDemoAdminLte/public/uploads/user/${data.photo}`} alt="" height={50} width={90} /></td>
                                                <td>
                                                    <Link to={`/customer/${data.id}/edit`} className="btn btn-primary btn-small margin-right-10" title="Edit">
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                    <button onClick={() => deleteCustomer(data.id)} className="btn btn-danger btn-small" title="Delete">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Customer;