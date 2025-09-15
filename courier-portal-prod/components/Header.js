import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    const authData = localStorage.getItem('userAuth')
    if (authData) {
      setIsAuthenticated(true)
      setUserAuth(JSON.parse(authData))
    }
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/order-form')
    } else {
      router.push('/auth')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userAuth')
    setIsAuthenticated(false)
    setUserAuth(null)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push('/')}> 
          <img src="/nexye-shiprocket-logo.svg" alt="Nexye Shiprocket Logo" style={{ height: '50px' }} />
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <button
            onClick={() => scrollToSection('home')}
            style={{ background: 'none', border: 'none', color: '#333', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' }}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            style={{ background: 'none', border: 'none', color: '#333', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' }}
          >
            Services
          </button>
          <button
            onClick={() => router.push('/order-history')}
            style={{ background: 'none', border: 'none', color: '#333', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' }}
          >
            Order History
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            style={{ background: 'none', border: 'none', color: '#333', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' }}
          >
            Contact
          </button>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                color: '#1565c0',
                fontWeight: '500'
              }}>
                👤 {userAuth?.name}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: 'linear-gradient(135deg, #f44336, #d32f2f)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(102,126,234,0.3)'
              }}
            >
              Login / Sign Up
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}