import './AddUser.css';
import axios from 'axios';
import { useState } from 'react';
import { useUsers } from '../../context/UsersProvider';
import { AddUserForm } from '../addUserForm/AddUserForm';

export const AddUser = () => {
  const { users, setUsers, userAdd, setUserAdd } = useUsers();

  const [formData, setFormData] = useState({
    id: NaN,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

  const openAddUserMenu = () => setUserAdd(false);
  const closeAddUserMenu = () => setUserAdd(true);

  const addUserToEnd = (e) => {
    e.preventDefault();

    setUsers((prevUsers) => [
      ...prevUsers,
      { ...formData, id: users[users.length - 1].id + 1 },
    ]);

    axios
      .post('https://reqres.in/api/users', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setUserAdd(true);
    setFormData({
      id: NaN,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    });
  };

  return (
    <div>
      {userAdd ? (
        <button className='open-user-button' onClick={openAddUserMenu}>
          Add User
        </button>
      ) : (
        <AddUserForm
          addUserToEnd={addUserToEnd}
          closeAddUserMenu={closeAddUserMenu}
        />
      )}
    </div>
  );
};
