import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import ManagerServices from '../services/managerServices';  // Import your Manager Services

const MonthlySalesReport = () => {
  const [allSalesData, setAllSalesData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchSalesData();
  }, [year, month]);

  const fetchSalesData = async () => {
    try {
      const data = await ManagerServices.fetchSalesData();
      if (data && data.data && data.data.purchases) { // Adjusting the path to access purchases correctly
        setAllSalesData(data.data.purchases);
        filterData(data.data.purchases);
      } else {
        console.log('No data or incorrect data format received:', data);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
      if (error.response) {
        console.error('Detailed error:', error.response.data); // Log detailed error response
      }
    }
  };
  
  

  const filterData = (data) => {
    const filteredData = data.filter(sale => {
      const saleDate = new Date(sale.open_date);
      return saleDate.getFullYear() === year && saleDate.getMonth() + 1 === month;
    });
    setSalesData(filteredData);
    const total = filteredData.reduce((sum, sale) => sum + parseFloat(sale.purchase_total), 0);
    setTotalSales(total);
  };

  const handleShowModal = (sale) => {
    setSelectedSale(sale);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSale(null);
  };

  return (
    <>
      <div>
        <h1>Monthly Sales Report</h1>
        <Form>
          <Form.Group controlId="yearSelect">
            <Form.Label>Year</Form.Label>
            <Form.Control as="select" value={year} onChange={e => setYear(parseInt(e.target.value))}>
              {[2020, 2021, 2022, 2023, 2024].map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="monthSelect">
            <Form.Label>Month</Form.Label>
            <Form.Control as="select" value={month} onChange={e => setMonth(parseInt(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Status</th>
              <th>Total</th>
              <th>Open Date</th>
              <th>Close Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                <td>{sale.purchase_vehicle.vehicle_id}</td>
                <td>{sale.purchase_vehicle.year}</td>
                <td>{sale.purchase_vehicle.make}</td>
                <td>{sale.purchase_vehicle.model}</td>
                <td>{sale.purchase_status}</td>
                <td>${sale.purchase_total}</td>
                <td>{sale.open_date}</td>
                <td>{sale.close_date}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowModal(sale)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Total for {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}: ${totalSales.toFixed(2)}</h3>
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Sale Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSale && (
              <>
                <p><strong>Customer:</strong> {`${selectedSale.customer.first_name} ${selectedSale.customer.last_name}`}</p>
                <p><strong>Vehicle ID:</strong> {selectedSale.purchase_vehicle.vehicle_id}</p>
                <p><strong>Year:</strong> {selectedSale.purchase_vehicle.year}</p>
                <p><strong>Make:</strong> {selectedSale.purchase_vehicle.make}</p>
                <p><strong>Model:</strong> {selectedSale.purchase_vehicle.model}</p>
                <p><strong>Status:</strong> {selectedSale.purchase_status}</p>
                <p><strong>Total:</strong> ${selectedSale.purchase_total}</p>
                <p><strong>Open Date:</strong> {selectedSale.open_date}</p>
                <p><strong>Close Date:</strong> {selectedSale.close_date}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MonthlySalesReport;
