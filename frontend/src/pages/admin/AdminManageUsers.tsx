import { useEffect, useState, FormEvent } from 'react';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import AdminSidebar from '../../components/admin/AdminSidebar';
import SearchBar from '../../components/common/Search';
import {
  GetUsers,
  UserDelete,
  UserCreate,
} from '../../services/ProfileServices';
import { getErrorMsg } from '../../helpers';
import MyAlert, { InputErrorMessage } from '../../components/common/Alert';
import { MyButton } from '../../components/common/MyButton';
import CountrySelect, {
  CitySelect,
  StateSelect,
} from '../../components/common/AdvanceSelect';

const AdminManageUsers = () => {
  const [id, setId]: any = useState();
  const [email, setEmail]: any = useState('');
  const [password, setPassword]: any = useState('');
  const [fullName, setFullName]: any = useState('');
  const [phone, setPhone]: any = useState('');
  const [gender, setGender]: any = useState('Male');
  const [country, setCountry]: any = useState({
    code: 'IN',
    label: 'India',
    value: 'India',
  });
  const [state, setState]: any = useState('');
  const [city, setCity]: any = useState('');
  const [address, setAddress]: any = useState('');
  const [pinCode, setPinCode]: any = useState('');

  const [users, setUsers]: any = useState([]);
  const [page, setPage]: any = useState(1);
  const [nextPage, setNextPage]: any = useState(true);
  const [errors, setErrors]: any = useState([]);
  const pageSize: number = 10;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [formStatus, setFormStatus] = useState(false);

  const handleClose = () => {
    setShow(false);

    //reset form again
    setId(false);
    setFormStatus(false);
    setEmail('');
    setFullName('');
    setPhone('');
    setPassword('');
    setAddress('');
    setPinCode('');
  };

  const handleShow = () => setShow(true);

  const handleDelete = (id: any) => {
    UserDelete(id).then((res: any) => {
      if (res?.status) {
        //success
        console.log('User Deleted');
        //update users table
        handleRequest();
      } else {
        setErrors(res?.errors);
      }
    });
  };

  const handleUpdate = (user: any) => {
    handleShow();
    setFormStatus(true);
    setId(user._id);
    //set user fileds
    setEmail(user.email);
    setFullName(user.name);
    setPhone(user.mobile);
    setPassword('');
    setState(user.state);
    setCity(user.city);
    setAddress(user.address);
    setPinCode(user.pinCode);
  };

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
    UserCreate({
      id,
      email,
      password,
      fullName,
      phone,
      gender,
      country,
      state,
      city,
      address,
      pinCode,
    }).then((res: any) => {
      if (res?.status) {
        //reset form again
        setId(false);
        setFormStatus(false);
        setShow(false);

        //update users table
        handleRequest();
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

  const globalError = getErrorMsg(errors, 'global');

  return (
    <>
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
                            <SearchBar
                              placeholder="Search Records..."
                              handleSearch={setSearch}
                              search={search}
                            />
                          </div>
                          <div className="col-md-2">
                            <Button variant="dark" onClick={handleShow}>
                              Add user
                            </Button>
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
                            {users?.map((user: any, index: number) => (
                              <tr key={index}>
                                <td> {++index}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.city.value}</td>
                                <td>{user.pinCode}</td>
                                <td>
                                  <ButtonGroup aria-label="User Actions">
                                    <Button
                                      onClick={(e) => handleUpdate(user)}
                                      variant="outline-info"
                                      size="sm"
                                      className="btn-compact"
                                    >
                                      <FontAwesomeIcon icon={faEdit} /> Edit
                                    </Button>
                                    <Button
                                      onClick={(e) => handleDelete(user._id)}
                                      variant="outline-danger"
                                      size="sm"
                                      className="btn-compact"
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />{' '}
                                      Delete
                                    </Button>
                                  </ButtonGroup>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {nextPage && (
                          <div className="col-sm-12 text-center ">
                            <MyButton
                              text="Load More"
                              afterText="Load More"
                              extraclassName="btn btn-dark"
                              extraStyle={{ width: '180px' }}
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
          <Modal.Title>{formStatus ? 'Update' : 'Create'} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row g-3"
            onSubmit={(e) => onRegister(e)}
            method="post"
          >
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'name')}
                alertType="danger"
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
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'email')}
                alertType="danger"
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
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'mobile')}
                alertType="danger"
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'password')}
                alertType="danger"
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
              <InputErrorMessage
                message={getErrorMsg(errors, 'gender')}
                alertType="danger"
              />
            </div>
            <div className="col-md-6">
              <CountrySelect
                name="country"
                id="country"
                defaultValue={country}
                onChange={(e: any) => setCountry(e)}
                placeholder="Select Country"
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'country')}
                alertType="danger"
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
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'state')}
                alertType="danger"
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
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'city')}
                alertType="danger"
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
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'address')}
                alertType="danger"
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
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'pinCode')}
                alertType="danger"
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {formStatus ? 'Update' : 'Create'} user
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AdminManageUsers;
