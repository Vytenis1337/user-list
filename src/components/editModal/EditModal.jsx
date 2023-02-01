import './EditModal.css';
import axios from 'axios';
import { useUsers } from '../../context/UsersProvider';

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

  return (
    <EditModalForm
      handleEditFormChange={handleEditFormChange}
      handleEditFormSubmit={handleEditFormSubmit}
      handleCancelClick={handleCancelClick}
    />
  );
};
