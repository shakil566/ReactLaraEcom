import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


class AddStudent extends Component {

    state = {
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone_no': '',
        'username': '',
        'password': '',
    }

    handleInput = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveStudent = async (e) => {

        e.preventDefault();

        document.getElementById('saveStudentBtn').innerText = 'Saving';
        document.getElementById('saveStudentBtn').disabled = true;

        const res = await axios.post('http://localhost:8080/LaravelProjectDemoAdminLte/api/customer-create', this.state);
        if (res.data.status === 200) {
            document.getElementById('saveStudentBtn').innerText = 'Save';
            document.getElementById('saveStudentBtn').disabled = false;
            
            // redirect to /home

            // console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
            

            //for null input field after data insert
            this.setState({
                'first_name': '',
                'last_name': '',
                'email': '',
                'phone_no': '',
                'username': '',
                'password': '',
            });

        } else if (res.data.status === 402) {
            // console.log(res.data.message);
            swal({
                title: "Something wrong here!",
                text: res.data.message,
                icon: "error",
                button: "Ok!",
            });
        } else {
            // console.log('Something wrong here');
            swal({
                title: "Something wrong here!",
                text: res.data.message,
                icon: "error",
                button: "Ok!",
            });
        }
    }

    render() {
        return (
            <div className="container student-div">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card-header">
                            <h4 className="bold">Add Customer
                                <Link to="/" className="btn btn-primary btn-sm float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.saveStudent}>
                                <div className="form-group mb-3">
                                    <label>
                                        First Name:
                                    </label>
                                    <input type="text" name="first_name" onChange={this.handleInput} value={this.state.first_name} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Last Name:
                                    </label>
                                    <input type="text" name="last_name" onChange={this.handleInput} value={this.state.last_name} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Email:
                                    </label>
                                    <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Phone:
                                    </label>
                                    <input type="text" name="phone_no" onChange={this.handleInput} value={this.state.phone_no} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Username:
                                    </label>
                                    <input type="text" name="username" onChange={this.handleInput} value={this.state.username} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Password:
                                    </label>
                                    <input type="password" name="password" onChange={this.handleInput} value={this.state.password} className="form-control" ></input>
                                </div>

                                <div className="form-group mb-3">
                                    <button type="submit" id="saveStudentBtn" className="btn btn-info">Save</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStudent;