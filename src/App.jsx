import './App.css';
import { AddUser } from './components/addUser/AddUser';
import { Pagination } from './components/pagination/Pagination';
import { UsersList } from './components/usersList/UsersList';
import { UsersProvider } from './components/UsersProvider';
import { EditModal } from './components/editModal/EditModal';

function App() {
  return (
    <div className='App'>
      <UsersProvider>
        <AddUser />
        <EditModal />
        <UsersList />
        <Pagination />
      </UsersProvider>
    </div>
  );
}

export default App;
