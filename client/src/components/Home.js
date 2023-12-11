import React, { useEffect, useState } from "react";
import { home } from "../services/axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getdata = async () => {
    let res = await home();
    if (res.data.length) setData(res?.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  console.log(data);
  return (
    <>
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
    </>
  );
}

export default Home;
