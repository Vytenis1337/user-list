import './UsersList.css';
import { User } from '../user/User';
import { useUsers } from '../../context/UsersProvider';
import { Loading } from '../loading/Loading';

export const UsersList = () => {
  const { currentUsers, loading } = useUsers();
  return (
    <div className='users-list'>
      {loading && <Loading />}
      {currentUsers?.map((user) => {
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
};
