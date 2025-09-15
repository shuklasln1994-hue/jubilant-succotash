import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Authentication() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Check if user is already authenticated and handle responsive design
  useEffect(() => {
    const authData = localStorage.getItem('userAuth');
    if (authData) {
      // User is already authenticated, redirect to order form
      router.push('/');
    }

    // Handle responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For mobile input, only allow digits and limit to 10
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      }
    } else if (name === 'otp') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 4) {
        setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate mobile number
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        });
        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          alert('OTP sent to your email!');
        } else {
          alert(`Failed to send OTP: ${data.message}`);
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    const newErrors = {};
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{4}$/.test(formData.otp.trim())) {
      newErrors.otp = 'Please enter a valid 4-digit OTP';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, otp: formData.otp })
        });
        const data = await response.json();
        if (response.ok && data.verified) {
          setOtpVerified(true);
          alert('OTP verified successfully!');
        } else {
          alert(`Failed to verify OTP: ${data.message}`);
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Failed to verify OTP. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm() && otpVerified) {
      setIsSubmitting(true);
      
      // Simulate authentication process
      setTimeout(() => {
        // Store authentication data in localStorage
        localStorage.setItem('userAuth', JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          timestamp: new Date().toISOString()
        }));
        
        // Redirect to order form
        router.push('/order-form');
      }, 2000);
    } else if (!otpVerified) {
      alert('Please verify your email with OTP first.');
    }
  };

  return (
    <>
      <Head>
        <title>Authentication - NEXYE | Fast & Reliable Shipping</title>
        <meta name="description" content="Authenticate to access NEXYE courier services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4facfe 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .bg-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .particle:nth-child(1) { width: 80px; height: 80px; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 120px; height: 120px; left: 70%; animation-delay: 5s; }
        .particle:nth-child(3) { width: 60px; height: 60px; left: 40%; animation-delay: 10s; }
        .particle:nth-child(4) { width: 100px; height: 100px; left: 80%; animation-delay: 15s; }

        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <div className="bg-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <Header />

        <main style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 160px)',
          padding: '40px 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            maxWidth: isMobile ? '500px' : '1200px',
            width: '100%',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Left side - Features */}
            <div style={{
              color: 'white',
              padding: isMobile ? '0' : '0 40px',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}>
                  <div style={{
                    fontSize: '24px',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>⚡</div>
                  <div style={{ fontWeight: '500' }}>Lightning fast delivery</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}>
                  <div style={{
                    fontSize: '24px',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>🛡️</div>
                  <div style={{ fontWeight: '500' }}>100% secure & insured</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}>
                  <div style={{
                    fontSize: '24px',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>📱</div>
                  <div style={{ fontWeight: '500' }}>Real-time tracking</div>
                </div>
              </div>
            </div>

            {/* Right side - Auth form */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '32px',
              padding: isMobile ? '32px 24px' : '48px',
              boxShadow: `
                0 32px 64px rgba(0, 0, 0, 0.15),
                0 16px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
              `,
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'slideInUp 0.8s ease-out',
              margin: isMobile ? '0 16px' : '0'
            }}>
              {/* Top gradient line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #667eea, #764ba2, #4facfe)',
                borderRadius: '32px 32px 0 0'
              }}></div>

              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '36px',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                  animation: 'pulse 2s infinite'
                }}>🔐</div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '8px'
                }}>Get Started</h2>
                <p style={{ color: '#666', fontSize: '1rem' }}>
                  Enter your details to continue with your shipment
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '28px', position: 'relative' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333',
                    fontSize: '0.95rem'
                  }}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.name ? '2px solid #ef4444' : '2px solid #e8f4f8',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      background: errors.name ? '#fef2f2' : '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = errors.name ? '#ef4444' : '#667eea';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name ? '#ef4444' : '#e8f4f8';
                      e.target.style.background = errors.name ? '#fef2f2' : '#fafbfc';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                  {errors.name && (
                    <div style={{
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '28px', position: 'relative' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333',
                    fontSize: '0.95rem'
                  }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.email ? '2px solid #ef4444' : '2px solid #e8f4f8',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      background: errors.email ? '#fef2f2' : '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = errors.email ? '#ef4444' : '#667eea';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.email ? '#ef4444' : '#e8f4f8';
                      e.target.style.background = errors.email ? '#fef2f2' : '#fafbfc';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                  {errors.email && (
                    <div style={{
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSubmitting || otpSent}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (isSubmitting || otpSent) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '28px',
                    boxShadow: '0 8px 24px rgba(79, 172, 254, 0.3)',
                    opacity: (isSubmitting || otpSent) ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!(isSubmitting || otpSent)) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 32px rgba(79, 172, 254, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 24px rgba(79, 172, 254, 0.3)';
                  }}
                  onMouseDown={(e) => {
                    if (!(isSubmitting || otpSent)) {
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isSubmitting && !otpSent ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Sending OTP...
                    </>
                  ) : otpSent ? 'OTP Sent!' : 'Send OTP'}
                </button>

                {otpSent && (
                  <div style={{ marginBottom: '28px', position: 'relative' }}>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#333',
                      fontSize: '0.95rem'
                    }}>OTP *</label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter 4-digit OTP"
                      maxLength="4"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: errors.otp ? '2px solid #ef4444' : '2px solid #e8f4f8',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease',
                        background: errors.otp ? '#fef2f2' : '#fafbfc',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.otp ? '#ef4444' : '#667eea';
                        e.target.style.background = 'white';
                        e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.otp ? '#ef4444' : '#e8f4f8';
                        e.target.style.background = errors.otp ? '#fef2f2' : '#fafbfc';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    />
                    {errors.otp && (
                      <div style={{
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        marginTop: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        ⚠️ <span>{errors.otp}</span>
                      </div>
                    )}
                  </div>
                )}

                {otpSent && !otpVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '28px',
                      boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.3)';
                    }}
                    onMouseDown={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Verifying OTP...
                      </>
                    ) : 'Verify OTP'}
                  </button>
                )}

                <div style={{ marginBottom: '28px', position: 'relative' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333',
                    fontSize: '0.95rem'
                  }}>Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.mobile ? '2px solid #ef4444' : '2px solid #e8f4f8',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      background: errors.mobile ? '#fef2f2' : '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = errors.mobile ? '#ef4444' : '#667eea';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.mobile ? '#ef4444' : '#e8f4f8';
                      e.target.style.background = errors.mobile ? '#fef2f2' : '#fafbfc';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                  {errors.mobile && (
                    <div style={{
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ <span>{errors.mobile}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !otpVerified}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (isSubmitting || !otpVerified) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: (isSubmitting || !otpVerified) ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!(isSubmitting || !otpVerified)) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseDown={(e) => {
                    if (!(isSubmitting || !otpVerified)) {
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Authenticating...
                    </>
                  ) : 'Proceed'}
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}