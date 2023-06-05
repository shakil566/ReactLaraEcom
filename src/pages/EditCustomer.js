import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useParams, useNavigate, Link } from "react-router-dom";


function EditCustomer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);
    const [photo, setPhoto] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }


    const updateCustomer = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('first_name', inputs.first_name);
        formData.append('last_name', inputs.last_name);
        formData.append('email', inputs.email);
        formData.append('phone_no', inputs.phone_no);
        formData.append('photo', photo);
        formData.append('username', inputs.username);
        formData.append('password', inputs.password);

        const response = await axios.post(process.env.REACT_APP_API_URL + "/api/customer-update/" + id, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        });
        if (response.data.status === 200) {
            swal({
                title: "Updated!",
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
        } else {
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
        await updateCustomer();

    }

    useEffect(() => {
        getCustomer();
    }, []);

    function getCustomer() {
        axios.get(process.env.REACT_APP_API_URL + '/api/customer-edit/' + id).then(function (response) {
            console.log(response);
            setInputs(response.data.customer);
        });
    }
    return (
        <React.Fragment>
            <div className="container customer-div">
                <div className="row">
                    <div className="col-md-7 div-center">
                        <div className="card-header">
                            <h4 className="bold">Update Customer
                                <Link to="/customer" className="btn btn-primary btn-sm float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label>
                                        First Name:
                                    </label>
                                    <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Last Name:
                                    </label>
                                    <input type="text" name="last_name" value={inputs.last_name} onChange={handleChange} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Email:
                                    </label>
                                    <input type="text" name="email" value={inputs.email} onChange={handleChange} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Photo:
                                    </label>
                                    <br></br>
                                    {
                                        inputs.photo == null ?
                                            <img src={process.env.REACT_APP_API_URL + `/public/img/no_image.png`} alt="" height={200} width={200} />
                                            : <img src={process.env.REACT_APP_API_URL + `/public/uploads/user/${inputs.photo}`}
                                                alt="" height={200} width={200} />

                                    }
                                    <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />

                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Phone:
                                    </label>
                                    <input type="text" name="phone_no" value={inputs.phone_no} onChange={handleChange} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Username:
                                    </label>
                                    <input type="text" name="username" value={inputs.username} onChange={handleChange} className="form-control" ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>
                                        Password:
                                    </label>
                                    <input type="password" name="password" value={inputs.password} onChange={handleChange} className="form-control" ></input>
                                </div>

                                <div className="form-group mb-3">
                                    <button type="submit" id="updateCustomerBtn" className="btn btn-info">Update</button>
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

export default EditCustomer;