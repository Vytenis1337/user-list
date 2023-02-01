import './UsersList.css';
import { User } from '../user/User';
import { useUsers } from '../../context/UsersProvider';

export const UsersList = () => {
  const { currentUsers } = useUsers();
  return (
    <div className='users-list'>
      {currentUsers.map((user) => {
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
};
