import './UsersList.css';
import { User } from '../user/User';
import { useUsers } from '../UsersProvider';

export const UsersList = () => {
  const { currentPosts } = useUsers();
  return (
    <div className='users-list'>
      {currentPosts.map((user) => {
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
};
