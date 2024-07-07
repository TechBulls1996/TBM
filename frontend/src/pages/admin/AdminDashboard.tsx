import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  faFileClipboard,
  faLink,
  faNetworkWired,
  faRightLong,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { GetAds } from '../../services/AdServices';
import { API_URL } from '../../helpers/constant';
import { GetDashboardCount } from '../../services/CommanServices';

const AdminDashboard = () => {
  const [ads, setAds]:any = useState([]);
  const [counts, setCounts]:any = useState({
    users:0,
    clients:0,
    ads:0
  });

  const page: number = 1;
  const pageSize: number = 10;

  const handleRequest = () => {
    return GetAds({ page, pageSize}).then((res) => {
      if (res?.status) {
        if (page === 1) {
          setAds(res.data);
        } else {
          setAds([...ads, ...res.data]);
        }
      } 
    });
  };

  useEffect(() => {
    handleRequest();

    //get count data
    GetDashboardCount({}).then((res) => {
      if (res?.status) {
          setCounts(res.data);
      } 
    });

  }, []);

  return (
    <>
      <section className="container container-fluid benefits-section pt-7 pb-7 px-0 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 p-0">
              <AdminSidebar />
            </div>
            <div className="col-sm-9 pt-3">
              <header className=" d-flex align-items-center pb-2">
                <h3 className="title-md">Dashboard</h3>
              </header>

              {/* start listing */}
              <div className="row">
                <>
                  <div className="col-sm-12 mb-5 vital-row">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="card">
                          <div className="text-outer">
                            <h4>Total Client</h4>
                            <h2>
                              {counts.clients} <span>+{counts?.last30Days?.clients || '00' }</span>
                            </h2>
                          </div>
                          <div className="icon">
                            <FontAwesomeIcon icon={faFileClipboard} />
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="card">
                          <div className="text-outer">
                            <h4>Total Users</h4>
                            <h2>
                            {counts.users} <span>+{counts?.last30Days?.users || '00'}</span>
                            </h2>
                          </div>
                          <div className="icon">
                            <FontAwesomeIcon icon={faUsers} />
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="card">
                          <div className="text-outer">
                            <h4>Total Ads</h4>
                            <h2>
                            {counts.ads} <span>+{counts?.last30Days?.ads || '00' }</span>
                            </h2>
                          </div>
                          <div className="icon">
                            <FontAwesomeIcon icon={faNetworkWired} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 mt-5">
                        <div className="card">
                          <div className="head w-100">
                            <h4>History Ads</h4>
                            <p>
                              <FontAwesomeIcon
                                icon={faRightLong}
                                className="text-success"
                              />{' '}
                              Last 30 Day's Records
                            </p>

                            <div className="table-wrap w-100">
                              <table className="table table-responsive">
                                <thead>
                                  <tr>
                                    <td className="head">Sno</td>
                                    <td className="head">Title</td>
                                    <td className="head">Count</td>
                                    <td className="head">City</td>
                                    <td className="head">Tags</td>
                                    <td className="head">Client</td>
                                    <td className="head">Video</td>
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
                                     
                                      <td>{user.client.name}</td>
                                      <td>
                                        <a
                                          href={API_URL + '/' + user.video}
                                          target="_blank"
                                        >
                                          {' '}
                                          <FontAwesomeIcon icon={faLink} />{' '}
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
