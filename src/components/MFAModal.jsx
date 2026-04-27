// src/components/MFAModal.jsx
import React, { useState, useEffect } from 'react';
import { Shield, Mail, Send, RefreshCw, X, AlertCircle } from 'lucide-react';

const MFAModal = ({ isOpen, onClose, onSuccess, userType, userEmail }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Generate random 6-digit OTP (can include letters and numbers)
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
    // In real implementation, this would call an API endpoint
    console.log(`Sending OTP ${otpCode} to ${userEmail || 'user@example.com'}`);
    
    // Simulate email sending
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
            <p>Jika Anda tidak meminta verifikasi ini, abaikan email ini.</p>
            <hr />
            <small>Sistem IRS - Otoritas Jasa Keuangan</small>
          </body>
        </html>
      `);
      emailPreview.document.close();
    }
    
    alert(`Kode OTP telah dikirim ke email ${userEmail || 'terdaftar'}. Cek console browser untuk melihat kode OTP.`);
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
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle key press for backspace
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
      setError('Masukkan 6 digit kode OTP');
      return;
    }
    
    // Check if all characters are the same
    const allSame = enteredOtp.split('').every(char => char === enteredOtp[0]);
    
    if (allSame) {
      setError('Kode OTP tidak valid (semua karakter sama)');
      return;
    }
    
    if (enteredOtp !== generatedOtp) {
      setError('Kode OTP salah. Silakan coba lagi.');
      return;
    }
    
    // Success
    setIsVerifying(true);
    setTimeout(() => {
      onSuccess();
      setIsVerifying(false);
    }, 1000);
  };

  // Resend OTP
  const handleResend = () => {
    if (!canResend) return;
    
    const newOtp = generateRandomOtp();
    setGeneratedOtp(newOtp);
    sendOtpToEmail(newOtp);
    setTimeLeft(300);
    setCanResend(false);
    setError('');
    setOtp(['', '', '', '', '', '']);
    
    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('otp-input-0');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  // Timer countdown
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

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up">
        {/* Red Top Border */}
        <div className="h-2 bg-gradient-to-r from-red-600 to-red-700"></div>
        
        {/* Header */}
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
        
        {/* Body */}
        <div className="p-6">
          {/* Email Info */}
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
          
          {/* OTP Input */}
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
            
            {/* Error Message */}
            {error && (
              <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          {/* Timer & Resend */}
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
          
          {/* Verify Button */}
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
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Kode OTP valid selama 5 menit. Jangan bagikan kode ini kepada siapapun.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MFAModal;