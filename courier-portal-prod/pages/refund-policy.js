import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RefundPolicy() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Refund Policy - NEXYE Courier Services</title>
        <meta name="description" content="NEXYE Courier Refund Policy - Terms and conditions for refunds, cancellations, and returns." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: '#f8f9fa'
      }}>
        
        {/* Header */}
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
              Refund Policy
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
                  1. Overview
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  At NEXYE Courier Services, we strive to provide reliable and efficient delivery. This Refund Policy outlines the conditions under which refunds, cancellations, and returns are handled.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  2. Cancellations
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li><strong>Before Dispatch:</strong> You may cancel an order for a full refund if the package has not yet been dispatched for delivery. Please contact our support team immediately to process the cancellation.</li>
                  <li><strong>After Dispatch:</strong> If a package has already been dispatched, cancellation may not be possible. In such cases, the delivery will proceed, and our return policy (Section 3) may apply.</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  3. Returns and Refunds
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li><strong>Damaged or Lost Items:</strong> If your package is damaged or lost during transit, please contact us within 24 hours of the expected delivery time. We will investigate the issue and, if confirmed, offer a full refund or re-delivery at no additional cost.</li>
                  <li><strong>Incorrect Delivery:</strong> If your package is delivered to the wrong address, please notify us immediately. We will arrange for re-delivery to the correct address or issue a full refund.</li>
                  <li><strong>Customer Error:</strong> Refunds will not be issued for delivery issues arising from incorrect address information provided by the customer.</li>
                  <li><strong>Perishable Goods:</strong> We do not offer refunds for perishable goods that spoil due to delayed acceptance by the recipient.</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  4. Refund Process
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>All refund requests must be submitted through our customer support channels.</li>
                  <li>Refunds will be processed to the original payment method within 5-7 business days after approval.</li>
                  <li>You will receive a confirmation email once your refund has been processed.</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  5. Contact Us
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  If you have any questions about our Refund Policy, please contact us:
                </p>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Email:</strong> support@nexye.com</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Phone:</strong> +91 8888 888 888</p>
                  <p style={{ margin: '0' }}><strong>Address:</strong> NEXYE Courier Services, Mumbai, Maharashtra, India</p>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}