import React from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      padding: '60px 20px 20px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '2rem', marginRight: '10px' }}>📦</div>
              <div>
                <h3 style={{
                  margin: '0',
                  fontSize: '1.5rem',
                  fontWeight: '800'
                }}>
                  NEXYE
                </h3>
                <p style={{
                  margin: '0',
                  fontSize: '0.7rem',
                  opacity: '0.8',
                  letterSpacing: '1px'
                }}>
                  COURIER SERVICES
                </p>
              </div>
            </div>
            <p style={{
              lineHeight: '1.6',
              opacity: '0.9',
              margin: '0'
            }}>
              India's most trusted courier service provider with nationwide coverage and exceptional customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              margin: '0 0 20px 0'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {quickLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <a href={link.href} style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              margin: '0 0 20px 0'
            }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                >
                  Standard Delivery
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                >
                  Express Delivery
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                >
                  Same Day Delivery
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                >
                  Bulk Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              margin: '0 0 20px 0'
            }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px', color: '#007bff' }}>📞</span> +918700438310
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px', color: '#007bff' }}>✉️</span> Care@nexye.shop
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ marginRight: '10px', color: '#007bff' }}>📍</span> D-41, C Block, Sector 59, Noida, Uttar Pradesh 201309
              </li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px' }}>
          <p style={{ margin: '0', fontSize: '0.9rem', opacity: '0.7' }}>
            &copy; {new Date().getFullYear()} NEXYE Courier Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;