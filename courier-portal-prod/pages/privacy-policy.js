import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Privacy Policy - NEXYE Courier Services</title>
        <meta name="description" content="NEXYE Courier Privacy Policy - How we collect, use, and protect your personal information." />
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
              Privacy Policy
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
                  1. Information We Collect
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This includes:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Shipping addresses (pickup and delivery locations)</li>
                  <li>Package details and shipping preferences</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Communication records when you contact our support team</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  2. How We Use Your Information
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We use the information we collect to:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Process and fulfill your shipping orders</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Send you service updates and tracking information</li>
                  <li>Improve our services and develop new features</li>
                  <li>Comply with legal obligations and resolve disputes</li>
                  <li>Send promotional communications (with your consent)</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  3. Information Sharing
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We may share your information in the following situations:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li><strong>Service Providers:</strong> We share information with third-party service providers who help us operate our business</li>
                  <li><strong>Delivery Partners:</strong> We share necessary information with our delivery partners to complete shipments</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  4. Data Security
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and employee training</li>
                  <li>Secure payment processing through certified providers</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  5. Your Rights
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  You have the right to:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your account and personal information</li>
                  <li>Opt out of promotional communications</li>
                  <li>Request data portability</li>
                  <li>File complaints with relevant authorities</li>
                </ul>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  6. Cookies and Tracking
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  We use cookies and similar tracking technologies to enhance your experience on our website. These help us:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  7. Data Retention
                </h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  8. Children's Privacy
                </h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  10. Contact Us
                </h2>
                <p style={{ marginBottom: '15px' }}>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Email:</strong> privacy@nexye.com</p>
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