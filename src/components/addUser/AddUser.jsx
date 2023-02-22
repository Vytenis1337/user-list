import './AddUser.css';

import axios from 'axios';
import { useEscapeKey } from '../../hooks/useEscKey';
import { useUsers } from '../../context/UsersProvider';
import { AddUserForm } from '../addUserForm/AddUserForm';

export const AddUser = () => {
  const { setUsers, userAdd, setUserAdd, formData, setFormData } = useUsers();

  const openAddUserMenu = () => setUserAdd(false);
  const closeAddUserMenu = () => setUserAdd(true);

  const addUserToBegining = (e) => {
    e.preventDefault();

    axios
      .post('https://reqres.in/api/users', formData)
      .then((res) => {
        const iD = parseInt(res.data.id);

        setUsers((prevUsers) => [{ ...formData, id: iD }, ...prevUsers]);
      })
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

  useEscapeKey(closeAddUserMenu);

  return (
    <div>
      {userAdd ? (
        <button className='open-user-button' onClick={openAddUserMenu}>
          Add User
        </button>
      ) : (
        <AddUserForm
          addUserToBegining={addUserToBegining}
          closeAddUserMenu={closeAddUserMenu}
        />
      )}
    </div>
  );
};
