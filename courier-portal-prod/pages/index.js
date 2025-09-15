import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state variable

  useEffect(() => {
    setIsClient(true); // Set to true once component mounts on client
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/order-form');
    } else {
      router.push('/auth');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    setIsAuthenticated(false);
    setUserAuth(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    // Base styles
    body: {
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333'
    },

    // Navigation styles
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '70px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: isScrolled ? '#333' : 'white',
      textDecoration: 'none'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px'
    },
    navLink: {
      color: isScrolled ? '#333' : 'white',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '16px'
    },
    shipButton: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    logoutButton: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '14px'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: isScrolled ? '#333' : 'white',
      fontSize: '24px',
      cursor: 'pointer'
    },

    // Hero section styles
    hero: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '0 20px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '900px',
      zIndex: 2,
      position: 'relative'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: '800',
      margin: '0 0 20px 0',
      lineHeight: 1.1
    },
    heroSubtitle: {
      background: 'linear-gradient(45deg, #ffd700, #ff8c00)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroDescription: {
      fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
      margin: '0 0 40px 0',
      opacity: 0.9,
      lineHeight: 1.6
    },
    heroButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '60px'
    },
    primaryButton: {
      background: 'white',
      color: '#333',
      border: 'none',
      padding: '18px 36px',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    secondaryButton: {
      background: '#ffd700',
      color: '#333',
      border: 'none',
      padding: '18px 36px',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    outlineButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '16px 36px',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    // Stats section
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '30px',
      marginTop: '40px'
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#ffd700',
      margin: '0 0 5px 0'
    },
    statLabel: {
      fontSize: '0.9rem',
      opacity: 0.8
    },

    // Features section
    section: {
      padding: '80px 20px'
    },
    sectionGray: {
      background: '#f8f9fa'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '700',
      color: '#333',
      textAlign: 'center',
      margin: '0 0 20px 0'
    },
    sectionDescription: {
      fontSize: '1.2rem',
      color: '#666',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto 60px auto'
    },

    // Feature grid
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px'
    },
    featureCard: {
      background: 'white',
      padding: '40px 30px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '20px'
    },
    featureTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#333',
      margin: '0 0 15px 0'
    },
    featureDescription: {
      color: '#666',
      lineHeight: 1.6
    },

    // Service cards
    serviceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px'
    },
    serviceCard: {
      background: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '20px',
      padding: '40px 30px',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    serviceCardPopular: {
      borderColor: '#3b82f6',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transform: 'scale(1.05)'
    },
    popularBadge: {
      position: 'absolute',
      top: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#3b82f6',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    serviceTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#333',
      margin: '0 0 10px 0',
      textAlign: 'center'
    },
    serviceSubtitle: {
      color: '#3b82f6',
      fontWeight: '600',
      textAlign: 'center',
      margin: '0 0 15px 0'
    },
    servicePrice: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#10b981',
      textAlign: 'center',
      margin: '0 0 30px 0'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 30px 0'
    },
    featureListItem: {
      padding: '8px 0',
      display: 'flex',
      alignItems: 'center',
      color: '#666'
    },
    checkmark: {
      color: '#10b981',
      marginRight: '10px',
      fontWeight: 'bold'
    },
    choosePlanButton: {
      width: '100%',
      padding: '15px',
      borderRadius: '10px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem'
    },
    choosePlanButtonPrimary: {
      background: '#3b82f6',
      color: 'white',
      border: 'none'
    },
    choosePlanButtonSecondary: {
      background: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6'
    },

    // About section
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '60px',
      alignItems: 'center'
    },
    aboutText: {
      fontSize: '1.1rem',
      color: '#666',
      lineHeight: 1.8,
      margin: '0 0 20px 0'
    },
    missionCard: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '20px',
      padding: '40px',
      color: 'white',
      textAlign: 'center',
      position: 'relative'
    },
    missionIcon: {
      fontSize: '4rem',
      marginBottom: '20px'
    },
    missionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      margin: '0 0 20px 0'
    },
    missionText: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      opacity: 0.95
    },

    // Contact section
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px'
    },
    contactCard: {
      background: '#f8f9fa',
      padding: '40px 30px',
      borderRadius: '20px',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    contactIcon: {
      fontSize: '3rem',
      marginBottom: '20px'
    },
    contactTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#333',
      margin: '0 0 10px 0'
    },
    contactInfo: {
      fontSize: '1.1rem',
      color: '#3b82f6',
      fontWeight: '600',
      margin: '0 0 5px 0'
    },
    contactSubtitle: {
      color: '#666',
      fontSize: '0.9rem'
    },

    // CTA section
    cta: {
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center'
    },
    ctaContainer: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    ctaTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '700',
      margin: '0 0 20px 0'
    },
    ctaDescription: {
      fontSize: '1.3rem',
      margin: '0 0 40px 0',
      opacity: 0.9
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },

    // Footer
    footer: {
      background: '#1f2937',
      color: 'white',
      padding: '60px 20px 20px'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px',
      marginBottom: '40px'
    },
    footerTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      margin: '0 0 20px 0'
    },
    footerText: {
      color: '#9ca3af',
      lineHeight: 1.6
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    footerListItem: {
      padding: '5px 0'
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '14px'
    },
    footerBottom: {
      borderTop: '1px solid #374151',
      paddingTop: '20px',
      textAlign: 'center',
      color: '#9ca3af'
    },

    // Responsive styles
    '@media (max-width: 768px)': {
      navLinks: {
        display: 'none'
      },
      mobileMenuButton: {
        display: 'block'
      },
      heroButtons: {
        flexDirection: 'column',
        alignItems: 'center'
      },
      primaryButton: {
        width: '100%',
        maxWidth: '300px'
      },
      secondaryButton: {
        width: '100%',
        maxWidth: '300px'
      },
      outlineButton: {
        width: '100%',
        maxWidth: '300px'
      },
      featureGrid: {
        gridTemplateColumns: '1fr'
      },
      serviceGrid: {
        gridTemplateColumns: '1fr'
      },
      aboutGrid: {
        gridTemplateColumns: '1fr'
      },
      contactGrid: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      ctaButtons: {
        flexDirection: 'column',
        alignItems: 'center'
      }
    }
  };

  return (
    <>
      <Head>
        <title>NEXYE Courier - Fast & Reliable Shipping Across India</title>
        <meta name="description" content="Professional courier services with real-time tracking, competitive pricing, and nationwide delivery. Ship your packages safely and efficiently with NEXYE." />
        <meta name="keywords" content="courier service, package delivery, shipping, logistics, India courier, fast delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
      </Head>

      <div style={styles.body}>
        {/* Navigation */}
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            {/* Logo */}
            <div style={styles.logo}>
              📦 NEXYE
            </div>

            {/* Desktop Menu */}
            {isClient && (
              <div style={{...styles.navLinks, display: window.innerWidth > 768 ? 'flex' : 'none'}}>
                {['Home', 'Services', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => router.push(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                    style={styles.navLinkButton}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button style={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div style={{
              background: 'white',
              borderTop: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '15px 20px',
                    background: 'none',
                    border: 'none',
                    color: '#333',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                  {item}
                </button>
              ))}
              {isAuthenticated ? (
                <div style={{padding: '15px 20px', borderTop: '1px solid #e5e7eb'}}>
                  <p style={{fontSize: '14px', color: '#666', margin: '0 0 10px 0'}}>
                    Welcome, {userAuth?.name || 'User'}
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleGetStarted();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '15px 20px',
                    background: '#3b82f6',
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Ship Now
                </button>
              )}
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Fast & Reliable
              <br />
              <span style={styles.heroSubtitle}>Courier Services</span>
            </h1>
            <p style={styles.heroDescription}>
              Ship your packages across India with confidence. Real-time tracking, competitive pricing, 
              and doorstep pickup & delivery services.
            </p>
            
            <div style={styles.heroButtons}>
              <button
                onClick={handleGetStarted}
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
              >
                🚀 Start Shipping Now
              </button>
              <button
                onClick={() => router.push('/same-day-delivery')}
                style={styles.secondaryButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
              >
                ⚡ Same Day Delivery
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={styles.outlineButton}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                📦 Learn More
              </button>
            </div>

            {/* Quick Stats */}
            <div style={styles.stats}>
              {[
                { number: '50k+', label: 'Happy Customers' },
                { number: '1M+', label: 'Packages Delivered' },
                { number: '500+', label: 'Cities Covered' },
                { number: '99.8%', label: 'On-time Delivery' }
              ].map((stat, index) => (
                <div key={index} style={styles.statItem}>
                  <div style={styles.statNumber}>{stat.number}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{...styles.section, ...styles.sectionGray}}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Why Choose NEXYE?</h2>
            <p style={styles.sectionDescription}>
              We provide comprehensive courier solutions with cutting-edge technology 
              and exceptional customer service.
            </p>

            <div style={styles.featureGrid}>
              {[
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Express delivery within 24-48 hours across major cities'
                },
                {
                  icon: '🔒',
                  title: 'Secure & Safe',
                  description: 'Your packages are insured and handled with utmost care'
                },
                {
                  icon: '📍',
                  title: 'Real-time Tracking',
                  description: 'Track your shipments live with our advanced tracking system'
                },
                {
                  icon: '💰',
                  title: 'Competitive Pricing',
                  description: 'Best rates in the market with transparent pricing'
                },
                {
                  icon: '🏠',
                  title: 'Doorstep Service',
                  description: 'Convenient pickup and delivery right at your doorstep'
                },
                {
                  icon: '📞',
                  title: '24/7 Support',
                  description: 'Round-the-clock customer support for all your queries'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  style={styles.featureCard}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Our Services</h2>
            <p style={styles.sectionDescription}>
              Comprehensive logistics solutions for all your shipping needs
            </p>

            <div style={styles.serviceGrid}>
              {[
                {
                  title: 'Standard Delivery',
                  subtitle: '2-4 Business Days',
                  price: 'Starting ₹270',
                  features: ['Nationwide coverage', 'SMS updates', 'Insurance included', 'Proof of delivery'],
                  popular: false
                },
                {
                  title: 'Express Delivery',
                  subtitle: '1-2 Business Days',
                  price: 'Starting ₹450',
                  features: ['Priority handling', 'Faster transit', 'Live tracking', 'Premium support'],
                  popular: true
                },
                {
                  title: 'Same Day Delivery',
                  subtitle: 'Within City Limits',
                  price: 'Starting ₹200',
                  features: ['Ultra-fast delivery', 'Real-time updates', 'Dedicated support', 'Emergency service'],
                  popular: false
                }
              ].map((service, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.serviceCard,
                    ...(service.popular ? styles.serviceCardPopular : {})
                  }}
                  onMouseEnter={(e) => {
                    if (!service.popular) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!service.popular) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  {service.popular && (
                    <div style={styles.popularBadge}>
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <h3 style={styles.serviceTitle}>{service.title}</h3>
                  <p style={styles.serviceSubtitle}>{service.subtitle}</p>
                  <div style={styles.servicePrice}>{service.price}</div>

                  <ul style={styles.featureList}>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} style={styles.featureListItem}>
                        <span style={styles.checkmark}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={handleGetStarted}
                    style={{
                      ...styles.choosePlanButton,
                      ...(service.popular ? styles.choosePlanButtonPrimary : styles.choosePlanButtonSecondary)
                    }}
                    onMouseEnter={(e) => {
                      if (service.popular) {
                        e.target.style.background = '#2563eb';
                      } else {
                        e.target.style.background = '#3b82f6';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (service.popular) {
                        e.target.style.background = '#3b82f6';
                      } else {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#3b82f6';
                      }
                    }}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{...styles.section, ...styles.sectionGray}}>
          <div style={styles.container}>
            <div style={styles.aboutGrid}>
              <div>
                <h2 style={styles.sectionTitle}>About NEXYE Courier</h2>
                <p style={styles.aboutText}>
                  Since our inception, NEXYE has been at the forefront of providing reliable and 
                  efficient courier services across India. We understand that every package carries 
                  someone's trust, and we honor that responsibility with dedication and professionalism.
                </p>
                <p style={styles.aboutText}>
                  Our network spans across major cities and remote locations, ensuring your packages 
                  reach their destination safely and on time. With advanced tracking technology and 
                  a customer-first approach, we've become India's trusted courier partner.
                </p>
                
                <button
                  onClick={handleGetStarted}
                  style={{
                    ...styles.primaryButton,
                    background: '#3b82f6',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2563eb';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#3b82f6';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Get Started Today →
                </button>
              </div>
              
              <div style={{position: 'relative'}}>
                {/* Mission Card */}
                <div style={styles.missionCard}>
                  <div style={styles.missionIcon}>📦</div>
                  <h3 style={styles.missionTitle}>Our Mission</h3>
                  <p style={styles.missionText}>
                    To revolutionize the courier industry in India by providing fast, reliable, 
                    and affordable logistics solutions while maintaining the highest standards 
                    of customer service and package security.
                  </p>
                </div>
                
                {/* Floating Stats */}
                <div style={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-30px',
                  background: 'white',
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6'}}>99.8%</div>
                  <div style={{fontSize: '0.8rem', color: '#666'}}>Success Rate</div>
                </div>
                
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  background: 'white',
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981'}}>24/7</div>
                  <div style={{fontSize: '0.8rem', color: '#666'}}>Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Get In Touch</h2>
            <p style={styles.sectionDescription}>
              Have questions or need assistance? We're here to help you with all your courier needs.
            </p>
            
            <div style={styles.contactGrid}>
              {[
                {
                  icon: '📞',
                  title: 'Phone Support',
                  info: '+918700438310',
                  subtitle: 'Mon-Sat 9AM-7PM'
                },
                {
                  icon: '📧',
                  title: 'Email Support',
                  info: 'Care@nexye.shop',
                  subtitle: '24/7 Email Support'
                },
                {
                  icon: '🏢',
                  title: 'Head Office',
                  info: 'D-41, C Block, Sector 59, Noida, Uttar Pradesh 201309',
                  subtitle: 'Corporate Headquarters'
                },
                {
                  icon: '💬',
                  title: 'Live Chat',
                  info: 'Chat with us now',
                  subtitle: 'Instant assistance'
                }
              ].map((contact, index) => (
                <div
                  key={index}
                  style={styles.contactCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.contactIcon}>{contact.icon}</div>
                  <h3 style={styles.contactTitle}>{contact.title}</h3>
                  <p style={styles.contactInfo}>{contact.info}</p>
                  <p style={styles.contactSubtitle}>{contact.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.cta}>
          <div style={styles.ctaContainer}>
            <h2 style={styles.ctaTitle}>Ready to Ship?</h2>
            <p style={styles.ctaDescription}>
              Join thousands of satisfied customers who trust NEXYE for their courier needs.
            </p>
            <div style={styles.ctaButtons}>
              <button
                onClick={handleGetStarted}
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
              >
                📦 Get Started Today
              </button>
              <button 
                style={styles.outlineButton}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                View Pricing
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.container}>
            <div style={styles.footerGrid}>
              {/* Company Info */}
              <div>
                <div style={{...styles.logo, color: 'white', marginBottom: '20px'}}>
                  📦 NEXYE
                </div>
                <p style={styles.footerText}>
                  India's trusted courier service providing fast, reliable, and secure package delivery nationwide.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 style={styles.footerTitle}>Quick Links</h3>
                <ul style={styles.footerList}>
                  <li style={styles.footerListItem}>
                    <button 
                      onClick={() => scrollToSection('home')} 
                      style={styles.footerLink}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                    >
                      Home
                    </button>
                  </li>
                  <li style={styles.footerListItem}>
                    <button 
                      onClick={() => scrollToSection('services')} 
                      style={styles.footerLink}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                    >
                      Services
                    </button>
                  </li>
                  <li style={styles.footerListItem}>
                    <button 
                      onClick={() => scrollToSection('about')} 
                      style={styles.footerLink}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                    >
                      About
                    </button>
                  </li>
                  <li style={styles.footerListItem}>
                    <button 
                      onClick={() => scrollToSection('contact')} 
                      style={styles.footerLink}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 style={styles.footerTitle}>Services</h3>
                <ul style={styles.footerList}>
                  <li style={styles.footerListItem}>
                    <span style={styles.footerText}>Standard Delivery</span>
                  </li>
                  <li style={styles.footerListItem}>
                    <span style={styles.footerText}>Express Delivery</span>
                  </li>
                  <li style={styles.footerListItem}>
                    <span style={styles.footerText}>Same Day Delivery</span>
                  </li>
                  <li style={styles.footerListItem}>
                    <span style={styles.footerText}>Bulk Shipping</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 style={styles.footerTitle}>Contact Info</h3>
                <div style={{color: '#9ca3af', fontSize: '14px', lineHeight: '1.8'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <span>📞</span>
                    <span>+918700438310</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <span>📧</span>
                    <span>Care@nexye.shop</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span>📍</span>
                    <span>D-41, C Block, Sector 59, Noida, Uttar Pradesh 201309</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.footerBottom}>
              <p>&copy; 2024 NEXYE Courier. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}