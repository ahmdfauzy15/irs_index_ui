// src/components/MFAModal.jsx
import React, { useState, useEffect } from 'react';
import { Shield, Mail, Send, RefreshCw, X, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const MFAModal = ({ isOpen, onClose, onSuccess, userType, userEmail, redirectLink }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  // Generate random 6-digit OTP
  const generateRandomOtp = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  // Send OTP via email (simulated)
  const sendOtpToEmail = (otpCode) => {
    console.log(`Sending OTP ${otpCode} to ${userEmail || 'user@example.com'}`);
    
    const emailPreview = window.open('', '_blank');
    if (emailPreview) {
      emailPreview.document.write(`
        <html>
          <head><title>IRS - Kode Verifikasi OTP</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #DC2626;">IRS - Kode Verifikasi</h2>
            <p>Berikut adalah kode verifikasi OTP Anda:</p>
            <div style="font-size: 32px; font-weight: bold; color: #DC2626; padding: 20px; background: #FEE2E2; border-radius: 10px; text-align: center; letter-spacing: 5px;">
              ${otpCode}
            </div>
            <p>Kode ini berlaku selama 5 menit.</p>
            <hr />
            <small>Sistem IRS - Otoritas Jasa Keuangan</small>
          </body>
        </html>
      `);
      emailPreview.document.close();
    }
    
    alert(`Kode OTP telah dikirim ke email ${userEmail || 'terdaftar'}. Cek console untuk melihat kode OTP.`);
  };

  // Initialize MFA
  const initializeMFA = () => {
    const newOtp = generateRandomOtp();
    setGeneratedOtp(newOtp);
    sendOtpToEmail(newOtp);
    setTimeLeft(300);
    setCanResend(false);
    setError('');
    setOtp(['', '', '', '', '', '']);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Verify OTP
  const handleVerify = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 6) {
      setErrorMessage('Masukkan 6 digit kode OTP');
      setShowError(true);
      return;
    }
    
    const allSame = enteredOtp.split('').every(char => char === enteredOtp[0]);
    
    if (allSame) {
      setErrorMessage('Kode OTP tidak valid');
      setShowError(true);
      return;
    }
    
    if (enteredOtp !== generatedOtp) {
      setErrorMessage('Kode OTP salah. Silakan coba lagi.');
      setShowError(true);
      return;
    }
    
    // Success
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowSuccess(true);
    }, 500);
  };

  // Auto submit when OTP is fully entered
  useEffect(() => {
    const isOtpComplete = otp.every(digit => digit !== '');
    if (isOtpComplete && !isVerifying && !showSuccess && !showError) {
      handleVerify();
    }
  }, [otp]);

  // Auto redirect after 5 seconds
  useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      // Redirect to the intended link
      if (redirectLink) {
        window.open(redirectLink, '_blank');
      }
      onSuccess();
      setShowSuccess(false);
      onClose();
    }
  }, [showSuccess, countdown, redirectLink, onSuccess, onClose]);

  // Reset countdown when success modal opens
  useEffect(() => {
    if (showSuccess) {
      setCountdown(5);
    }
  }, [showSuccess]);

  const handleResend = () => {
    if (!canResend) return;
    
    const newOtp = generateRandomOtp();
    setGeneratedOtp(newOtp);
    sendOtpToEmail(newOtp);
    setTimeLeft(300);
    setCanResend(false);
    setError('');
    setOtp(['', '', '', '', '', '']);
    
    setTimeout(() => {
      const firstInput = document.getElementById('otp-input-0');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  // Timer countdown for resend
  useEffect(() => {
    if (!isOpen) return;
    
    initializeMFA();
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* MFA Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up">
          <div className="h-2 bg-gradient-to-r from-red-600 to-red-700"></div>
          
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Verifikasi MFA</h3>
                  <p className="text-sm text-gray-500">Masukkan kode OTP 6 digit</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6 p-3 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-700">
                  Kode verifikasi dikirim ke: 
                  <strong className="text-red-600 ml-1">
                    {userEmail || 'email_terdaftar@domain.com'}
                  </strong>
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kode OTP 6 Digit
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`
                      w-12 h-14 text-center text-2xl font-bold
                      border-2 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-red-500
                      transition-all duration-200
                      ${error 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-red-300'
                      }
                    `}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <RefreshCw className={`w-4 h-4 ${canResend ? 'text-red-600' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-600">
                  {canResend ? 'Kode baru dapat dikirim' : `Kirim ulang dalam ${formatTime(timeLeft)}`}
                </span>
              </div>
              
              {canResend && (
                <button
                  onClick={handleResend}
                  className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  Kirim Ulang Kode
                </button>
              )}
            </div>
            
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className={`
                w-full py-3 rounded-xl font-bold text-white
                bg-gradient-to-r from-red-600 to-red-700
                hover:from-red-700 hover:to-red-800
                shadow-lg hover:shadow-xl
                transition-all duration-300
                flex items-center justify-center space-x-2
                ${isVerifying ? 'opacity-75 cursor-not-allowed' : ''}
              `}
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Verifikasi & Masuk</span>
                </>
              )}
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Kode OTP valid selama 5 menit. Jangan bagikan kode ini kepada siapapun.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal - Simple */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowSuccess(false);
              onClose();
            }}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-slide-up">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            
            {/* Progress Bar Countdown */}
            <div className="absolute top-2 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 5) * 100}%` }}
              ></div>
            </div>
            
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verifikasi Berhasil!</h3>
              <p className="text-gray-600 mb-2">
                Mengarahkan ke dashboard...
              </p>
              
              <div className="mt-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full">
                  <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-green-700">
                    {countdown} detik
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal - Simple */}
      {showError && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowError(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-slide-up">
            <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
            
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verifikasi Gagal</h3>
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
              
              <button
                onClick={() => setShowError(false)}
                className="w-full py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MFAModal;