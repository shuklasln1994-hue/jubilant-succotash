import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function OrderHistoryPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real application, you would fetch data from an API
        // For now, we'll use dummy data
        const dummyOrders = [
          {
            id: 'ORD001',
            date: '2023-10-26',
            status: 'Delivered',
            items: [
              { name: 'Package A', quantity: 1, price: 100 },
              { name: 'Package B', quantity: 1, price: 150 },
            ],
            total: 250,
          },
          {
            id: 'ORD002',
            date: '2023-10-20',
            status: 'In Transit',
            items: [
              { name: 'Package C', quantity: 1, price: 200 },
            ],
            total: 200,
          },
        ]
        setOrders(dummyOrders)
      } catch (err) {
        setError('Failed to fetch orders.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      <Head>
        <title>Order History - NEXYE Courier</title>
        <meta name="description" content="View your past orders and their statuses with NEXYE Courier." />
      </Head>
      <div style={{
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <Header />

        <main style={{
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            Your Order History
          </h1>

          {loading && <p style={{ textAlign: 'center' }}>Loading orders...</p>}
          {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

          {!loading && !error && orders.length === 0 && (
            <p style={{ textAlign: 'center' }}>No past orders found.</p>
          )}

          {!loading && !error && orders.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {orders.map(order => (
                <div key={order.id} style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '15px'
                  }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ color: '#555', marginBottom: '5px' }}>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p style={{ color: '#555', marginBottom: '15px' }}>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <h4 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px' }}>Items:</h4>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0 0 15px 0' }}>
                    {order.items.map((item, idx) => (
                      <li key={idx} style={{ color: '#666', marginBottom: '3px' }}>
                        {item.name} (x{item.quantity}) - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                  <p style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#333',
                    borderTop: '1px solid #eee',
                    paddingTop: '15px',
                    margin: '15px 0 0 0'
                  }}>
                    Total: ₹{order.total}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}