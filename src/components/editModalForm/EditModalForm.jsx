import './EditModalForm.css';
import { useUsers } from '../../context/UsersProvider';
import { motionBg } from '../../utilities/framerMotion';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export const EditModalForm = ({
  handleCancelClick,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  const { editID, users, editData } = useUsers();

  const modalRef = useRef(null);
  useOutsideClick(handleCancelClick, modalRef);
  return (
    <AnimatePresence>
      {editID && (
        <motion.div
          variants={motionBg}
          initial='hidden'
          animate='visible'
          className='edit-user-motion-bg'
        >
          <div className='edit-user-modal' ref={modalRef}>
            {users
              .filter((item) => item.id === editID)
              .map((filteredPerson) => (
                <div className='edit-modal-content' key={filteredPerson.id}>
                  <div className='edit-modal-item'>
                    <h2 className='edit-modal-title'>Edit User</h2>
                    <img
                      className='modal-image'
                      src={filteredPerson.avatar}
                      alt={filteredPerson.first_name}
                    />
                    <label className='edit-label-field'>Avatar</label>
                    <input
                      className='edit-input-field'
                      type='text'
                      required='required'
                      placeholder='Find an Avatar..'
                      name='avatar'
                      value={editData.avatar}
                      onChange={handleEditFormChange}
                    ></input>
                    <label className='edit-label-field'>First Name</label>
                    <input
                      className='edit-input-field'
                      type='text'
                      required='required'
                      placeholder='Enter a first name...'
                      name='first_name'
                      value={editData.first_name}
                      onChange={handleEditFormChange}
                    ></input>
                    <label className='edit-label-field'>Last Name</label>
                    <input
                      className='edit-input-field'
                      type='text'
                      required='required'
                      placeholder='Enter a last name...'
                      name='last_name'
                      value={editData.last_name}
                      onChange={handleEditFormChange}
                    ></input>
                    <label className='edit-label-field'>Email</label>
                    <input
                      className='edit-input-field'
                      type='email'
                      required='required'
                      placeholder='Enter an email...'
                      name='email'
                      value={editData.email}
                      onChange={handleEditFormChange}
                    ></input>
                  </div>

                  <button
                    className='edit-user-button'
                    onClick={handleEditFormSubmit}
                  >
                    Edit User
                  </button>
                  <button
                    className='edit-modal-close'
                    onClick={handleCancelClick}
                  >
                    Close Modal
                  </button>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
