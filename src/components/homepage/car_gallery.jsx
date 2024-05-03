import React, { useState, useEffect } from "react";
import { Form, Col, Row, Container, Pagination, Card } from "react-bootstrap";
import CarCard from "./car_card";
import CarService from "../../services/CarService";

const CarGallery = () => {
  // States for pagination and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [totalItems, setTotalItems] = useState(0);
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add this line
  const containerRef = React.useRef(null);

  useEffect(() => {
    // get cars from the API using the CarService
    CarService.getVehicles(currentPage, itemsPerPage, searchQuery)
      .then((response) => {
        const vehiclesWithImages = response.data.vehicles.map((vehicle) => ({
          ...vehicle,
          image: getRandomImage(),
        }));
        setCars(vehiclesWithImages);
        setTotalItems(response.data.num_of_results);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          setCars([]);
        }
      });
  }, [currentPage, itemsPerPage, searchQuery]);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Change items per page
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  // Render placeholders if no cars are available
  const renderPlaceholders = () => {
    return Array.from({ length: itemsPerPage }, (_, index) => (
      <Col
        key={index}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        className="d-flex align-items-stretch"
      >
        <Card
          style={{
            width: "250px",
            minWidth: "250px",
            height: "300px",
            margin: "1rem",
            backgroundColor: "grey",
          }}
        >
          <Card.Body>
            <Card.Text>Loading...</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * 4) + 1; // generates a random number between 1 and 4
    return `${process.env.PUBLIC_URL}/cars/${randomNumber}.jpg`; // returns the path to the random image
  };

  return (
    <Container fluid style={{ margin: 0, padding: 0 }} ref={containerRef}>
      <Row>
        <Col
          md={3}
          style={{
            width: "300px",
            minWidth: "300px",
            backgroundColor: "lightgray",
          }}
        >
          {/* Filter section */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Items per page</Form.Label>
              <Form.Control
                as="select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Form.Control>
            </Form.Group>

            {/* Category Checkboxes */}
            <Form.Group className="mb-3">
              <Form.Label>Body Type</Form.Label>
              {["Hatchback", "Sedan", "SUV", "Coupe", "Truck"].map((type) => (
                <Form.Check
                  type="checkbox"
                  id={`body-type-${type}`}
                  label={type}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              {["Red", "Blue", "Green", "Black"].map((color) => (
                <Form.Check
                  type="checkbox"
                  id={`color-${color}`}
                  label={color}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              {/* Assuming models are dynamic, replace `modelList` with your variable */}
              {["Model X", "Model Y", "Model Z"].map((model) => (
                <Form.Check
                  type="checkbox"
                  id={`model-${model}`}
                  label={model}
                />
              ))}
            </Form.Group>

            {/* Sliders for Price and MPG */}
            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Form.Range />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MPG Range</Form.Label>
              <Form.Range />
            </Form.Group>

            {/* Additional filters can be added here */}
          </Form>
        </Col>

        <Col>
          {/* Gallery section */}
          <Row>
            {cars.length > 0
              ? cars.map((car, index) => (
                  <CarCard
                    key={index}
                    vehicle={car}
                    imageSrc={car.image}
                    highlighted={false}
                  />
                ))
              : renderPlaceholders()}
          </Row>
          {/* Pagination controls */}
          <Pagination className="justify-content-center">
            {paginationItems}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default CarGallery;