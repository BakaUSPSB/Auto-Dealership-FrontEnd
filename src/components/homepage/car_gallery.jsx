import React, {useState, useEffect} from "react";
import {Form, Col, Row, Container, Pagination, Card, Button} from "react-bootstrap";
import CarCard from "./car_card";
import CarService from "../../services/CarService";

const CarGallery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [totalItems, setTotalItems] = useState(0);
    const [cars, setCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({});
    const [collapsedGroups, setCollapsedGroups] = useState({
        bodyType: true,
        color: true,
        model: true,
        transmission: true,
        fuelType: true
    });
    const containerRef = React.useRef(null);
    //console.log(selectedFilters)

    useEffect(() => {
        CarService.getVehicles(currentPage, itemsPerPage, searchQuery, selectedFilters)
            .then((response) => {
                const vehiclesWithImages = response.data.vehicles.map((vehicle) => ({
                    ...vehicle,
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
    }, [currentPage, itemsPerPage, searchQuery, selectedFilters]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        containerRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
        containerRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const toggleCollapse = (group) => {
        setCollapsedGroups({
            ...collapsedGroups,
            [group]: !collapsedGroups[group]
        });
    };

    const renderPlaceholders = () => {
        return Array.from({length: itemsPerPage}, (_, index) => (
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

    const renderFormRadioButton = (title, options, group) => (
        <Form.Group className={`mb-3 ${collapsedGroups[group] ? 'collapsed' : ''}`}>
            <div onClick={() => toggleCollapse(group)} style={{cursor: "pointer"}}>
                <Form.Label>{title} {collapsedGroups[group] ? "▶" : "▼"}</Form.Label>
            </div>
            <div className="radiobutton-container" style={{marginLeft: "20px"}}>
                {!collapsedGroups[group] &&
                    options.map((option) => (
                        <Form.Check
                            key={option}
                            type="radio"
                            id={`${group}-${option}`}
                            label={option}
                            name={group} // Assign the same name to all radio buttons in the group
                            // onChange={() => console.log({...selectedFilters, [group]: option})}
                            onChange={() => setSelectedFilters({...selectedFilters, [group]: option})}
                        />
                    ))
                }
                {
                    selectedFilters[group] != undefined &&
                    <Button type={"button"} onClick={() => {
                        document.getElementById(`${group}-${selectedFilters[group]}`).checked=false
                        setSelectedFilters({...selectedFilters, [group]: null})

                    }}>
                        Clear {title}
                    </Button>
                }
            </div>
        </Form.Group>
    );

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


    return (
        <Container fluid style={{margin: 0, padding: 0}} ref={containerRef}>
            <Row>
                <Col md={3} style={{padding: 30, width: "300px", minWidth: "300px", backgroundColor: "lightgray"}}>
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

                        {renderFormRadioButton("Body Type", ["Hatchback", "Sedan", "SUV", "Coupe", "Truck"], "bodyType")}
                        {renderFormRadioButton("Color", ["Red", "Blue", "Black", "White", "Silver"], "color")}
                        {renderFormRadioButton("Model", ["Bronco", "Edge", "Escape", "F-150", "Mustang", "Explorer"], "model")}
                        {renderFormRadioButton("Transmission", ["Automatic", "Manual"], "transmission")}
                        {renderFormRadioButton("Fuel Type", ["Diesel", "Electric", "Gasoline"], "fuelType")}
                    </Form>
                </Col>

                <Col>
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
                    <Pagination className="justify-content-center">
                        {paginationItems}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default CarGallery;
