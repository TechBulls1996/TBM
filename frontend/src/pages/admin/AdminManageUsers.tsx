import { useEffect, useState ,FormEvent} from "react";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";

import AdminSidebar from "../../components/admin/AdminSidebar";
import SearchBar from "../../components/common/Search";
import { GetUsers } from "../../services/user/ProfileServices";
import { getErrorMsg } from "../../helpers";
import MyAlert from "../../components/common/Alert";
import { MyButton } from "../../components/common/MyButton";
import { UserRegister } from "../../services/AuthServices";
import { setAllState } from "../../app/authActions";
import {setAuthCookie } from "../../helpers"
import CountrySelect, {
  CitySelect,
  StateSelect,
} from "../../components/common/AdvanceSelect";


const AdminManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [fullName, setFullName]: any = useState("");
  const [confirmPass, setConfirmPass]: any = useState("");
  const [phone, setPhone]: any = useState("");
  const [dob, setDob]: any = useState("");
  const [gender, setGender]: any = useState("");
  const [country, setCountry]: any = useState({
    code: "IN",
    label: "India",
    value: "India",
  });
  const [state, setState]: any = useState("");
  const [city, setCity]: any = useState("");
  const [address, setAddress]: any = useState("");
  const [pinCode, setPinCode]: any = useState("");

  const [users, setUsers]: any = useState([]);
  const [page, setPage]: any = useState(1);
  const [nextPage, setNextPage]: any = useState(true);
  const [errors, setErrors]: any = useState([]);
  const pageSize:number = 10;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  

  const handleRequest = () => {
      return GetUsers({ page, pageSize, search }).then((res) => {
        if (res?.status) {
          if (page === 1) {
            setUsers(res.data);
          } else {
            setUsers([...users, ...res.data]);
          }

          setNextPage(res.nextPage);
          if (res.nextPage) {
            setPage(page + 1);
          }
        } else {
          setErrors(res?.errors);
          return false;
        }
      });
    };
  
  const onRegister = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      UserRegister({
        email,
        password,
        confirmPass,
        fullName,
        phone,
        dob,
        gender,
        country,
        state,
        city,
        address,
        pinCode,
      }).then((res) => {
        if (res?.status) {
          //success
          dispatch(
            setAllState({
              loginTime: moment(),
              authStatus: true,
              user: res?.user,
            })
          );
          
          setAuthCookie(res?.token);
          navigate("/user");
        } else {
          setErrors(res?.errors);
        }
      });
     
    };

    useEffect(() => {
      handleRequest();
    }, [page]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        handleRequest();
      }, 500);
      return () => clearTimeout(timeoutId);
    }, [search]);

    const globalError = getErrorMsg(errors, "global");
    
    return (<>
        <section className="container container-fluid benefits-section pt-7 pb-7 px-0 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 p-0">
              <AdminSidebar />
            </div>
            <div className="col-sm-9">
              <div className="row vital-row">
                <div className="col-sm-12 mt-2">
                  <div className="card">
                    <div className="head w-100">    
                      <div className="detailcheck-sec">
                        <div className="row">
                            <div className="col-sm-12">
                                <label className="form-label">Manage Users:</label>
                            </div>
                            <div className="col-md-10 mb-4 d-flex">
                                <SearchBar placeholder="Search Records..." handleSearch={setSearch} search={search}/>
                            </div>
                            <div className="col-md-2">
                               <Button variant="dark" onClick={handleShow}>Add user</Button>
                            </div>
                        </div>
                      </div> 

                    {globalError?.length > 0 && (
                      <MyAlert message={globalError} alertType="danger" />
                    )}  
                    <div className="table-wrap w-100">
                      <table className="table table-responsive">
                        <thead>
                            <tr>
                              <td className="head">Sno</td>
                              <td className="head">Name</td>
                              <td className="head">Email</td>
                              <td className="head">Mobile</td>
                              <td className="head">Address</td>
                              <td className="head">Pincode</td>
                              <td className="head"></td>
                            </tr>
                        </thead>
                        <tbody>
                          { users?.map((user: any, index: number) => 
                            <>
                            <tr>
                              <td> { ++index }</td>
                              <td>{ user.name }</td>
                              <td>{ user.email }</td>
                              <td>{ user.mobile }</td>
                              <td>{ user.city.value }</td>
                              <td>{ user.pinCode }</td>
                              <td>
                              <ButtonGroup aria-label="User Actions">
                                <Button variant="outline-info" size="sm" className="btn-compact" >
                                  <FontAwesomeIcon icon={faEdit} /> Edit
                                </Button>
                                <Button variant="outline-danger" size="sm" className="btn-compact">
                                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                </Button>
                              </ButtonGroup>
                              </td>
                              
                            </tr>
                            
                            </>
                            )}
                        </tbody>
                        
                      </table>
                         {nextPage && (
                                  <div className="col-sm-12 text-center ">
                                    <MyButton
                                      text="Load More"
                                      afterText="Load More"
                                      extraclassName="btn btn-dark"
                                      extraStyle={{ width: "180px" }}
                                      onClick={(e: any) => handleRequest()}
                                    />
                                  </div>
                                )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </section>

    {/* Create User Modal */}
    <Modal show={show} onHide={handleClose} size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body> 
      <form className="row g-3" onSubmit={(e) => onRegister(e)} method="post">
                      <div className="col-md-6">
                        <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Enter Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                      />
                                      </div>
                      <div className="col-md-6">
                      <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                      />
                      </div>
                      <div className="col-md-6">
                      <input
                                        type=""
                                        className="form-control"
                                        id="number"
                                        name="number"
                                        placeholder="Enter phone no."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                      />
                      </div>
                      <div className="col-md-6">
                      <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                      />
                      </div>
                      <div className="col-md-6">
                     
                        <select
                                        className="form-control"
                                        name="gender"
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                      >
                                        <option value="" disabled={true}>
                                          Select Gender
                                        </option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                      </select>
                      </div>
                      <div className="col-md-6">
                      
                      <CountrySelect
                                        name="country"
                                        id="country"
                                        defaultValue={country}
                                        onChange={(e: any) => setCountry(e)}
                                        placeholder="Select Country"
                                      />
                      </div>
                      <div className="col-md-6">
                      <StateSelect
                                        name="state"
                                        id="state"
                                        country={country}
                                        defaultValue={state}
                                        onChange={(e: any) => setState(e)}
                                        placeholder="Select State"
                                        required
                                      />
                      </div>
                      <div className="col-md-6">
                      <CitySelect
                                        name="state"
                                        id="state"
                                        state={state}
                                        defaultValue={city}
                                        onChange={(e: any) => setCity(e)}
                                        placeholder="Select City"
                                      required
                                      />
                      </div>
                      <div className="col-md-6">
                      <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        placeholder="Local Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                      />
                      </div>
                      <div className="col-md-6">
                      <input
                                        type="number"
                                        className="form-control"
                                        id="pincode"
                                        name="pincode"
                                        placeholder="Pin Code"
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value)}
                          required
                          />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary" >Create user</button>
                      </div>
                    </form>
      </Modal.Body>
    </Modal>
  </>)
}
export default AdminManageUsers