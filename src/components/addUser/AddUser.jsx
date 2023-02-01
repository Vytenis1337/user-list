import './AddUser.css';
import axios from 'axios';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useUsers } from '../UsersProvider';

export const AddUser = () => {
  const {
    users,
    setUsers,
    userAdd,
    setUserAdd,
    openAddUserMenu,
    closeAddUserMenu,
  } = useUsers();

  const [formData, setFormData] = useState({
    id: NaN,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

  const addUserToBeginning = (e) => {
    e.preventDefault();

    setUsers((prevUsers) => [
      ...prevUsers,
      { ...formData, id: users[users.length - 1].id + 1 },
    ]);

    axios
      .post('https://reqres.in/api/users', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setUserAdd(true);
    setFormData({
      id: NaN,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    });
  };

  const motionBg = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div>
      {userAdd ? (
        <button className='open-user-button' onClick={openAddUserMenu}>
          Add User
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={motionBg}
            initial='hidden'
            animate='visible'
            className='add-user-motion-bg'
          >
            <div className='add-user-modal'>
              <h2>Add User Form</h2>
              <label className='label-field'>avatar</label>
              <input
                placeholder='https://reqres.in/img/faces/7-image.jpg'
                className='input-field'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
              />

              <label className='label-field'>first_name</label>
              <input
                className='input-field'
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                type='text'
                placeholder='first name..'
              />

              <label className='label-field'>last_name</label>
              <input
                className='input-field'
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                type='text'
                placeholder='last name..'
              />

              <label className='label-field'>email</label>
              <input
                className='input-field'
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type='email'
                placeholder='example@gmail.com'
              />

              <button className='add-user-button' onClick={addUserToBeginning}>
                Add User
              </button>
              <button
                onClick={closeAddUserMenu}
                className='close-add-user-modal'
              >
                Close Modal
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
