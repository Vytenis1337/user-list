import './User.css';
import { useUsers } from '../UsersProvider';
import axios from 'axios';
import { EditModal } from '../editModal/EditModal';

export const User = ({ user }) => {
  const { users, setUsers, handleEditClick, removeUser } = useUsers();

  // const removeUser = (id) => {
  //   setUsers(users.filter((item) => item.id !== id));

  //   // axios.delete(`https://reqres.in/api/users/${id}`);
  // };

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
      <EditModal />
    </div>
  );
};
