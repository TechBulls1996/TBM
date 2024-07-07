import { useEffect, useState, FormEvent } from 'react';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import AdminSidebar from '../../components/admin/AdminSidebar';
import SearchBar from '../../components/common/Search';
import { getErrorMsg } from '../../helpers';
import MyAlert, { InputErrorMessage } from '../../components/common/Alert';
import { MyButton } from '../../components/common/MyButton';
import { DeleteClient, CreateClient, GetClients } from '../../services/ManageClientServices';

const AdminManageClients = () => {
  const [id, setId]: any = useState();
  const [email, setEmail]: any = useState('');
  const [fullName, setFullName]: any = useState('');
  const [phone, setPhone]: any = useState('');
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
    setAddress('');
    setPinCode('');
  };

  const handleShow = () => setShow(true);

  const handleDelete = (id: any) => {
    GetClients(id).then((res: any) => {
      if (res?.status) {
        //success
        console.log('client Deleted');
        //update users table
        handleRequest();
      } else {
        setErrors(res?.errors);
      }
    });
  };

  const handleUpdate = (client: any) => {
    handleShow();
    setFormStatus(true);
    setId(client._id);

    //set client fileds
    setEmail(client.email);
    setFullName(client.name);
    setPhone(client.mobile);
    setAddress(client.address);
    setPinCode(client.pinCode);
  };

  const handleRequest = () => {
    return GetClients({ page, pageSize, search }).then((res) => {
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
    CreateClient({
      id,
      email,
      fullName,
      phone,
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
                            <label className="form-label">
                              Manage Clients:
                            </label>
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
                              Add Client
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
                              {/* <td className="head">Pincode</td> */}
                              <td className="head"></td>
                            </tr>
                          </thead>
                          <tbody>
                            {users?.map((client: any, index: number) => (
                              <tr key={index}>
                                <td> {++index}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.mobile}</td>
                                <td>{client.address}</td>
                                {/* <td>{client.pinCode}</td> */}
                                <td>
                                  <ButtonGroup aria-label="client Actions">
                                    <Button
                                      onClick={(e) => handleUpdate(client)}
                                      variant="outline-info"
                                      size="sm"
                                      className="btn-compact"
                                    >
                                      <FontAwesomeIcon icon={faEdit} /> Edit
                                    </Button>
                                    <Button
                                      onClick={(e) => handleDelete(client._id)}
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

      {/* Create client Modal */}
      <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>{formStatus ? 'Update' : 'Create'} Client</Modal.Title>
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
                id="phone"
                name="phone"
                placeholder="Enter phone no."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'phone')}
                alertType="danger"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'address')}
                alertType="danger"
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {formStatus ? 'Update' : 'Create'} Client
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AdminManageClients;
