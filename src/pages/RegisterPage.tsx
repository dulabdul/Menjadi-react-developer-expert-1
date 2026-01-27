import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import RegisterInput from '../components/RegisterInput';
import SuccessModal from '../components/SuccesModal';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }: any) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await api.register({ name, email, password });
      setShowSuccessModal(true);
    } catch (error: any) {
      setErrorMessage(error.message);
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
