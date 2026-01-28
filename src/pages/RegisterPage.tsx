import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../states';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/register/RegisterInput';
import SuccessModal from '../components/modal/SuccesModal';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onRegister = async ({ name, email, password }: any) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await dispatch(asyncRegisterUser({ name, email, password })).unwrap();
      setShowSuccessModal(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className='relative flex justify-center items-center h-[80vh] px-4'>
      <RegisterInput
        register={onRegister}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title='Registration Successful!'
        message='Your account has been created. Please login to continue exploring the forum.'
        buttonText='Go to Login'
      />
    </div>
  );
}
