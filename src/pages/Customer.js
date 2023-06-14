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
    const [isLoading, setIsLoading] = useState(true);

    //get data with axios
    const getCustomer = async () => {
        axios.post(process.env.REACT_APP_API_URL + "/api/customer", {
            headers: {
                'type': 'Application/Json',
                'self_url': process.env.REACT_APP_API_SELF_URL,
                'client_url': process.env.REACT_APP_API_CLIENT_URL,
                'secret_key': process.env.REACT_APP_SECRET_KEY,
            }
        })
            .then((response) => {
                if (response.data.status == 200) {
                    const data = response.data.customer;
                    setCustomer(data)
                    setIsLoading(false);
                } else if (response.data.status == 419) {
                    const data = [];
                    setCustomer(data)
                    setIsLoading(true);
                    console.log(response.data.message)
                }
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    useEffect(() => {
        getCustomer();
    }, []);


    const deleteCustomer = async (e, id) => {
        const thisClickDelete = e.currentTarget;
        e.preventDefault();
        swal({
            buttons: {
                cancel: true,
                confirm: true,
            },
            title: "Are you sure?",
            text: "You want to delete?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(process.env.REACT_APP_API_URL + '/api/customer-delete/' + id, {
                        headers: {
                            'type': 'Application/Json',
                            'self_url': process.env.REACT_APP_API_SELF_URL,
                            'client_url': process.env.REACT_APP_API_CLIENT_URL,
                            'secret_key': process.env.REACT_APP_SECRET_KEY,
                        }
                    }).then(function (response) {
                        // console.log(response.data.message);
                        if (response.data.status === 200) {
                            thisClickDelete.closest("tr").remove();
                            swal({
                                title: "Deleted!",
                                text: response.data.message,
                                icon: "success",
                                button: "Ok!",
                            });

                            // console.log(response)
                            setTimeout(() => {
                                navigate('/customer');
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
            });
    }


    var customer_HTML_TABLE = '';
    if (isLoading) {
        customer_HTML_TABLE = <tr className="text-center"><td colSpan="7"><h2>Loading...</h2></td></tr>
    }
    else {
        customer_HTML_TABLE =
            customer.map((data, index) => (
                <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{data.first_name} {data.last_name}</td>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>{data.phone_no}</td>
                    <td>
                        {
                            data.photo == null ?
                                <img src={process.env.REACT_APP_API_URL + `/public/img/no_image.png`} alt="" height={50} width={90} />
                                : <img src={process.env.REACT_APP_API_URL + `/public/uploads/user/${data.photo}`} alt="" height={50} width={90} />

                        }
                    </td>
                    <td>
                        <Link to={`/customer/${data.id}/edit`} className="btn btn-primary btn-small margin-right-10" title="Edit">
                            <i className="fa fa-edit"></i>
                        </Link>
                        {/* <button onClick={() => deleteCustomer(data.id)} className="btn btn-danger btn-small" title="Delete">
                                <i className="fa fa-trash"></i>
                            </button> */}
                        <button onClick={(e) => deleteCustomer(e, data.id)} className="btn btn-danger btn-small" title="Delete">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            ))
    }

    return (
        <React.Fragment>
            <div className="container  margin-top-10">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            <h4 className="bold">Customer Details
                                <Link to="/add-customer" className="btn btn-primary btn-sm float-end">Add Customer</Link>
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
                                    {customer_HTML_TABLE}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Customer;