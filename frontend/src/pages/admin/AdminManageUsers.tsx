import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import SearchBar from "../../components/common/Search";
import { GetUsers } from "../../services/user/ProfileServices";
import { getErrorMsg } from "../../helpers";
import MyAlert from "../../components/common/Alert";
import { MyButton } from "../../components/common/MyButton";

const AdminManageUsers = () => {
  //const [modalStatus, setModalStatus] = useState(false);
  const [users, setUsers]: any = useState([]);
  const [page, setPage]: any = useState(1);
  const [nextPage, setNextPage]: any = useState(true);
  const [errors, setErrors]: any = useState([]);
  const pageSize:number = 10;

  const handleRequest = () => {
      return GetUsers({ page, pageSize }).then((res) => {
        if (res?.status) {
          if (page === 1) {
            setUsers(res.data);
          } else {
            setUsers([...users, ...res.data]);
          }

          setNextPage(res.pagination.nextPage);
          if (res.pagination.nextPage) {
            setPage(page + 1);
          }
        } else {
          setErrors(res?.errors);
          return false;
        }
      });
    };

    useEffect(() => {
      handleRequest();
    }, [page]);

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
                                <SearchBar placeholder="Search Records..." />
                            </div>
                            
                            <div className="col-md-2">
                                <button className="btn btn-dark">Add User</button>
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
                              <td className="head">Record</td>
                              <td className="head">First</td>
                              <td className="head">Last</td>
                              <td className="head">Handle</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>1</td>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td colSpan={2}>Larry the Bird</td>
                              <td>@twitter</td>
                            </tr>
                        </tbody>
                        
                      </table>
                         {nextPage && (
                                  <div className="col-sm-12 text-center ">
                                    <MyButton
                                      text="Load More"
                                      afterText="Load More"
                                      extraClass="btn btn-dark"
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
  </>)
}

export default AdminManageUsers;