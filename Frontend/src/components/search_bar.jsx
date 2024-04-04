import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

const Search_bar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [mpg, setMpg] = useState([20, 50]); // Assuming a range of MPG
  const [price, setPrice] = useState([10000, 50000]); // Assuming a range of prices
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [sort, setSort] = useState('');

  // Placeholder for fetched options
  const [options, setOptions] = useState({
    bodyTypes: [],
    years: [],
    models: [],
    seatingCapacities: [],
  });

  useEffect(() => {
    // Fetch filter options from backend
    const fetchOptions = async () => {
      try {
        // Replace '/api/filters' with the actual endpoint
        const response = await axios.get('/api/filters');
        setOptions({
          bodyTypes: response.data.bodyTypes,
          years: response.data.years,
          models: response.data.models,
          seatingCapacities: response.data.seatingCapacities,
        });
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = {
      searchTerm,
      bodyType,
      year,
      model,
      mpg,
      price,
      seatingCapacity,
      sort,
    };

    try {
      // Replace '/api/search' with the actual endpoint
      const response = await axios.post('/api/search', query);
      console.log(response.data); // Process search results as needed
    } catch (error) {
      console.error('Search query failed:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} style={{ minWidth: '80%' }}>
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            <InputGroup style={{borderRadius: '10px'}}>
              <FormControl
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          {/* Assuming filters and sort options are placed here, follow a similar structure to align them */}
        </Row>
      </Form>
    </div>
  );
};

export default Search_bar;
