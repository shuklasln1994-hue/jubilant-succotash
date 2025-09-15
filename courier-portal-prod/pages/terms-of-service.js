import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsOfService() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Terms of Service - NEXYE Courier Services</title>
        <meta name="description" content="NEXYE Courier Terms of Service - Rules and conditions for using our courier services." />
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
              Terms of Service
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
                  1. Acceptance of Terms
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  By accessing and using NEXYE Courier Services ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  2. Service Description
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  NEXYE provides courier and logistics services including but not limited to:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Package pickup and delivery services</li>
                  <li>Express and standard shipping options</li>
                  <li>Package tracking and status updates</li>
                  <li>Customer support services</li>
                  <li>Online booking and management platform</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  3. User Responsibilities
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  By using our services, you agree to:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Provide accurate and complete information when booking shipments</li>
                  <li>Ensure packages are properly packed and labeled</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not ship prohibited or restricted items</li>
                  <li>Pay all applicable fees and charges</li>
                  <li>Be available for package pickup and delivery</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  4. Prohibited Items
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  The following items are strictly prohibited from shipment:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Illegal drugs, narcotics, and controlled substances</li>
                  <li>Weapons, firearms, and explosives</li>
                  <li>Hazardous materials and chemicals</li>
                  <li>Perishable food items without proper packaging</li>
                  <li>Live animals or plants</li>
                  <li>Currency, coins, and negotiable instruments</li>
                  <li>Pornographic or obscene materials</li>
                  <li>Items that violate intellectual property rights</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  5. Pricing and Payment
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Shipping charges are calculated based on weight, dimensions, distance, and service type</li>
                  <li>All prices are displayed in Indian Rupees (INR)</li>
                  <li>Payment is due at the time of service or as agreed upon</li>
                  <li>We reserve the right to change our pricing with notice</li>
                  <li>Additional charges may apply for special handling or services</li>
                  <li>Taxes and duties are the responsibility of the shipper/recipient</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  6. Liability and Insurance
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  Our liability is limited as follows:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Standard liability coverage up to ₹5,000 per shipment</li>
                  <li>Additional insurance available for high-value items</li>
                  <li>No liability for indirect, incidental, or consequential damages</li>
                  <li>Claims must be reported within 7 days of delivery</li>
                  <li>We are not liable for delays due to circumstances beyond our control</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  7. Delivery Terms
                </h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Multiple delivery attempts may be made at our discretion</li>
                  <li>Packages may be left with authorized recipients</li>
                  <li>Delivery confirmation constitutes proof of delivery</li>
                  <li>Undelivered packages may be returned to sender after reasonable attempts</li>
                  <li>Storage fees may apply for undelivered packages</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  8. Force Majeure
                </h2>
                <p>
                  We shall not be liable for any failure or delay in performance under this Agreement which is due to earthquake, flood, fire, storm, natural disaster, act of God, war, terrorism, armed conflict, labor strike, lockout, boycott, or other similar events beyond our reasonable control.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  9. Privacy and Data Protection
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We respect your privacy and are committed to protecting your personal data. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p>
                  By using our services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  10. Intellectual Property
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  All content on our website and platform, including but not limited to text, graphics, logos, images, and software, is the property of NEXYE or its content suppliers and is protected by intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works of our content without written permission.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  11. Termination
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We reserve the right to terminate or suspend your account and access to our services at any time, with or without cause, and with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                </p>
                <p>
                  Upon termination, your right to use the service will cease immediately.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  12. Dispute Resolution
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  Any disputes arising from or relating to these Terms or our services shall be resolved through:
                </p>
                <ol style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Good faith negotiations between the parties</li>
                  <li>Mediation, if negotiations fail</li>
                  <li>Binding arbitration under Indian arbitration laws</li>
                </ol>
                <p>
                  The courts of Mumbai, Maharashtra shall have exclusive jurisdiction over any disputes.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  13. Governing Law
                </h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of India. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts of Mumbai, Maharashtra.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  14. Changes to Terms
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the service after changes are posted constitutes acceptance of the modified Terms.
                </p>
                <p>
                  We recommend reviewing these Terms periodically to stay informed of any updates.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  15. Severability
                </h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  16. Contact Information
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Email:</strong> legal@nexye.com</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Phone:</strong> +91 8888 888 888</p>
                  <p style={{ margin: '0' }}><strong>Address:</strong> NEXYE Courier Services, Mumbai, Maharashtra, India</p>
                </div>
              </section>

              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                marginTop: '40px'
              }}>
                <p style={{ margin: '0', fontWeight: '600', color: '#1565c0' }}>
                  By using NEXYE Courier Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}