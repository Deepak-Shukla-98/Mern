import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  let userId = useParams();
  console.log(userId);
  const getProfiledata = async () => {
    let res = await getProfile(userId);
    setData(res.data);
  };
  const updateProfiledata = async () => {
    setEdit(false);
    let res = await updateProfile({ id: userId.id, data });
    setData(res.data);
  };
  useEffect(() => {
    getProfiledata();
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <th>User</th>
                  {edit ? (
                    <td>
                      <input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={(e) => {
                          setData((d) => ({ ...d, username: e.target.value }));
                        }}
                      />
                    </td>
                  ) : (
                    <td>{data?.username}</td>
                  )}
                </tr>
                <tr>
                  <th>Email</th>
                  {edit ? (
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={(e) => {
                          setData((d) => ({ ...d, email: e.target.value }));
                        }}
                      />
                    </td>
                  ) : (
                    <td>{data?.email}</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button
            className="btn btn-primary mx-2"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary"
            onClick={() => updateProfiledata()}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
