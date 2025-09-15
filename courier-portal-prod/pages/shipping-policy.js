import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ShippingPolicy() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Shipping Policy - NEXYE Courier Services</title>
        <meta name="description" content="NEXYE Courier Shipping Policy - Guidelines, procedures, and terms for our shipping services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: '#f8f9fa'
      }}>
        
        <Header />

        {/* Main Content */}
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#333',
              margin: '0 0 10px 0',
              textAlign: 'center'
            }}>
              Shipping Policy
            </h1>
            
            <p style={{
              textAlign: 'center',
              color: '#666',
              margin: '0 0 40px 0',
              fontSize: '1rem'
            }}>
              Last updated: September 14, 2025
            </p>

            <div style={{ lineHeight: '1.8', color: '#444' }}>
              
              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  1. Service Areas
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  NEXYE provides courier services across India, covering:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li><strong>Metro Cities:</strong> Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad</li>
                  <li><strong>Tier 1 Cities:</strong> All major state capitals and commercial centers</li>
                  <li><strong>Tier 2 & 3 Cities:</strong> Over 500 cities and towns across India</li>
                  <li><strong>Rural Areas:</strong> Selected rural locations with partner networks</li>
                </ul>
                <p>
                  For specific serviceable areas, please check our pincode serviceability tool or contact customer support.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  2. Shipping Options
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#667eea', marginBottom: '10px' }}>
                    🚀 Express Delivery (1-2 Business Days)
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Available for metro to metro shipments</li>
                    <li>Priority handling and faster transit</li>
                    <li>Real-time tracking updates</li>
                    <li>Premium customer support</li>
                    <li>Starting from ₹450</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#28a745', marginBottom: '10px' }}>
                    📦 Standard Delivery (2-4 Business Days)
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Pan-India coverage including remote areas</li>
                    <li>Cost-effective shipping solution</li>
                    <li>SMS and email notifications</li>
                    <li>Basic insurance coverage included</li>
                    <li>Starting from ₹270</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#dc3545', marginBottom: '10px' }}>
                    ⚡ Same Day Delivery
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Available within city limits</li>
                    <li>Delivery within 4-8 hours</li>
                    <li>Perfect for urgent shipments</li>
                    <li>Live tracking and updates</li>
                    <li>Starting from ₹200 (city specific)</li>
                  </ul>
                </div>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  3. Package Requirements
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    Weight & Dimensions
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li><strong>Minimum Weight:</strong> 100 grams</li>
                    <li><strong>Maximum Weight:</strong> 50 kg per package</li>
                    <li><strong>Maximum Dimensions:</strong> 120cm x 80cm x 80cm</li>
                    <li><strong>Volumetric Weight:</strong> Calculated as (L x W x H) / 5000</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    Packaging Guidelines
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Use sturdy boxes or bubble wrap for fragile items</li>
                    <li>Seal packages securely with quality tape</li>
                    <li>Remove or cover old shipping labels</li>
                    <li>Include proper cushioning for delicate items</li>
                    <li>Ensure packages can withstand normal handling</li>
                  </ul>
                </div>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  4. Pickup Services
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li><strong>Free Pickup:</strong> Available for shipments above ₹500</li>
                  <li><strong>Scheduled Pickup:</strong> Same day or next day pickup available</li>
                  <li><strong>Pickup Windows:</strong> 9:00 AM to 6:00 PM on business days</li>
                  <li><strong>Multiple Packages:</strong> Up to 10 packages per pickup</li>
                  <li><strong>Pickup Fee:</strong> ₹50 for orders below ₹500</li>
                  <li><strong>Re-pickup:</strong> Additional ₹30 if package not ready</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  5. Delivery Process
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    Delivery Attempts
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Up to 3 delivery attempts will be made</li>
                    <li>24-48 hour gap between delivery attempts</li>
                    <li>SMS/call notification before each attempt</li>
                    <li>Package returned to sender after failed attempts</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    Delivery Confirmation
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Digital proof of delivery (POD)</li>
                    <li>Recipient signature or OTP verification</li>
                    <li>Photo confirmation for valuable items</li>
                    <li>Instant delivery notification to sender</li>
                  </ul>
                </div>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  6. Pricing Structure
                </h2>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                    Standard Pricing (Pan India)
                  </h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                      <strong style={{ color: '#28a745' }}>Up to 1 kg</strong><br/>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333' }}>₹270</span>
                    </div>
                    <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                      <strong style={{ color: '#28a745' }}>Up to 2 kg</strong><br/>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333' }}>₹320</span>
                    </div>
                    <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                      <strong style={{ color: '#28a745' }}>Each additional kg</strong><br/>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333' }}>₹100</span>
                    </div>
                  </div>
                </div>

                <p style={{ marginBottom: '15px' }}>
                  <strong>Additional Charges:</strong>
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Fuel surcharge: As applicable</li>
                  <li>Remote area delivery: ₹50-100</li>
                  <li>COD charges: 2% of COD amount (min ₹30)</li>
                  <li>Insurance: 0.5% of declared value</li>
                  <li>Return charges: Same as forward charges</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  7. Tracking & Updates
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Real-time tracking via our website/app</li>
                  <li>SMS updates at key milestones</li>
                  <li>Email notifications for status changes</li>
                  <li>Customer service updates via phone</li>
                  <li>Delivery prediction with time estimates</li>
                  <li>Photo confirmation for delivered packages</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  8. Special Handling Services
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    Fragile Items
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Special "FRAGILE" labeling and handling</li>
                    <li>Extra cushioning and protective packaging</li>
                    <li>Gentle handling throughout transit</li>
                    <li>Additional charges: ₹50 per package</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    High-Value Items
                  </h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                    <li>Enhanced security measures</li>
                    <li>Mandatory insurance coverage</li>
                    <li>Signature required delivery</li>
                    <li>Photo/video proof of delivery</li>
                    </ul>
                </div>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  9. Customer Support
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  Our customer support team is available to assist you:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li><strong>Phone Support:</strong> +91 8888 888 888 (Mon-Sat 9AM-7PM)</li>
                  <li><strong>Email Support:</strong> support@nexye.com (24/7 response)</li>
                  <li><strong>Live Chat:</strong> Available on website during business hours</li>
                  <li><strong>WhatsApp Support:</strong> +91 8888 888 888</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  10. Policy Updates
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  This shipping policy may be updated from time to time to reflect changes in our services, pricing, or operational procedures. We will notify customers of significant changes through:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Email notifications to registered users</li>
                  <li>Website announcements</li>
                  <li>SMS alerts for pricing changes</li>
                </ul>
              </section>

              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                padding: '25px',
                borderRadius: '15px',
                textAlign: 'center',
                marginTop: '40px'
              }}>
                <h3 style={{ margin: '0 0 15px 0', fontWeight: '700', color: '#1565c0', fontSize: '1.3rem' }}>
                  📞 Need Help?
                </h3>
                <p style={{ margin: '0 0 20px 0', color: '#1565c0' }}>
                  Have questions about our shipping policy? Our customer support team is here to help!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a 
                    href="tel:+918888888888" 
                    style={{
                      background: 'white',
                      color: '#1565c0',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    📞 Call Us
                  </a>
                  <a 
                    href="mailto:support@nexye.com" 
                    style={{
                      background: 'white',
                      color: '#1565c0',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    📧 Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}