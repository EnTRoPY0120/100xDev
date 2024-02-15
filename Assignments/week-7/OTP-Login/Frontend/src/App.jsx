import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(''); // Store received OTP
  const otpInputRef = useRef([]);

  useEffect(() => {
    // Focus the first input only when otpSent changes and there are input elements
    if (otpSent && otpInputRef.current.length > 0) {
      otpInputRef.current[0].focus();
    }
  }, [otpSent, otpInputRef.current]);

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/sendotp', { phoneNumber });
      if (res.data.success) {
        setOtpSent(true);
        setGeneratedOtp(res.data.otp); // Store received OTP
        console.log(`Generated OTP: ${res.data.otp}`);
      } else {
        alert('OTP failed to send');
      }
    } catch (error) {
      console.error('OTP failed to send', error);
      alert('OTP failed to send');
    }
  };

  const handleOtpChange = (index, value) => {
    const updatedOtp = otp.split('');
    updatedOtp[index] = value;
    setOtp(updatedOtp.join(''));

    if (value !== '' && index < otpInputRef.current.length - 1) {
      otpInputRef.current[index + 1].focus(); // Focus next input on non-empty value
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/verifyotp', { phoneNumber, otp });
      if (res.data.success) {
        alert('Logged in successfully');
      } else {
        alert('OTP verification failed');
      }
    } catch (error) {
      console.error('Failed to log in', error);
      alert('OTP verification failed');
    }
  };

  return (
    <div>
      <h2>Login via OTP</h2>
      {!otpSent ? (
        <div>
          <input
            type='tel'
            placeholder='Enter your PhoneNumber'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <p>Generated OTP: {generatedOtp}</p> {/* Display generated OTP */}
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              ref={(ref) => (otpInputRef.current[index] = ref)} // Attach ref correctly
              type="text"
              maxLength="1"
              value={otp[index] || ''}
              onChange={(e) => handleOtpChange(index, e.target.value)}
            />
          ))}
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default App;