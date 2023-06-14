import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useParams, useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

function ProductPurchase() {
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
    // const response ='';
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
    // axios.get(process.env.REACT_APP_API_URL + '/api/customer-edit/' + id).then(function (response) {
    //     console.log(response);
    //     setInputs(response.data.customer);
    // });
  }
  return (
    <React.Fragment>
      <div className="container customer-div mb-3">
        <h3 className="text-bold text-center  mb-3 margin-top-10">Purchase Product</h3>

        <label>
          <span className="text-bold mb-3">Date</span>
          <input type="date" name="date" value={inputs.date} onChange={handleChange} className="form-control mb-3" ></input>
        </label>

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Product Name<span className="text-danger">*</span></th>
              <th>Stock Qty</th>
              <th>Qty<span className="text-danger">*</span></th>
              <th>U/M</th>
              <th>Price<span className="text-danger">*</span></th>
              <th>Disc</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select className="form-control text-center" name="selectedFruit">
                  <option value="apple">Apple Khabo Khabo</option>
                  <option value="banana">Banana Khabo Khabo</option>
                  <option value="orange">Orange Khabo Khabo</option>
                </select>
                {/* <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input> */}
              </td>
              <td>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td>
                <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td>
                <button type="submit" id="updateCustomerBtn" className="btn btn-danger">
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" id="addProductBtn" className="btn btn-info">
                  Add New Product
                </button>
              </td>
              <td className="text-right text-bold" colSpan={5}>Grand Total</td>
              <td className="text-right">
                <input type="text" name="grand_total" value={'0.00'} onChange={handleChange} className="form-control text-right" ></input>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <div className="form-group mb-3">
          <button type="submit" id="submitBtn" className="btn btn-primary">Submit</button>
          <button type="submit" id="submitAnotherBtn" className="btn btn-success  margin-left-10">Submit and Another</button>
        </div>

      </div>
    </React.Fragment>
  );
}

export default ProductPurchase;