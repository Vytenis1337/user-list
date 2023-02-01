import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UsersContext = createContext();

export function useUsers() {
  return useContext(UsersContext);
}

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: NaN,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [editID, setEditID] = useState(null);

  const [userAdd, setUserAdd] = useState(true);

  const [editData, setEditData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

  useEffect(() => {
    axios
      .all([
        axios.get('https://reqres.in/api/users?page=1'),
        axios.get('https://reqres.in/api/users?page=2'),
      ])
      .then(
        axios.spread((...allData) => {
          const arrOne = allData[0].data.data;
          const arrtwo = allData[1].data.data;

          const concatArray = arrOne.concat(arrtwo);

          setUsers(concatArray);
          setLoading(false);
        })
      );
  }, []);

  const lastUserIndex = currentPage * 6;
  const firstUSerIndex = lastUserIndex - 6;

  const currentUsers = users.slice(firstUSerIndex, lastUserIndex);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        loading,
        setCurrentPage,
        currentPage,
        currentUsers,
        editID,
        setEditID,
        editData,
        setEditData,
        userAdd,
        setUserAdd,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
