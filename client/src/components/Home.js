import React, { useEffect, useState } from "react";
import { home } from "../services/axios";
import { useNavigate } from "react-router-dom";
import {
  IoWallet,
  IoGlobeOutline,
  IoCartOutline,
  IoLogoBuffer,
} from "react-icons/io5";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getdata = async () => {
    let data = await home();
    if (data.length) setData(data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="card dashbord-cards">
            <div>
              <b className="text-secondary">Today’s Money</b>
              <h6>
                $53,000 <span className="text-success">+55%</span>
              </h6>
            </div>
            <div className="dashbord-icon">
              <IoWallet size={20} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashbord-cards">
            <div>
              <b className="text-secondary">Today’s Users</b>
              <h6>
                $2,300 <span className="text-success">+5%</span>
              </h6>
            </div>
            <div className="dashbord-icon">
              <IoGlobeOutline size={20} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashbord-cards">
            <div>
              <b className="text-secondary">New Client</b>
              <h6>
                $53,000 <span className="text-danger">-14%</span>
              </h6>
            </div>
            <div className="dashbord-icon">
              <IoLogoBuffer size={20} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashbord-cards">
            <div>
              <b className="text-secondary">Today’s Sales</b>
              <h6>
                $53,000 <span className="text-success">+8%</span>
              </h6>
            </div>
            <div className="dashbord-icon">
              <IoCartOutline size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body ">
          <div className="d-flex align-items-center justify-content-center">
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <th>User</th> <th>Email</th>
                </tr>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{d.username}</td>
                    <td onClick={() => navigate(`/profile/${d.id}`)}>
                      <a href="#">{d.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
