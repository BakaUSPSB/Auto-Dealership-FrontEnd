import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled, { keyframes, css } from "styled-components";
import CarModal from "./card_modal";

// Define keyframes for border animation
const borderLoop = keyframes`
    0% {
        border-color: #df00ff;
    }
    50% {
        border-color: #8a00ff;
    }
    100% {
        border-color: #df00ff;
    }
`;

const StyledCard = styled(Card)`
    border-color: ${({ highlightedcard }) => (highlightedcard ? '#df00ff' : '#1c1c1c')};
    animation: ${({ highlightedcard }) =>
        highlightedcard
            ? css`
                  ${borderLoop} 2s infinite
              `
            : "none"};
`;

const CarCard = ({ vehicle }) => {
    const [showModal, setShowModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // State to track hover state

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const cardStyle = {
        width: "225px",
        height: "300px",
        position: "relative",
        margin: 10,
        padding: 0,
        borderWidth: 2,
        borderRadius: 8,
        boxShadow: isHovered ? "0px 0px 15px rgba(0, 0, 0, 0.3)" : "none",
    };

    const cardImgStyle = {
        height: "60%",
        width: "100%",
        margin: 0,
        objectFit: "cover",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    };

    const highlightedcard = isHovered;

    return (
        <>
            {vehicle ? (
                <StyledCard
                    style={cardStyle}
                    className="mx-2"
                    onClick={handleShowModal}
                    highlightedcard={highlightedcard}
                    id={`car-card-${vehicle.vehicle_id}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Card.Img
                        variant="top"
                        src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type.toLowerCase()}/${vehicle.body_type.toLowerCase()}.jpg`}
                        alt={`${vehicle.body_type}_image`}
                        style={cardImgStyle}
                        id={`car-card-img-${vehicle.vehicle_id}`}
                    />
                    <Card.Body id={`car-card-body-${vehicle.vehicle_id}`}>
                        <Card.Text id={`car-card-text-${vehicle.vehicle_id}`} style={{ fontWeight: "350" }}>
                            <strong>
                                {vehicle.year} {vehicle.make} {vehicle.model}
                            </strong>
                        </Card.Text>
                        <Card.Text id={`car-card-price-${vehicle.vehicle_id}`}>
                            {"$" + vehicle.price.toLocaleString()}
                        </Card.Text>
                    </Card.Body>
                </StyledCard>
            ) : null}
            {showModal && vehicle && (
                <CarModal
                    vehicle={vehicle}
                    show={showModal}
                    handleClose={handleCloseModal}
                    id={`car-modal-${vehicle.vehicle_id}`}
                />
            )}
        </>
    );
};

export default CarCard;
