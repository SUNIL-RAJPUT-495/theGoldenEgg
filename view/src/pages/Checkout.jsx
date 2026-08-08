import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { MapPin, Phone, CreditCard, ShoppingBag, ArrowLeft, Check, AlertCircle } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotals, placeOrder, user, token } = useContext(AppContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  // New address form state
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [addressError, setAddressError] = useState('');

  // Payment popup state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState('confirm'); // confirm, processing, success
  const [placedOrder, setPlacedOrder] = useState(null);

  const totals = getCartTotals();

  // Redirect to Auth if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/auth?redirect=checkout');
    } else {
      fetchAddresses();
    }
  }, [token]);

  // Redirect to Home if cart empty
  useEffect(() => {
    if (cart.length === 0 && paymentStep !== 'success') {
      navigate('/');
    }
  }, [cart]);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/addresses');
      if (data.success) {
        setAddresses(data.addresses);
        const defaultAddr = data.addresses.find(a => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
        } else if (data.addresses.length > 0) {
          setSelectedAddressId(data.addresses[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    setAddressError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/addresses', {
        name: newName,
        phone: newPhone,
        address: newAddress,
        city: newCity,
        state: newState,
        pincode: newPincode,
        isDefault
      });
      if (data.success) {
        setShowNewAddressForm(false);
        fetchAddresses();
        setSelectedAddressId(data.address._id);
        // Clear fields
        setNewName('');
        setNewPhone('');
        setNewAddress('');
        setNewCity('');
        setNewState('');
        setNewPincode('');
        setIsDefault(false);
      }
    } catch (error) {
      setAddressError(error.response?.data?.message || 'Failed to create address');
    }
  };

  const handleCheckoutSubmit = async () => {
    if (!selectedAddressId) {
      alert('Please select or add a shipping address.');
      return;
    }

    const addr = addresses.find(a => a._id === selectedAddressId);
    const shippingData = {
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    };

    if (paymentMethod === 'COD') {
      // Place order immediately
      try {
        const data = await placeOrder(shippingData, paymentMethod);
        if (data.success) {
          setPlacedOrder(data.order);
          setPaymentStep('success');
          setShowPaymentModal(true);
        }
      } catch (err) {
        alert(err.message || 'Failed to place order');
      }
    } else {
      // Show mock UPI/Razorpay payment loading portal
      setShowPaymentModal(true);
      setPaymentStep('confirm');
    }
  };

  const handleMockPaymentSuccess = async () => {
    setPaymentStep('processing');
    const addr = addresses.find(a => a._id === selectedAddressId);
    const shippingData = {
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    };

    setTimeout(async () => {
      try {
        const data = await placeOrder(shippingData, paymentMethod);
        if (data.success) {
          setPlacedOrder(data.order);
          setPaymentStep('success');
        }
      } catch (err) {
        alert(err.message || 'Payment simulation failed');
        setShowPaymentModal(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="flex items-center space-x-2">
        <button onClick={() => navigate('/cart')} className="text-stone-500 hover:text-stone-700">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-black text-stone-900 dark:text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Columns: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* A. Shipping Address Selection */}
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <h3 className="font-bold text-lg text-stone-900 dark:text-white flex items-center space-x-2.5">
              <MapPin className="h-5 w-5 text-organic-green-700" />
              <span>1. Shipping Address</span>
            </h3>

            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr._id}
                    onClick={() => setSelectedAddressId(addr._id)}
                    className={`p-4 border rounded-2xl cursor-pointer relative transition-all ${
                      selectedAddressId === addr._id
                        ? 'border-organic-green-700 bg-organic-green-50/20 shadow-sm'
                        : 'border-stone-200 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="font-bold text-sm text-stone-850 dark:text-stone-200">{addr.name}</div>
                    <div className="text-xs text-stone-500 mt-1.5 space-y-0.5">
                      <p>{addr.address}</p>
                      <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-stone-400 font-semibold mt-3">
                      <Phone className="h-3 w-3" />
                      <span>{addr.phone}</span>
                    </div>

                    {addr.isDefault && (
                      <span className="absolute top-4 right-4 bg-stone-100 text-stone-500 text-[9px] uppercase font-bold px-2 py-0.5 rounded-md">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500 italic">No addresses saved. Please add a new shipping address below.</p>
            )}

            {/* Toggle Address Form */}
            {!showNewAddressForm ? (
              <button
                onClick={() => setShowNewAddressForm(true)}
                className="text-sm text-organic-green-700 dark:text-organic-green-450 hover:underline font-bold"
              >
                + Add New Shipping Address
              </button>
            ) : (
              <form onSubmit={handleCreateAddress} className="border border-stone-200/50 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/50 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <h4 className="font-bold text-sm text-stone-800 dark:text-white">Add Shipping Details</h4>
                  <button type="button" onClick={() => setShowNewAddressForm(false)} className="text-xs text-stone-400 hover:text-red-500 font-bold">
                    Cancel
                  </button>
                </div>

                {addressError && <p className="text-xs text-red-500 font-bold flex items-center space-x-1"><AlertCircle className="h-3 w-3" /><span>{addressError}</span></p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Recipient Name"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-2 border rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="p-2 border rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-white"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address / House No / Road"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full p-2 border rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-white"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="p-2 border rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="p-2 border rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    required
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    className="p-2 border rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-800 dark:text-white"
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-stone-500">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="h-4 w-4 rounded accent-organic-green-700"
                  />
                  <label htmlFor="isDefault" className="cursor-pointer select-none">Set as default shipping address</label>
                </div>

                <button
                  type="submit"
                  className="bg-organic-green-700 hover:bg-organic-green-800 text-white font-semibold text-xs px-6 py-2.5 rounded-full"
                >
                  Save Address
                </button>
              </form>
            )}
          </div>

          {/* B. Payment Method Choice */}
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <h3 className="font-bold text-lg text-stone-900 dark:text-white flex items-center space-x-2.5">
              <CreditCard className="h-5 w-5 text-organic-green-700" />
              <span>2. Payment Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* COD */}
              <div
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-28 relative ${
                  paymentMethod === 'COD' ? 'border-organic-green-700 bg-organic-green-50/20 shadow-sm' : 'border-stone-200'
                }`}
              >
                <div className="font-bold text-sm text-stone-850 dark:text-stone-200">COD</div>
                <div className="text-xs text-stone-400">Cash on Delivery</div>
                {paymentMethod === 'COD' && <Check className="absolute top-4 right-4 h-4 w-4 text-organic-green-700" />}
              </div>

              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-28 relative ${
                  paymentMethod === 'UPI' ? 'border-organic-green-700 bg-organic-green-50/20 shadow-sm' : 'border-stone-200'
                }`}
              >
                <div className="font-bold text-sm text-stone-850 dark:text-stone-200">UPI / QR Code</div>
                <div className="text-xs text-stone-400">GooglePay, PhonePe, Paytm</div>
                {paymentMethod === 'UPI' && <Check className="absolute top-4 right-4 h-4 w-4 text-organic-green-700" />}
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setPaymentMethod('Razorpay')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-28 relative ${
                  paymentMethod === 'Razorpay' ? 'border-organic-green-700 bg-organic-green-50/20 shadow-sm' : 'border-stone-200'
                }`}
              >
                <div className="font-bold text-sm text-stone-850 dark:text-stone-200">Razorpay</div>
                <div className="text-xs text-stone-400">Cards, Netbanking, Wallets</div>
                {paymentMethod === 'Razorpay' && <Check className="absolute top-4 right-4 h-4 w-4 text-organic-green-700" />}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Review */}
        <div className="glass-card p-6 rounded-3xl h-fit space-y-6">
          <h3 className="font-bold text-lg text-stone-900 dark:text-white border-b border-stone-150 pb-4 flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-organic-green-700" />
            <span>Order Review</span>
          </h3>

          <div className="max-h-56 overflow-y-auto divide-y divide-stone-100 pr-2">
            {cart.map((item) => (
              <div key={item.productId} className="py-3 flex justify-between gap-4 text-sm">
                <span className="text-stone-500 max-w-[170px] truncate">
                  {item.name} <span className="font-bold text-stone-750">x{item.quantity}</span>
                </span>
                <span className="font-bold text-stone-800 dark:text-white shrink-0">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-150 pt-4 space-y-2.5 text-xs text-stone-500">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-stone-850">₹{totals.subtotal.toFixed(2)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span className="font-bold">-₹{totals.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className="font-bold text-stone-850">
                {totals.deliveryCharges === 0 ? 'Free' : `₹${totals.deliveryCharges.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="border-t border-stone-150 pt-4 flex justify-between items-center">
            <span className="font-bold text-stone-800">Final Price:</span>
            <span className="text-xl font-black text-organic-green-800">
              ₹{totals.finalTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckoutSubmit}
            className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3.5 rounded-full transition-all hover:scale-[1.01] shadow-lg shadow-organic-green-700/20"
          >
            Place Order (₹{totals.finalTotal})
          </button>
        </div>

      </div>

      {/* Payment Processing & Success Modal Dialog */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 p-8 rounded-3xl w-full max-w-md text-center space-y-6 shadow-2xl relative">
            
            {/* 1. Confirm step for Online Payments */}
            {paymentStep === 'confirm' && (
              <>
                <div className="h-14 w-14 bg-organic-gold-50 dark:bg-organic-gold-950/40 text-organic-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <CreditCard className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">Simulate Payment Portal</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    We will simulate the secure online checkout process for **{paymentMethod}** (amount: ₹{totals.finalTotal}).
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 border py-2.5 rounded-full text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMockPaymentSuccess}
                    className="flex-1 bg-organic-green-700 hover:bg-organic-green-800 text-white py-2.5 rounded-full text-sm font-semibold"
                  >
                    Pay & Complete
                  </button>
                </div>
              </>
            )}

            {/* 2. Processing Loader */}
            {paymentStep === 'processing' && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-organic-green-700 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">Processing Payment</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Validating secure token credentials with {paymentMethod} API gateways...
                  </p>
                </div>
              </>
            )}

            {/* 3. Success Screen */}
            {paymentStep === 'success' && (
              <>
                <div className="h-16 w-16 bg-green-50 dark:bg-green-950/40 text-green-600 rounded-full flex items-center justify-center mx-auto border-2 border-green-500 scale-105 animate-pulse">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white">Order Confirmed!</h3>
                  <p className="text-sm text-stone-500">
                    Your organic superfood order has been placed successfully.
                  </p>
                  {placedOrder && (
                    <p className="text-xs text-organic-green-700 dark:text-organic-green-400 font-bold mt-2">
                      Order ID: #{placedOrder._id}
                    </p>
                  )}
                </div>

                <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-2xl text-left text-xs space-y-1.5">
                  <p className="font-bold text-stone-850">Delivery Address:</p>
                  <p className="text-stone-500">{placedOrder?.shippingAddress?.name}</p>
                  <p className="text-stone-500">{placedOrder?.shippingAddress?.address}, {placedOrder?.shippingAddress?.city}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      navigate('/');
                    }}
                    className="flex-1 border py-2.5 rounded-full text-xs font-semibold"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      navigate('/dashboard');
                    }}
                    className="flex-1 bg-organic-green-700 hover:bg-organic-green-800 text-white py-2.5 rounded-full text-xs font-semibold"
                  >
                    Track Order
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
export default Checkout;
