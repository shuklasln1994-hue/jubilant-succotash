import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function CourierForm() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    senderPincode: '',
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverPincode: '',
    packageWeight: '',
    dimensions: '',
    description: '',
    serviceType: 'standard'
  })
  
  const [price, setPrice] = useState(0)
  const [priceBreakdown, setPriceBreakdown] = useState('Enter weight to calculate')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        !formData.description) {
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Prepare data for confirmation page
      const orderData = {
        price: price,
        pickup: `${formData.senderAddress}, ${formData.senderPincode}`,
        delivery: `${formData.receiverAddress}, ${formData.receiverPincode}`,
        customerName: formData.senderName,
        customerPhone: formData.senderPhone,
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone,
        packageType: formData.serviceType === 'standard' ? 'Standard Package' : 'Express Package',
        weight: `${formData.packageWeight} kg`,
        dimensions: formData.dimensions || 'Not specified',
        description: formData.description,
        serviceType: formData.serviceType
      }

      // Redirect to confirmation page with order data
      router.push({
        pathname: '/order-confirmation',
        query: orderData
      })
      
    } catch (error) {
      alert('Error placing order. Please try again.')
      console.error('Order error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Ship Your Courier - NEXYE | Fast & Reliable Shipping</title>
        <meta name="description" content="Ship your packages with real-time price calculation. Fast, reliable courier service with Delhivery integration." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              margin: '0 0 10px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontWeight: '700'
            }}>
              📦 NEXYE Courier
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9', margin: '0' }}>
              Fast, Reliable & Affordable Shipping Across India
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: '25px',
            padding: '40px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)'
          }}>

            {/* Sender Section */}
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
              padding: '30px',
              borderRadius: '20px',
              marginBottom: '30px',
              border: '2px solid #2196f3'
            }}>
              <h2 style={{ 
                color: '#1565c0', 
                marginBottom: '25px',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '12px', fontSize: '1.8rem' }}>👤</span> 
                Sender Information
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1565c0' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #e1f5fe',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2196f3'}
                    onBlur={(e) => e.target.style.borderColor = '#e1f5fe'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1565c0' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #e1f5fe',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2196f3'}
                    onBlur={(e) => e.target.style.borderColor = '#e1f5fe'}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1565c0' }}>
                  Complete Address *
                </label>
                <textarea
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="House/Flat No, Street, Locality, City, State"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e1f5fe',
                    borderRadius: '10px',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div style={{ marginTop: '20px', width: '250px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1565c0' }}>
                  Pincode *
                </label>
                <input
                  type="text"
                  name="senderPincode"
                  value={formData.senderPincode}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="6-digit pincode"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e1f5fe',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Receiver Section */}
            <div style={{
              background: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
              padding: '30px',
              borderRadius: '20px',
              marginBottom: '30px',
              border: '2px solid #e91e63'
            }}>
              <h2 style={{ 
                color: '#ad1457', 
                marginBottom: '25px',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '12px', fontSize: '1.8rem' }}>🎯</span> 
                Receiver Information
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#ad1457' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #fce4ec',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#ad1457' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="receiverPhone"
                    value={formData.receiverPhone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #fce4ec',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#ad1457' }}>
                  Complete Address *
                </label>
                <textarea
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="House/Flat No, Street, Locality, City, State"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #fce4ec',
                    borderRadius: '10px',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div style={{ marginTop: '20px', width: '250px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#ad1457' }}>
                  Pincode *
                </label>
                <input
                  type="text"
                  name="receiverPincode"
                  value={formData.receiverPincode}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="6-digit pincode"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #fce4ec',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Package Section */}
            <div style={{
              background: 'linear-gradient(135deg, #fff3e0, #ffcc80)',
              padding: '30px',
              borderRadius: '20px',
              marginBottom: '30px',
              border: '2px solid #ff9800'
            }}>
              <h2 style={{ 
                color: '#e65100', 
                marginBottom: '25px',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '12px', fontSize: '1.8rem' }}>📦</span> 
                Package Details
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#e65100' }}>
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    name="packageWeight"
                    value={formData.packageWeight}
                    onChange={handleWeightChange}
                    required
                    placeholder="e.g. 1.5"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #fff3e0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#e65100' }}>
                    Dimensions (L×W×H cm)
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g. 15×10×15"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #fff3e0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#e65100' }}>
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #fff3e0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="standard">Standard (2-4 days)</option>
                    <option value="express">Express (1-2 days)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#e65100' }}>
                  Package Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="What are you shipping? (e.g. Electronics, Clothes, Documents, Books)"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #fff3e0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* Price Display */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              marginBottom: '30px',
              boxShadow: '0 15px 30px rgba(102,126,234,0.4)',
              border: '3px solid rgba(255,255,255,0.2)'
            }}>
              <h2 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '1.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ marginRight: '12px', fontSize: '2rem' }}>💰</span> 
                Shipping Cost
              </h2>
              <div style={{ 
                fontSize: '4rem', 
                fontWeight: '800', 
                textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                marginBottom: '15px',
                lineHeight: '1'
              }}>
                ₹{price}
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                opacity: '0.95',
                background: 'rgba(255,255,255,0.1)',
                padding: '10px 20px',
                borderRadius: '10px',
                display: 'inline-block'
              }}>
                {priceBreakdown}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={price === 0 || isSubmitting}
              style={{
                width: '100%',
                padding: '20px',
                background: price > 0 && !isSubmitting
                  ? 'linear-gradient(135deg, #28a745, #20c997)' 
                  : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.3rem',
                fontWeight: '700',
                cursor: price > 0 && !isSubmitting ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: price > 0 && !isSubmitting
                  ? '0 10px 25px rgba(40,167,69,0.4)' 
                  : 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {isSubmitting ? '⏳ Processing Order...' : '📦 Place Shipping Order'}
            </button>
            
            <p style={{ 
              textAlign: 'center', 
              marginTop: '20px', 
              fontSize: '14px', 
              color: '#666',
              lineHeight: '1.5'
            }}>
              🔒 Your information is secure and will be used only for shipping purposes<br/>
              📱 You'll receive SMS updates on order status
            </p>
          </form>
        </div>
      </div>
    </>
  )
}