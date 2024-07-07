import { useEffect, useState, FormEvent } from 'react';
import { Button, Modal, ButtonGroup, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLink, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from '../../components/admin/AdminSidebar';
import SearchBar from '../../components/common/Search';
import { GetAds, DeleteAd, CreateAd } from '../../services/AdServices';
import { getErrorMsg } from '../../helpers';
import MyAlert, { InputErrorMessage } from '../../components/common/Alert';
import { MyButton } from '../../components/common/MyButton';
import CountrySelect, {
  CitySelect,
  StateSelect,
} from '../../components/common/AdvanceSelect';
import { GetClients } from '../../services/ManageClientServices';
import Select from 'react-select';
import { API_URL } from '../../helpers/constant';

const AdminManageAds = () => {
  const [id, setId]: any = useState();
  const [client, setClient]: any = useState('');
  const [video, setVideo]: any = useState('');
  const [tags, setTags]: any = useState('');
  const [title, setTitle]: any = useState('');
  const [count, setCount]: any = useState('');
  const [country, setCountry]: any = useState({
    code: 'IN',
    label: 'India',
    value: 'India',
  });
  const [state, setState]: any = useState({
    value: 'Haryana',
    label: 'Haryana',
    countryCode: 'IN',
    code: 'HR',
  });
  const [city, setCity]: any = useState({
    value: 'Palwal',
    label: 'Palwal',
    countryCode: 'IN',
    stateCode:'HR'
  });
  const [pincode, setPincode]: any = useState('');

  const [ads, setAds]: any = useState([]);
  const [clients, setClients]: any = useState([]);
  const [page, setPage]: any = useState(1);
  const [nextPage, setNextPage]: any = useState(true);
  const [errors, setErrors]: any = useState([]);
  const pageSize: number = 10;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [formStatus, setFormStatus] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getClientData = async () => {
    const getClients = await GetClients({ page: 1, pageSize: 500, search: '' });
    setClients(
      getClients.data.map((client: any) => ({
        value: client._id,
        label: client.name,
      }))
    );
  };

  const handleClose = () => {
    setShow(false);

    // reset form
    setId(false);
    setFormStatus(false);
    setClient('');
    setTitle('');
    setTags('');
    setVideo('');
    setUploadProgress(0);
  };

  const handleShow = () => setShow(true);

  const handleDelete = (id: any) => {
    DeleteAd(id).then((res: any) => {
      if (res?.status) {
        console.log('Ad Deleted');
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

    // set user fields
    setClient({ label: user.client.name, value: user.client._id });
    setTitle(user.title);
    setTags(user.tags);
    setState(user.country);
    setState(user.state);
    setCity(user.city);
    setPincode(user.pincode);
    setCount(user.ad_count_per_day);
  };

  const handleRequest = () => {
    return GetAds({ page, pageSize, search }).then((res) => {
      if (res?.status) {
        if (page === 1) {
          setAds(res.data);
        } else {
          setAds([...ads, ...res.data]);
        }

        setNextPage(res.nextPage);
        if (res.nextPage) {
          setPage(page + 1);
        }
      } else {
        setErrors(res?.errors);
      }
    });
  };

  const onRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('client', client.value);
    formData.append('title', title);
    formData.append('video', video);
    formData.append('country', JSON.stringify(country));
    formData.append('state', JSON.stringify(state));
    formData.append('city', JSON.stringify(city));
    formData.append('pincode', pincode);
    formData.append('tags', tags);
    formData.append('count', count);

    CreateAd(formData, (progressEvent: any) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(percentCompleted);
    }).then((res: any) => {
      if (res?.status) {
        handleClose();
        handleRequest();
      } else {
        console.log(res);
        setErrors(res?.errors);
      }
    });
  };

  useEffect(() => {
    handleRequest();
    getClientData();
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
      <section className="container container-fluid benefits-section pt-7 pb-7 px-0">
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
                            <label className="form-label">Manage Ads:</label>
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
                              Create Ad
                            </Button>
                          </div>
                        </div>
                      </div>

                      {globalError?.length > 0 && (
                        <MyAlert message={globalError} alertType="danger" />
                      )}
                      <div className="table-wrap w-100">
                        <table
                          className="table table-responsive"
                          style={{ overflowY: 'scroll' }}
                        >
                          <thead>
                            <tr>
                              <td className="head">Sno</td>
                              <td className="head">Title</td>
                              <td className="head">Count</td>
                              <td className="head">City</td>
                              <td className="head">Tags</td>
                              <td className="head">Video</td>
                              <td className="head">Client</td>
                              <td className="head"></td>
                            </tr>
                          </thead>
                          <tbody>
                            {ads?.map((user: any, index: number) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.title}</td>
                                <td>{user.ad_count_per_day}</td>
                                <td>
                                  {user.city.value +
                                    ', ' +
                                    user.state.value +
                                    ', ' +
                                    user.country.code +
                                    ' - ' +
                                    user.pincode}
                                </td>
                                <td>
                                  <code>{user.tags}</code>
                                </td>
                                <td>
                                  <a
                                    href={API_URL + '/' + user.video}
                                    target="_blank"
                                  >
                                    {' '}
                                    <FontAwesomeIcon icon={faLink} />{' '}
                                  </a>
                                </td>
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
                          <div className="col-sm-12 text-center">
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

      <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>{formStatus ? 'Update' : 'Create'} Ads</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {globalError?.length > 0 && (
              <MyAlert message={globalError} alertType="danger" />
            )}
          <form
            className="row g-3"
            onSubmit={(e) => onRegister(e)}
            method="post"
          >
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter Ad Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'title')}
                alertType="danger"
              />
            </div>
            <div className="col-md-6">
              <Select
                options={clients}
                name="client"
                id="client"
                defaultValue={client}
                onChange={(e: any) => setClient(e)}
                placeholder="Select Client"
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'client')}
                alertType="danger"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                id="count"
                name="count"
                placeholder="Enter Ad run count per day"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'count')}
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
                name="city"
                id="city"
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
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                id="pincode"
                name="pincode"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'pincode')}
                alertType="danger"
              />
            </div>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Add Tags like: Palwal, Faridabad, Hodal etc"
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'tags')}
                alertType="danger"
              />
            </div>
            <div className="col-md-6">
              <label>Select Video </label>
              <input
                type="file"
                className="form-control"
                id="video"
                name="video"
                onChange={(e) => setVideo(e?.target?.files?.[0])}
              />
              <InputErrorMessage
                message={getErrorMsg(errors, 'video')}
                alertType="danger"
              />
            </div>
            <div className="col-md-12 pb-3">
              {uploadProgress > 0 && (
                <ProgressBar
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  animated
                />
              )}
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {formStatus ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminManageAds;
