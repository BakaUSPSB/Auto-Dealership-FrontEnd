import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import adminUsers from "../services/adminUsersService";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await adminUsers.getUsers(); // Replace with your actual API call
      setUsers(response.data.users);
    };

    fetchUsers();
  }, []);
  const roleMap = {
    1: "Admin",
    2: "Manager",
    3: "Technician",
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) &&
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{roleMap[user.role_id]}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ViewUsers;
