import './User.css';
import { useUsers } from '../../context/UsersProvider';
import axios from 'axios';

export const User = ({ user }) => {
  const { setUsers, users, setEditID, setEditData } = useUsers();

  const removeUser = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setUsers(users.filter((item) => item.id !== id));
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditID(user.id);

    const formValues = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };

    setEditData(formValues);
  };
  return (
    <div className='user-container'>
      <img className='user-image' src={user.avatar} alt={user.first_name} />
      <h3 className='user-name'>
        {user.first_name} <span>{user.last_name}</span>{' '}
      </h3>
      <h4 className='user-email'>{user.email}</h4>
      <button
        className='user-edit-button'
        onClick={(event) => handleEditClick(event, user)}
      >
        Edit
      </button>
      <button
        className='user-remove-button'
        onClick={() => removeUser(user.id)}
      >
        Delete
      </button>
    </div>
  );
};
