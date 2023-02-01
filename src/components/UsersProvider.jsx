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
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [last, setLast] = useState(12);
  const [userAdd, setUserAdd] = useState(true);

  const [editData, setEditData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editData };
    newFormData[fieldName] = fieldValue;

    setEditData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editID,
      email: editData.email,
      first_name: editData.first_name,
      last_name: editData.last_name,
      avatar: editData.avatar,
    };

    const newContacts = [...users];

    const index = users.findIndex((user) => user.id === editID);

    newContacts[index] = editedContact;

    axios
      .patch(`https://reqres.in/api/users/${editID}`, newContacts)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setUsers(newContacts);

    setEditID(null);
  };

  const handleCancelClick = () => {
    setEditID(null);
  };

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
        })
      );
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentPosts = users.slice(firstPostIndex, lastPostIndex);

  const totalPosts = users.length;

  const removeUser = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // showAlert(true, 'danger', 'item removed');
    setUsers(users.filter((item) => item.id !== id));
  };

  //   const editUser = (id) => {
  //     const specificUser = users.find((item) => item.id === id);
  //     setIsEditing(true);
  //     setEditID(id);
  //     setUsers(specificUser.title);
  //   };

  //   console.log(users[users.length - 1].id);

  const openAddUserMenu = () => setUserAdd(false);

  const closeAddUserMenu = () => setUserAdd(true);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        totalPosts,
        postPerPage,
        setCurrentPage,
        currentPage,
        currentPosts,

        removeUser,
        editID,
        setEditID,
        editData,
        setEditData,
        handleEditClick,
        handleEditFormChange,
        handleEditFormSubmit,
        handleCancelClick,
        userAdd,
        setUserAdd,
        openAddUserMenu,
        closeAddUserMenu,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
