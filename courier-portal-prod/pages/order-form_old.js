import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function OrderForm() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authData, setAuthData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Styles for form elements
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#34495e',
    fontWeight: '600'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
    ':focus': {
      borderColor: '#667eea',
      outline: 'none'
    }
  }

  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: '#5a67d8',
      transform: 'translateY(-2px)'
    },
    ':active': {
      transform: 'translateY(0)'
    }
  }

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    senderPincode: '',
    senderEmail: '',
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverPincode: '',
    receiverEmail: '',
    packageWeight: '',
    dimensions: '',
    description: '',
    serviceType: 'standard'
  })
  
  const [price, setPrice] = useState(0)
  const [priceBreakdown, setPriceBreakdown] = useState('Enter weight to calculate')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const storedAuthData = localStorage.getItem('userAuth')
    console.log('Stored Auth Data:', storedAuthData)
    if (storedAuthData) {
      try {
        const parsedAuthData = JSON.parse(storedAuthData)
        console.log('Parsed Auth Data:', parsedAuthData)
        setAuthData(parsedAuthData)
        setIsAuthenticated(true)
        // Pre-fill sender info from auth data
        setFormData(prev => ({
          ...prev,
          senderName: parsedAuthData.name || '',
          senderPhone: parsedAuthData.mobile || '',
          senderEmail: parsedAuthData.email || ''
        }))
      } catch (error) {
        console.error('Error parsing auth data:', error)
        router.push('/auth')
      }
    } else {
      console.log('No auth data found, redirecting to /auth')
      router.push('/auth')
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userAuth')
    setIsAuthenticated(false)
    setAuthData(null)
    router.push('/auth')
  }

  const calculatePrice = (weight) => {
    const w = parseFloat(weight)
    if (isNaN(w) || w <= 0) {
      return { price: 0, breakdown: 'Enter valid weight' }
    }
    
    let price = 0
    let breakdown = ''
    
    if (w <= 1) {
      price = 270
      breakdown = 'Up to 1kg: ₹270'
    } else if (w <= 2) {
      price = 320
      breakdown = 'Up to 2kg: ₹320'
    } else {
      const extraKg = Math.ceil(w - 2)
      price = 320 + (extraKg * 100)
      breakdown = `2kg: ₹320 + ${extraKg}kg × ₹100 = ₹${price}`
    }
    
    return { price, breakdown }
  }

  const handleWeightChange = (e) => {
    const weight = e.target.value
    setFormData(prev => ({ ...prev, packageWeight: weight }))
    
    const result = calculatePrice(weight)
    setPrice(result.price)
    setPriceBreakdown(result.breakdown)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate required fields
    if (!formData.senderName || !formData.senderPhone || !formData.senderAddress || 
        !formData.senderPincode || !formData.receiverName || !formData.receiverPhone || 
        !formData.receiverAddress || !formData.receiverPincode || !formData.packageWeight || 
        !formData.description || !formData.senderEmail || !formData.receiverEmail) {
      alert('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    if (price === 0) {
      alert('Please enter a valid package weight to calculate price')
      setIsSubmitting(false)
      return
    }
    
    try {
      // Call your own backend API endpoint
      const response = await fetch('/api/shiprocket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, price, dimensions: formData.dimensions || '10x10x10' }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create Shiprocket order');
      }

      // Prepare data for confirmation page
      const orderData = {
        price: price,
        pickup: `${formData.senderAddress}, ${formData.senderPincode}`,
        delivery: `${formData.receiverAddress}, ${formData.receiverPincode}`,
        customerName: formData.senderName,
        customerPhone: formData.senderPhone,
        senderEmail: formData.senderEmail,
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone,
        receiverEmail: formData.receiverEmail,
        packageType: formData.serviceType === 'standard' ? 'Standard Package' : 'Express Package',
        weight: `${formData.packageWeight} kg`,
        dimensions: formData.dimensions || 'Not specified',
        description: formData.description,
        serviceType: formData.serviceType,
        authName: authData?.name || '',
        authMobile: authData?.mobile || '',
        awbCode: result.awbCode, // Add AWB Code from API response
        courierName: result.shiprocketResponse?.data?.courier_name || 'NEXYE Courier', // Assuming courier_name is in shiprocketResponse.data
        shiprocketOrder: result.shiprocketResponse // Pass Shiprocket order details to confirmation
      }
      
      // Navigate to confirmation page with order data
      const queryString = new URLSearchParams(orderData).toString()
      router.push(`/order-confirmation?${queryString}`)
      
    } catch (error) {
      console.error('Error submitting order:', error)
      alert(`Failed to submit order: ${error.message}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Create Order - NEXYE Courier Services</title>
        <meta name="description" content="Create a new courier order with NEXYE - Fast, reliable, and secure package delivery across India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
      </Head>

      <div style={{
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        
        {/* Professional Header */}
        <Header />

        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
          boxSizing: 'border-box'
        }}>
          <h1 style={{
            fontSize: '2.8rem',
            color: '#2c3e50',
            textAlign: 'center',
            marginBottom: '40px',
            fontWeight: '700',
            textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
          }}>
            📦 Create Your NEXYE Order
          </h1>

          <div className="form-container" style={{
            background: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            padding: '40px',
            border: '1px solid #e0e6ed'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Sender Information */}
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  color: '#34495e',
                  marginBottom: '25px',
                  borderBottom: '2px solid #e0e6ed',
                  paddingBottom: '10px'
                }}>
                  Sender Information
                </h2>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                  <div>
                    <label htmlFor="senderName" style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Your Full Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="senderPhone" style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      id="senderPhone"
                      name="senderPhone"
                      value={formData.senderPhone}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., +919876543210"
                      required
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="senderAddress" style={labelStyle}>Pickup Address</label>
                    <input
                      type="text"
                      id="senderAddress"
                      name="senderAddress"
                      value={formData.senderAddress}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="House No., Street, Locality"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="senderPincode" style={labelStyle}>Pincode</label>
                    <input
                      type="text"
                      id="senderPincode"
                      name="senderPincode"
                      value={formData.senderPincode}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., 110001"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="senderEmail" style={labelStyle}>Email</label>
                    <input
                      type="email"
                      id="senderEmail"
                      name="senderEmail"
                      value={formData.senderEmail}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Receiver Information */}
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  color: '#34495e',
                  marginBottom: '25px',
                  borderBottom: '2px solid #e0e6ed',
                  paddingBottom: '10px'
                }}>
                  Receiver Information
                </h2>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                  <div>
                    <label htmlFor="receiverName" style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Receiver's Full Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverPhone" style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      id="receiverPhone"
                      name="receiverPhone"
                      value={formData.receiverPhone}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., +919876543210"
                      required
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="receiverAddress" style={labelStyle}>Delivery Address</label>
                    <input
                      type="text"
                      id="receiverAddress"
                      name="receiverAddress"
                      value={formData.receiverAddress}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="House No., Street, Locality"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverPincode" style={labelStyle}>Pincode</label>
                    <input
                      type="text"
                      id="receiverPincode"
                      name="receiverPincode"
                      value={formData.receiverPincode}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., 560001"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverEmail" style={labelStyle}>Email</label>
                    <input
                      type="email"
                      id="receiverEmail"
                      name="receiverEmail"
                      value={formData.receiverEmail}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., receiver.email@example.com"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Package Details */}
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  color: '#34495e',
                  marginBottom: '25px',
                  borderBottom: '2px solid #e0e6ed',
                  paddingBottom: '10px'
                }}>
                  Package Details
                </h2>
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                  <div>
                    <label htmlFor="packageWeight" style={labelStyle}>Weight (in kg)</label>
                    <input
                      type="number"
                      id="packageWeight"
                      name="packageWeight"
                      value={formData.packageWeight}
                      onChange={handleWeightChange}
                      style={inputStyle}
                      placeholder="e.g., 2.5"
                      step="0.1"
                      min="0.1"
                      required
                    />
                    <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '5px' }}>{priceBreakdown}</p>
                  </div>
                  <div>
                    <label htmlFor="dimensions" style={labelStyle}>Dimensions (Optional)</label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., 10x10x10 cm"
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="description" style={labelStyle}>Package Content Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                      placeholder="e.g., Documents, Clothes, Electronics"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="serviceType" style={labelStyle}>Service Type</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="standard">Standard Delivery</option>
                      <option value="express">Express Delivery</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Price and Submit */}
              <section style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  color: '#34495e',
                  marginBottom: '25px',
                  borderBottom: '2px solid #e0e6ed',
                  paddingBottom: '10px'
                }}>
                  Summary
                </h2>
                <div style={{
                  background: '#ecf0f1',
                  padding: '25px',
                  borderRadius: '10px',
                  marginBottom: '30px',
                  border: '1px solid #dde4e8'
                }}>
                  <p style={{ fontSize: '1.2rem', color: '#34495e', margin: '0 0 10px 0' }}>
                    Estimated Price: <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#27ae60' }}>₹{price}</span>
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: '0' }}>
                    Final price may vary based on actual weight and dimensions.
                  </p>
                </div>
                <button
                  type="submit"
                  style={{
                    ...buttonStyle,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </section>
            </form>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @media (max-width: 768px) {
          header > div {
            flex-direction: column;
            gap: 20px;
          }
          
          nav {
            flex-direction: column;
            gap: 15px !important;
          }
          
          main {
            padding: 30px 20px !important;
          }
          
          .form-container {
            padding: 30px 20px !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}