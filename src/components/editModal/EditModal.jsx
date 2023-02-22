import './EditModal.css';
import axios from 'axios';
import { useUsers } from '../../context/UsersProvider';
import { useEscapeKey } from '../../hooks/useEscKey';
import { EditModalForm } from '../editModalForm/EditModalForm';

export const EditModal = () => {
  const { editID, users, setEditID, editData, setEditData, setUsers } =
    useUsers();

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

    const editedUsers = {
      id: editID,
      email: editData.email,
      first_name: editData.first_name,
      last_name: editData.last_name,
      avatar: editData.avatar,
    };

    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === editID);

    newUsers[index] = editedUsers;

    axios
      .patch(`https://reqres.in/api/users/${editID}`, newUsers)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setUsers(newUsers);

    setEditID(null);
  };

  const handleCancelClick = () => {
    setEditID(null);
  };

  useEscapeKey(handleCancelClick);
  return (
    <EditModalForm
      handleEditFormChange={handleEditFormChange}
      handleEditFormSubmit={handleEditFormSubmit}
      handleCancelClick={handleCancelClick}
    />
  );
};
