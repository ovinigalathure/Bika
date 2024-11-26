import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import './Invoice.css';

const Invoice = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName || 'Customer';
  const userAddress = location.state?.address || 'No address provided';
  const userPhone = location.state?.phone || 'No phone available';
  const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails || []);
  const deliveryOption = location.state?.deliveryOption || 'Take Away';
  const deliveryCharge = location.state?.deliveryCharge || 0;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (userEmail && orderDetails.length === 0) {
        try {
          const ordersQuery = query(collection(db, 'OrderNow'), where('userEmail', '==', userEmail));
          const ordersSnapshot = await getDocs(ordersQuery);

          if (!ordersSnapshot.empty) {
            const lastOrder = ordersSnapshot.docs[ordersSnapshot.docs.length - 1].data();
            setOrderDetails(lastOrder.items);
          } else {
            console.error('No orders found for this user.');
          }
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };

    fetchOrderDetails();
  }, [userEmail, orderDetails]);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Your Order Invoice', 14, 22);
  
    // Add "Bika Embilipitiya" before the address
    doc.setFontSize(16);
    doc.text('Invoice From:', 14, 40);
    doc.setFontSize(12);
    doc.text('Bika Embilipitiya', 14, 46); // Business name
    doc.text('No.50, Moraketiya Road, Pallegama, Embilipitiya', 14, 52);
  
    // Invoice To Section
    doc.setFontSize(16);
    doc.text('Invoice To:', 14, 70);
    doc.setFontSize(12);
    doc.text(`Name: ${userName}`, 14, 76);
    doc.text(`Address: ${userAddress}`, 14, 82);
    doc.text(`Phone: ${userPhone}`, 14, 88);
    doc.text(`Email: ${userEmail}`, 14, 94);
  
    // Table Header
    doc.setFillColor(214, 157, 0); // Golden background color
    doc.rect(14, 105, 180, 8, 'F'); // Draw header rectangle
    doc.setTextColor(255, 255, 255); // White text for header
    doc.setFontSize(12);
    doc.text('Product', 16, 110);
    doc.text('Qty', 55, 110); // Reduced column width
    doc.text('Unit Price', 70, 110);
    doc.text('Discount', 100, 110); // Reduced column width
    doc.text('Customizations', 120, 110);
    doc.text('Total', 170, 110);
  
    // Reset text color for table content
    doc.setTextColor(0, 0, 0);
    let rowHeight = 120;
  
    orderDetails.forEach((item) => {
      const price = parseFloat(item.price);
      const discount = item.discount || 0;
      const discountedPrice = price * ((100 - discount) / 100);
      const customizationTotal = item.customizeDetails
        ? item.customizeDetails.reduce(
            (acc, customization) => acc + customization.quantity * customization.price,
            0
          )
        : 0;
      const totalItemPrice = discountedPrice * item.quantity + customizationTotal;
  
      // Dynamically adjust text for customizations
      const customizations =
        item.customizeDetails && item.customizeDetails.length > 0
          ? item.customizeDetails
              .map(
                (customization) =>
                  `${customization.item} (x${customization.quantity}) - Rs.${(
                    customization.quantity * customization.price
                  ).toFixed(2)}`
              )
              .join(', ')
          : 'None';
  
      const customizationLines = doc.splitTextToSize(customizations, 60); // Increased width for Customizations column
  
      // Add data to the PDF row by row
      doc.setFontSize(10);
      doc.text(item.productName, 16, rowHeight);
      doc.text(item.quantity.toString(), 55, rowHeight); // Adjusted position for Qty
      doc.text(`Rs.${price.toFixed(2)}`, 70, rowHeight);
      doc.text(`${discount}%`, 100, rowHeight); // Adjusted position for Discount
  
      // Customization text, with wrapped lines
      doc.text(customizationLines, 120, rowHeight);
  
      doc.text(`Rs.${totalItemPrice.toFixed(2)}`, 170, rowHeight); // Adjusted position for Total
  
      // Adjust row height dynamically based on the number of customization lines
      rowHeight += 10 + (customizationLines.length - 1) * 5;
    });
  
    const totalPriceAfterDiscounts = orderDetails.reduce((total, item) => {
      const price = parseFloat(item.price);
      const discount = item.discount || 0;
      const discountedPrice = price * ((100 - discount) / 100);
      const customizationTotal = item.customizeDetails
        ? item.customizeDetails.reduce(
            (acc, customization) => acc + customization.quantity * customization.price,
            0
          )
        : 0;
      return total + (discountedPrice * item.quantity + customizationTotal);
    }, 0);
  
    if (deliveryOption === 'Delivery') {
      rowHeight += 10;
      doc.text(`Delivery Charge: Rs.${deliveryCharge.toFixed(2)}`, 14, rowHeight);
    }
  
    const finalTotal = totalPriceAfterDiscounts + deliveryCharge;
    rowHeight += 10;
    doc.setFontSize(14);
    doc.setTextColor(214, 157, 0); // Golden text color for totals
    doc.text(`Total after Discounts: Rs.${totalPriceAfterDiscounts.toFixed(2)}`, 14, rowHeight);
    rowHeight += 10;
    doc.setTextColor(76, 175, 80); // Green text color for final total
    doc.text(`Final Total: Rs.${finalTotal.toFixed(2)}`, 14, rowHeight);
  
    doc.save('invoice.pdf');
  };
  
  
  
  

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="logo">
          {/* Add a logo here if needed */}
        </div>
        <h1 className="invoice-title">Your Order Invoice</h1>
        <div className="invoice-details">
          <div className="invoice-from">
            <h3>Invoice From:</h3>
            <p>Bika Embilipitiya</p>
            <p>No.50, Moraketiya Road, Pallegama, Embilipitiya</p>
          </div>
          <div className="invoice-to">
            <h3>Invoice To:</h3>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Address:</strong> {userAddress}</p>
            <p><strong>Phone:</strong> {userPhone}</p>
            <p><strong>Email:</strong> {userEmail}</p>
          </div>
        </div>
      </header>

      {orderDetails.length === 0 ? (
        <p>No order details found.</p>
      ) : (
        <>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Customizations</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => {
                const price = parseFloat(item.price);
                const discount = item.discount || 0;
                const discountedPrice = price * ((100 - discount) / 100);
                const customizationTotal = item.customizeDetails
                  ? item.customizeDetails.reduce(
                      (acc, customization) => acc + customization.quantity * customization.price,
                      0
                    )
                  : 0;
                const total = discountedPrice * item.quantity + customizationTotal;

                return (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>Rs.{price.toFixed(2)}</td>
                    <td>{discount}%</td>
                    <td>
                      {item.customizeDetails && item.customizeDetails.length > 0
                        ? item.customizeDetails
                            .map(
                              (customization) =>
                                `${customization.item} (x${customization.quantity}) - Rs.${(
                                  customization.quantity * customization.price
                                ).toFixed(2)}`
                            )
                            .join(', ')
                        : 'None'}
                    </td>
                    <td>Rs.{total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="invoice-total">
            <h2>
              Total after Discounts: Rs.
              {orderDetails
                .reduce((total, item) => {
                  const price = parseFloat(item.price);
                  const discount = item.discount || 0;
                  const discountedPrice = price * ((100 - discount) / 100);
                  const customizationTotal = item.customizeDetails
                    ? item.customizeDetails.reduce(
                        (acc, customization) => acc + customization.quantity * customization.price,
                        0
                      )
                    : 0;
                  return total + discountedPrice * item.quantity + customizationTotal;
                }, 0)
                .toFixed(2)}
            </h2>

            {deliveryOption === 'Delivery' && (
              <h3>Delivery Charge: Rs.{deliveryCharge.toFixed(2)}</h3>
            )}

            <h2>
              Final Total: Rs.
              {(
                orderDetails.reduce((total, item) => {
                  const price = parseFloat(item.price);
                  const discount = item.discount || 0;
                  const discountedPrice = price * ((100 - discount) / 100);
                  const customizationTotal = item.customizeDetails
                    ? item.customizeDetails.reduce(
                        (acc, customization) => acc + customization.quantity * customization.price,
                        0
                      )
                    : 0;
                  return total + discountedPrice * item.quantity + customizationTotal;
                }, 0) + deliveryCharge
              ).toFixed(2)}
            </h2>
          </div>

          <button className="download-button" onClick={handleDownload}>
            Download Invoice
          </button>
        </>
      )}
    </div>
  );
};

export default Invoice;
