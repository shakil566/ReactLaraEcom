import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


function AddCustomer() {
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhone] = useState('');
    const [photo, setPhoto] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const saveCustomer = async () => {
        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('phone_no', phone_no);
        formData.append('photo', photo);
        formData.append('username', username);
        formData.append('password', password);
        const response = await axios.post(process.env.REACT_APP_API_URL + "/api/customer-create", formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        });
        // const response = await axios.post(process.env.REACT_APP_API_URL + "/api/customer-create", formData , {
        //     headers: {
        //         'Content-Type': "multipart/form-data",
        //         'type': 'Application/Json',
        //         'self_url': process.env.REACT_APP_API_SELF_URL,
        //         'client_url': process.env.REACT_APP_API_CLIENT_URL,
        //         'secret_key': process.env.REACT_APP_SECRET_KEY,
        //     },
        // });
        
        if (response.data.status === 200) {
            swal({
                title: "Created!",
                text: response.data.message,
                icon: "success",
                button: "Ok!",
            });

            console.log(response)
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
        } else if (response.data.status === 419) {
            swal({
                title: "Something wrong here!",
                text: response.data.message,
                icon: "error",
                button: "Ok!",
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveCustomer();

    }
    return (
        <React.Fragment>
            <div className="container customer-div">
                <div className="row">
                    <div className="col-md-7 div-center">
                        <div className="card-header">
                            <h4 className="bold">Add Customer
                                <Link to="/customer" className="btn btn-primary btn-sm float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label>
                                        First Name:
                                    </label>
                                    <input type="text" name="first_name" onChange={(e) => setFirstName(e.target.value)} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Last Name:
                                    </label>
                                    <input type="text" name="last_name" onChange={(e) => setLastName(e.target.value)} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Email:
                                    </label>
                                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Photo:
                                    </label>
                                    <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Phone:
                                    </label>
                                    <input type="text" name="phone_no" onChange={(e) => setPhone(e.target.value)} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Username:
                                    </label>
                                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Password:
                                    </label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" ></input>
                                </div>

                                <div className="form-group mb-3">
                                    <button type="submit" id="saveCustomerBtn" className="btn btn-info">Save</button>
                                    <Link to="/customer" className="btn btn-danger margin-left-10">Cancel</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddCustomer;