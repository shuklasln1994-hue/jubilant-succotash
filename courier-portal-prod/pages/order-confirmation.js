import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { CheckCircle, Package, MapPin, Clock, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderConfirmation() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  
  // Generate order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `CRR-${timestamp}-${randomStr}`.toUpperCase();
  };

  useEffect(() => {
    // Check if router is ready and has query parameters
    if (!router.isReady) return;

    // Check if user is authenticated
    const storedAuthData = localStorage.getItem('userAuth');
    let authData = null; // Initialize authData
    try {
      authData = storedAuthData ? JSON.parse(storedAuthData) : null;
    } catch (error) {
      console.error('Error parsing auth data:', error);
    }

    if (!authData) {
      // Redirect to auth page if not authenticated
      router.push('/auth');
      return;
    }
    
    // If we have query data, use it
    if (Object.keys(router.query).length > 0) {
      const formattedOrderData = {
        orderId: generateOrderId(),
        pickupAddress: router.query.pickup || "",
        deliveryAddress: router.query.delivery || "",
        packageType: router.query.packageType || "Standard Package",
        weight: router.query.weight || "",
        price: parseInt(router.query.price) || 0,
        estimatedDelivery: "Tomorrow, 2-4 PM",
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
        customerName: router.query.customerName || "",
        customerPhone: router.query.customerPhone || "",
        receiverName: router.query.receiverName || "",
        receiverPhone: router.query.receiverPhone || "",
        authName: router.query.authName || (authData ? authData.name : ""),
        authMobile: router.query.authMobile || (authData ? authData.mobile : ""),
        awbCode: router.query.awbCode || null, // New: AWB Code
        courierName: router.query.courierName || null, // New: Courier Name
        shippingLabelUrl: router.query.shippingLabelUrl || null, // New: Shipping Label URL
      };
      
      setOrderData(formattedOrderData);
    } else {
      // Fallback to sample data if no query parameters (for development/testing)
      // Parse auth data
      let authName = authData ? authData.name : "";
      let authMobile = authData ? authData.mobile : "";
      
      const sampleOrderData = {
        orderId: generateOrderId(),
        pickupAddress: "123 MG Road, Connaught Place, New Delhi, 110001",
        deliveryAddress: "456 Brigade Road, Bengaluru, Karnataka, 560001",
        packageType: "Standard Package",
        weight: "2.5 kg",
        price: 299,
        estimatedDelivery: "Tomorrow, 2-4 PM",
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
        customerName: "John Doe",
        customerPhone: "+91 98765 43210",
        receiverName: "Jane Smith",
        receiverPhone: "+91 98765 12345",
        authName: authName,
        authMobile: authMobile,
        awbCode: "NEXYE123456789", // Default AWB Code
        courierName: "NEXYE Express", // Default Courier Name
      };
      
      setOrderData(sampleOrderData);
    }
  }, [router.isReady, router.query]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order Confirmation - NEXYE | Fast & Reliable Shipping</title>
        <meta name="description" content="Your order has been confirmed. Track your shipment with NEXYE courier service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="📦" />
      </Head>
      
      <div style={styles.container}>
        <div style={styles.maxWidthContainer}>
          
          {/* Header */}
          <Header />
          
          <div style={styles.orderConfirmationHeader}>
            <p style={styles.orderConfirmationHeaderText}>

              Order Confirmation
            </p>
          </div>
          <div style={styles.mainContentCard}>
            {/* Success Header */}
            <div style={styles.successHeader}>
              <div style={styles.successIconContainer}>
                <CheckCircle size={60} color="#1565c0" />
              </div>
              <h1 style={styles.orderConfirmedTitle}>
                Order Confirmed!
              </h1>
              <p style={styles.orderConfirmedSubtitle}>
                Your courier request has been successfully placed
              </p>
            </div>

            {/* Order ID Card */}
            <div style={styles.orderIdCard}>
              <h2 style={styles.orderIdTitle}>
                ORDER ID
              </h2>
              <p style={styles.orderIdValue}>
                {orderData.orderId}
              </p>
              <p style={styles.orderIdSaveMessage}>
                Save this ID to track your order
              </p>
            </div>

            {/* Ship Star Message */}
            <div style={styles.shipStarMessageCard}>
              <div style={styles.shipStarMessageContent}>
                <div style={styles.shipStarIconContainer}>
                  <Package size={30} color="#9c27b0" />
                </div>
                <div>
                  <h3 style={styles.shipStarTitle}>
                    Booking Confirmed with NEXYE Courier
                  </h3>
                  <p style={styles.shipStarText}>
                    Your courier has been successfully booked with NEXYE, our trusted courier partner. 
                    Our team will arrange pickup of your shipment within 24 working hours. Please ensure 
                    your package is ready with proper packaging and labeling for smooth pickup and delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div style={styles.orderDetailsCard}>
              <h2 style={styles.orderDetailsTitle}>
                Order Details
              </h2>
              <div style={styles.orderDetailsGrid}>
                {/* Pickup & Delivery */}
                <div style={styles.pickupDeliveryGrid}>
                  <div style={styles.pickupAddressContainer}>
                    <div style={styles.pickupIconContainer}>
                      <MapPin size={20} color="#2e7d32" />
                    </div>
                    <div>
                      <h3 style={styles.pickupAddressTitle}>
                        Pickup Address
                      </h3>
                      <p style={styles.pickupAddressText}>
                        {orderData.pickupAddress}
                      </p>
                    </div>
                  </div>
                  <div style={styles.deliveryAddressContainer}>
                    <div style={styles.deliveryIconContainer}>
                      <MapPin size={20} color="#1565c0" />
                    </div>
                    <div>
                      <h3 style={styles.deliveryAddressTitle}>
                        Delivery Address
                      </h3>
                      <p style={styles.deliveryAddressText}>
                        {orderData.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div style={styles.packageInfoContainer}>
                  <div style={styles.packageIconContainer}>
                    <Package size={20} color="#e65100" />
                  </div>
                  <div style={styles.packageInfoTextContainer}>
                    <h3 style={styles.packageInfoTitle}>
                      Package Information
                    </h3>
                    <div style={styles.packageInfoDetails}>
                      <span style={styles.packageInfoType}>Type: {orderData.packageType}</span>
                      <span>Weight: {orderData.weight}</span>
                    </div>
                  </div>
                </div>

                {/* New: AWB and Courier Details */}
                {(orderData.awbCode || orderData.courierName) && (
                  <div style={styles.awbCourierDetailsGrid}>
                    {orderData.awbCode && (
                      <div style={styles.packageDetailItem}>
                        <h3 style={styles.packageDetailTitle}>AWB No.</h3>
                        <p style={styles.packageDetailText}>{orderData.awbCode}</p>
                      </div>
                    )}
                    {orderData.courierName && (
                      <div style={styles.packageDetailItem}>
                        <h3 style={styles.packageDetailTitle}>Courier Name</h3>
                        <p style={styles.packageDetailText}>{orderData.courierName}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* New: Shipping Label Download */}
                {orderData.shippingLabelUrl && (
                  <div style={styles.shippingLabelDownloadCard}>
                    <a
                      href={orderData.shippingLabelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.downloadButton}
                    >
                      Download Shipping Label
                    </a>
                  </div>
                )}

                {/* Package Details */}
                <div style={styles.packageDetailsGrid}>
                  <div style={styles.packageDetailItem}>
                    <h3 style={styles.packageDetailTitle}>Package Type</h3>
                    <p style={styles.packageDetailText}>{orderData.packageType}</p>
                  </div>
                  <div style={styles.packageDetailItem}>
                    <h3 style={styles.packageDetailTitle}>Weight</h3>
                    <p style={styles.packageDetailText}>{orderData.weight}</p>
                  </div>
                  <div style={styles.packageDetailItem}>
                    <h3 style={styles.packageDetailTitle}>Price</h3>
                    <p style={styles.packageDetailText}>₹{orderData.price}</p>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div style={styles.estimatedDeliveryCard}>
                  <div style={styles.timingContainer}>
                    <div style={styles.timingIconContainer}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9c27b0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar-check"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                        <path d="m9 16 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 style={styles.timingTitle}>Estimated Delivery</h3>
                      <p style={styles.timingText}>
                        {orderData.estimatedDelivery || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  maxWidthContainer: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  orderConfirmationHeader: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white'
  },
  orderConfirmationHeaderText: {
    fontSize: '1.3rem',
    opacity: '0.9',
    margin: '0'
  },
  mainContentCard: {
    background: 'rgba(255,255,255,0.98)',
    borderRadius: '25px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(10px)',
    marginBottom: '30px'
  },
  successHeader: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  successIconContainer: {
    width: '100px',
    height: '100px',
    background: '#e3f2fd',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto'
  },
  orderConfirmedTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1565c0',
    margin: '0 0 10px 0'
  },
  orderConfirmedSubtitle: {
    fontSize: '1.1rem',
    color: '#546e7a',
    margin: '0'
  },
  orderIdCard: {
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '30px',
    border: '2px solid #2196f3',
    textAlign: 'center'
  },
  orderIdTitle: {
    color: '#1565c0',
    marginBottom: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  orderIdValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1565c0',
    margin: '0 0 10px 0',
    letterSpacing: '1px'
  },
  orderIdSaveMessage: {
    fontSize: '0.9rem',
    color: '#1565c0',
    margin: '0',
    fontWeight: '500'
  },
  shipStarMessageCard: {
    background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '30px',
    border: '2px solid #9c27b0'
  },
  shipStarMessageContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px'
  },
  shipStarIconContainer: {
    background: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  shipStarTitle: {
    color: '#6a1b9a',
    marginBottom: '10px',
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  shipStarText: {
    fontSize: '0.95rem',
    color: '#6a1b9a',
    margin: '0',
    lineHeight: '1.6'
  },
  orderDetailsCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '30px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0'
  },
  orderDetailsTitle: {
    color: '#424242',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: '700'
  },
  orderDetailsGrid: {
    display: 'grid',
    gap: '20px'
  },
  pickupDeliveryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  pickupAddressContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  pickupIconContainer: {
    background: '#e8f5e9',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  pickupAddressTitle: {
    color: '#424242',
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: '600'
  },
  pickupAddressText: {
    fontSize: '0.95rem',
    color: '#616161',
    margin: '0'
  },
  deliveryAddressContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  deliveryIconContainer: {
    background: '#e3f2fd',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  deliveryAddressTitle: {
    color: '#424242',
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: '600'
  },
  deliveryAddressText: {
    fontSize: '0.95rem',
    color: '#616161',
    margin: '0'
  },
  packageInfoContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  packageIconContainer: {
    background: '#fff3e0',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  packageInfoTextContainer: {
    flex: 1
  },
  packageInfoTitle: {
    color: '#424242',
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: '600'
  },
  packageInfoDetails: {
    fontSize: '0.95rem',
    color: '#616161',
    marginTop: '5px'
  },
  packageInfoType: {
    display: 'inline-block',
    marginRight: '15px'
  },
  timingContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  timingIconContainer: {
    background: '#f3e5f5',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  timingTitle: {
    color: '#424242',
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: '600'
  },
  timingText: {
    fontSize: '0.95rem',
    color: '#616161',
    margin: '0'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  priceIconContainer: {
    background: '#e8f5e9',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  priceDetailsContainer: {
    flex: 1
  },
  priceAmountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceTitle: {
    color: '#424242',
    margin: '0',
    fontSize: '1rem',
    fontWeight: '600'
  },
  priceValue: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#424242',
    margin: '0'
  },
  priceNote: {
    fontSize: '0.85rem',
    color: '#757575',
    marginTop: '5px'
  },
  customerInfoCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '30px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0'
  },
  customerInfoTitle: {
    color: '#424242',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: '700'
  },
  customerInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  senderInfoCard: {
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #90caf9'
  },
  senderTitle: {
    color: '#1565c0',
    marginBottom: '15px',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  senderDetails: {
    display: 'grid',
    gap: '10px',
    fontSize: '0.95rem',
    color: '#1565c0'
  },
  senderDetailItem: {
    margin: '0'
  },
  senderDetailLabel: {
    fontWeight: '600',
    marginRight: '5px'
  },
  receiverInfoCard: {
    background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #ce93d8'
  },
  receiverTitle: {
    color: '#6a1b9a',
    marginBottom: '15px',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  receiverDetails: {
    display: 'grid',
    gap: '10px',
    fontSize: '0.95rem',
    color: '#6a1b9a'
  },
  receiverDetailItem: {
    margin: '0'
  },
  receiverDetailLabel: {
    fontWeight: '600',
    marginRight: '5px'
  },
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px'
  },
  actionButtonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  trackOrderButton: {
    background: 'linear-gradient(135deg, #1976d2, #1565c0)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'transform 0.2s ease-in-out'
  },
  printReceiptButton: {
    background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
    color: '#424242',
    padding: '15px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'transform 0.2s ease-in-out'
  },
  newOrderButton: {
    background: 'linear-gradient(135deg, #43a047, #2e7d32)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'transform 0.2s ease-in-out'
  },
  
  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    maxWidthContainer: {
      padding: '0 15px'
    },
    mainContentCard: {
      padding: '20px'
    },
    orderConfirmedTitle: {
      fontSize: '2rem'
    },
    orderConfirmedSubtitle: {
      fontSize: '1rem'
    },
    orderIdCard: {
      padding: '20px'
    },
    orderIdValue: {
      fontSize: '1.5rem'
    },
    shipStarMessageCard: {
      padding: '20px'
    },
    shipStarMessageContent: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    shipStarIconContainer: {
      margin: '0 auto 10px auto'
    },
    orderDetailsCard: {
      padding: '20px'
    },
    orderDetailsTitle: {
      fontSize: '1.2rem'
    },
    pickupDeliveryGrid: {
      gridTemplateColumns: '1fr'
    },
    customerInfoGrid: {
      gridTemplateColumns: '1fr'
    },
    actionButtonsGrid: {
      gridTemplateColumns: '1fr'
    }
  },
  awbCourierDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
    padding: '20px',
    background: '#f0f4c3',
    borderRadius: '15px',
    border: '1px solid #cddc39'
  },
  shippingLabelDownloadCard: {
    background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '30px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
    border: '1px solid #00bcd4',
    textAlign: 'center'
  },
  downloadButton: {
    background: 'linear-gradient(135deg, #00bcd4, #0097a7)',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
  }
};