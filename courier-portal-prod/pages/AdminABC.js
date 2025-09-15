import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../components/AdminSidebar';

const AdminABC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // New state for active tab
  const [showAlert, setShowAlert] = useState(false);
  
  const handleForgotPassword = () => {
    setShowResetPassword(true);
    setLoginError(''); // Clear any login errors when trying to reset password
  };
  
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setResetPasswordError('New password and confirm password do not match.');
      return;
    }
    // In a real application, you would send a request to your backend to reset the password.
    // For this demonstration, we'll just update the hardcoded password in the state.
    // This is NOT secure for a production environment.
    alert('Password reset functionality is not fully implemented. In a real app, this would involve a backend call.');
    setResetPasswordError('');
    setShowResetPassword(false);
    setNewPassword('');
    setConfirmNewPassword('');
  };
  
  // Removed the previous useEffect for localStorage authentication
  
  useEffect(() => {
    if (!isAdminAuthenticated) return;
  
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setErrorOrders(error);
      } finally {
        setLoadingOrders(false);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setErrorUsers(error);
      } finally {
        setLoadingUsers(false);
      }
    };
  
    fetchOrders();
    fetchUsers();
  }, [isAdminAuthenticated]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    // For demonstration purposes, hardcoded admin credentials
    if (adminUsername === 'admin' && adminPassword === 'admin') {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };
  
   if (!isAdminAuthenticated) {
     return (
       <div>
         <h1>Admin Login</h1>
         {!showResetPassword ? (
           <form onSubmit={handleLogin}>
             <div>
               <label htmlFor="username">Username:</label>
               <input
                 type="text"
                 id="username"
                 value={adminUsername}
                 onChange={(e) => setAdminUsername(e.target.value)}
                 required
               />
             </div>
             <div>
               <label htmlFor="password">Password:</label>
               <input
                 type="password"
                 id="password"
                 value={adminPassword}
                 onChange={(e) => setAdminPassword(e.target.value)}
                 required
               />
             </div>
             {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
             <button type="submit">Login</button>
             <p><a href="#" onClick={handleForgotPassword}>Forgot Password?</a></p>
           </form>
         ) : (
           <form onSubmit={handleResetPassword}>
             <h2>Reset Password</h2>
             <div>
               <label htmlFor="newPassword">New Password:</label>
               <input
                 type="password"
                 id="newPassword"
                 value={newPassword}
                 onChange={(e) => setNewPassword(e.target.value)}
                 required
               />
             </div>
             <div>
               <label htmlFor="confirmNewPassword">Confirm New Password:</label>
               <input
                 type="password"
                 id="confirmNewPassword"
                 value={confirmNewPassword}
                 onChange={(e) => setConfirmNewPassword(e.target.value)}
                 required
               />
             </div>
             {resetPasswordError && <p style={{ color: 'red' }}>{resetPasswordError}</p>}
             <button type="submit">Reset Password</button>
             <p><a href="#" onClick={() => setShowResetPassword(false)}>Back to Login</a></p>
           </form>
         )}
       </div>
     );
   }

   if (loadingOrders || loadingUsers) {
     return <p>Loading Admin data...</p>;
   }
  
   if (errorOrders) {
     return <p>Error loading orders: {errorOrders.message}</p>;
   }
  
   if (errorUsers) {
     return <p>Error loading users: {errorUsers.message}</p>;
   }

   const renderOrders = (status) => {
     const filteredOrders = orders.filter(order => order.status === status);
     if (filteredOrders.length === 0) {
       return <p>No {status.replace('_', ' ')} orders.</p>;
     }
     return (
       <ul>
         {filteredOrders.map(order => (
           <li key={order.orderId}>
             <strong>Order ID:</strong> {order.orderId} -
             <strong>Status:</strong> {order.status} -
             <strong>Customer:</strong> {order.customerName} -
             <strong>Delivery:</strong> {order.deliveryAddress}
           </li>
         ))}
       </ul>
     );
   };

   return (
     <div style={{ display: 'flex' }}>
       <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
       <div style={{ flexGrow: 1, padding: '20px' }}>
           <>
             <h1>Admin Portal</h1>
             {activeTab === 'dashboard' && (
               <div>
                 <h2>Dashboard Content</h2>
                 <p>Welcome to the Admin Dashboard!</p>
                 {/* Add dashboard specific content here */}
               </div>
             )}
             {activeTab === 'orders' && (
               <>
                 <h2>Orders</h2>
                 <h3>Completed Orders</h3>
                 {renderOrders('completed')}
                 <h3>Failed Orders</h3>
                 {renderOrders('failed')}
                 <h3>Pending Payment Orders</h3>
                 {renderOrders('pending_payment')}
                 <h3>Out for Delivery Orders</h3>
                 {renderOrders('out_for_delivery')}
               </>
             )}
             {activeTab === 'users' && (
               <>
                 <h2>Users</h2>
                 <ul>
                   {users.map(user => (
                     <li key={user.id}>
                       <strong>Name:</strong> {user.name} -
                       <strong>Phone:</strong> {user.phone} -
                       <strong>Address:</strong> {user.address} -
                       <strong>Email:</strong> {user.email}
                     </li>
                   ))}
                 </ul>
               </>
             )}
           </>
       </div>
     </div>
   );
 };

 export default AdminABC;