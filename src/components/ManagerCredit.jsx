// import React, { useState } from 'react';
// import { Button, Form, Alert } from 'react-bootstrap';
// import ManagerServices from '../services/managerServices';

// const ManagerCreditReport = () => {
//     const [customerData, setCustomerData] = useState({
//         first_name: '',
//         last_name: '',
//         ssn: '',
//         birth_date: '',
//         address: ''
//     });
//     const [report, setReport] = useState(null);
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         setCustomerData({ ...customerData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await ManagerServices.fetchCreditReport(customerData);
//             if (result.credit_score) {
//                 setReport(result);
//             } else {
//                 setError('Failed to fetch credit report.');
//             }
//         } catch (error) {
//             console.error('Error fetching credit report:', error);
//             setError('Failed to fetch credit report. See console for details.');
//         }
//     };

//     return (
//         <div>
//             <h1>Manager Credit Report Viewer</h1>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group>
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control type="text" name="first_name" value={customerData.first_name} onChange={handleChange} required />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control type="text" name="last_name" value={customerData.last_name} onChange={handleChange} required />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>SSN</Form.Label>
//                     <Form.Control type="text" name="ssn" value={customerData.ssn} onChange={handleChange} required />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Birth Date</Form.Label>
//                     <Form.Control type="date" name="birth_date" value={customerData.birth_date} onChange={handleChange} required />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control type="text" name="address" value={customerData.address} onChange={handleChange} required />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">Fetch Credit Report</Button>
//             </Form>
//             {report && (
//                 <div>
//                     <h3>Credit Report:</h3>
//                     <p>Credit Score: {report.credit_score}</p>
//                     <p>Total Loans: ${report.total_loans}</p>
//                 </div>
//             )}
//             {error && <Alert variant="danger">{error}</Alert>}
//         </div>
//     );
// };

// export default ManagerCreditReport;
