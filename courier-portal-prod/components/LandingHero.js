export default function LandingHero() {
  return (
    <section style={styles.hero}>
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.heroContentLeft}>
        <h1 style={styles.heading}>Redefining Domestic <br /> Shipping-Seamless in <br /> Every Way</h1>
        <p style={styles.subtext}>Go big with growth, we'll handle nationwide shipping—anywhere, anytime.</p>
        <button style={styles.ctaPrimary}>Sign Up for Free</button>
      </div>
      <div style={styles.heroContentRight}>
        <div style={styles.courierPartnerCard}>
          <h3 style={styles.cardTitle}>Top Courier Partner</h3>
          <div style={styles.partnerList}>
            <div style={styles.partnerItem}>Amazon Shipping</div>
            <div style={styles.partnerItem}>Blue Dart</div>
            <div style={styles.partnerItem}>Delhivery</div>
          </div>
        </div>
        <div style={styles.orderDetailsCard}>
          <h3 style={styles.cardTitle}>Order Details</h3>
          <div style={styles.orderInfo}>
            <span>Order ID: #12345678</span>
            <span>Status: Delivered</span>
          </div>
        </div>
        <div style={styles.integrationDiagram}>
          <div style={styles.centerLogo}>N</div>
          <div style={styles.connectorLine}></div>
          <div style={styles.platformIcons}>
            <div style={styles.platformIcon}>M</div>
            <div style={styles.platformIcon}>W</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '80px 50px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    marginBottom: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  heroContentLeft: {
    flex: '1',
    maxWidth: '50%',
    zIndex: 1,
  },
  heroContentRight: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    zIndex: 1,
  },
  courierPartnerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    color: '#333',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '15px',
    color: '#333',
  },
  partnerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  partnerItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  orderDetailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    color: '#333',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  integrationDiagram: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  centerLogo: {
    width: '40px',
    height: '40px',
    backgroundColor: '#764ba2',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  connectorLine: {
    width: '2px',
    height: '30px',
    backgroundColor: '#764ba2',
  },
  platformIcons: {
    display: 'flex',
    gap: '15px',
  },
  platformIcon: {
    width: '30px',
    height: '30px',
    backgroundColor: '#764ba2',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  circle1: {
    position: 'absolute',
    top: '-50px',
    left: '-50px',
    width: '120px',
    height: '120px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
  },
  circle2: {
    position: 'absolute',
    bottom: '-60px',
    right: '-60px',
    width: '140px',
    height: '140px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
  },
  heading: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  subtext: {
    fontSize: '1.2rem',
    fontWeight: '300',
    marginBottom: '40px',
    lineHeight: '1.5',
  },
  ctaPrimary: {
    backgroundColor: '#fff',
    color: '#764ba2',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    },
  },
};