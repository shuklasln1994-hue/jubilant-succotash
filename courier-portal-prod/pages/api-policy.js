import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function APIPolicy() {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '100px auto',
      padding: '0 20px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    lastUpdated: {
      color: '#666',
      textAlign: 'center',
      marginBottom: '40px',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    content: {
      color: '#444',
      lineHeight: '1.8',
      fontSize: '1.1rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: '20px 0',
    },
    listItem: {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    bullet: {
      color: '#3b82f6',
      marginRight: '5px',
    },
    contact: {
      background: '#f8fafc',
      padding: '30px',
      borderRadius: '10px',
      marginTop: '40px',
    },
    email: {
      color: '#3b82f6',
      textDecoration: 'none',
    },
  };

  return (
    <>
      <Head>
        <title>API Usage & Integration Policy - NEXYE</title>
        <meta name="description" content="Learn about how NEXYE uses and integrates various APIs to provide seamless courier services." />
      </Head>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>API Usage & Integration Policy</h1>
        <p style={styles.lastUpdated}>Last Updated: September 15, 2025</p>

        <div style={styles.section}>
          <p style={styles.content}>
            At Nexye.shop, we blend technology, cultural identity, and operational precision to deliver seamless digital experiences. 
            This policy outlines how we use APIs—including those from logistics partners like Shiprocket and Borzo—to power our services 
            while maintaining full compliance and data integrity.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>🔗</span> API Integrations We Use
          </h2>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>🚚</span> Shiprocket API: How We Use It
          </h2>
          <p style={styles.content}>We use Shiprocket's API to enable:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Order Syncing: Securely syncing orders with Shiprocket's backend</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Label Generation: Instant shipping label creation</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Tracking Updates: Real-time shipment status monitoring</span>
            </li>
          </ul>
          <p style={styles.content}>
            All API calls are authenticated using dedicated credentials stored securely. No credentials are shared externally.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>⚡</span> Borzo Delivery API: Same-Day Logistics
          </h2>
          <p style={styles.content}>
            To offer same-day delivery in select cities, Nexye.shop integrates with Borzo Delivery—a fast, 
            intracity courier service known for reliability and affordability.
          </p>
          <p style={styles.content}>We use Borzo's API to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Schedule Same-Day Pickups: Orders placed before noon are eligible for same-day delivery via Borzo's courier network</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Real-Time Tracking: Customers can monitor their delivery status through Nexye.shop's dashboard, powered by Borzo's tracking endpoints</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Optimized Routing: Borzo's system dynamically assigns couriers based on proximity and delivery urgency</span>
            </li>
          </ul>
          <p style={styles.content}>
            Borzo API calls are made using secure tokens and are limited to Nexye.shop's infrastructure. 
            We do not expose or resell Borzo's API functionality.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>🛡️</span> Compliance & Data Protection
          </h2>
          <p style={styles.content}>We strictly adhere to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Credential Security: All API keys are encrypted and used only within Nexye.shop's backend</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>No Third-Party Exposure: Aggregators or middleware act only as internal proxies</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Rate-Limit Respect: API usage is optimized to avoid endpoint abuse</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>User Privacy: Delivery data is used solely for fulfillment and never shared externally</span>
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>🧠</span> Aggregator Use Clarification
          </h2>
          <p style={styles.content}>
            We occasionally use internal API aggregators to streamline development and testing. These tools:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Act as secure proxies for our own authenticated API calls</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Are used only within Nexye.shop's infrastructure</span>
            </li>
            <li style={styles.listItem}>
              <span style={styles.bullet}>•</span>
              <span>Do not expose Shiprocket or Borzo APIs externally</span>
            </li>
          </ul>
          <p style={styles.content}>
            This setup complies with both providers' terms of service and ensures safe, efficient integration.
          </p>
        </div>

        <div style={styles.contact}>
          <h2 style={styles.sectionTitle}>
            <span>📬</span> Questions or Concerns?
          </h2>
          <p style={styles.content}>For inquiries about our API usage or delivery services:</p>
          <p style={styles.content}>
            Email: <a href="mailto:support@nexye.shop" style={styles.email}>support@nexye.shop</a>
            <br />
            Founder Contact: <a href="mailto:devansu@nexye.shop" style={styles.email}>devansu@nexye.shop</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}