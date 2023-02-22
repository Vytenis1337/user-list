import './AddUserForm.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useUsers } from '../../context/UsersProvider';
import { motionBg } from '../../utilities/framerMotion';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useRef } from 'react';

export const AddUserForm = ({ addUserToBegining, closeAddUserMenu }) => {
  const { setFormData, formData } = useUsers();
  const modalRef = useRef(null);
  useOutsideClick(closeAddUserMenu, modalRef);
  return (
    <AnimatePresence>
      <motion.div
        variants={motionBg}
        initial='hidden'
        animate='visible'
        className='add-user-motion-bg'
      >
        <div className='add-user-modal' ref={modalRef}>
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

          <button className='add-user-button' onClick={addUserToBegining}>
            Add User
          </button>
          <button onClick={closeAddUserMenu} className='close-add-user-modal'>
            Close Modal
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
