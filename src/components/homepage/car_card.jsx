import React, {useState} from "react";
import {Card} from "react-bootstrap";
import styled, {keyframes, css} from "styled-components"; // Import keyframes helper
import CarModal from "./card_modal"; // Import CarModal component

// Define keyframes using the keyframes helper
const borderLoop = keyframes`
    0% {
        border-color: #df00ff; /* Starting color */
    }
    50% {
        border-color: #8a00ff; /* Transition color */
    }
    100% {
        border-color: #df00ff; /* Ending color */
    }
`;

// Styled Card component with animation
const StyledCard = styled(Card)`
    animation: ${({highlighted}) =>
            highlighted
                    ? css`
                        ${borderLoop} 2s infinite
                    `
                    : "none"}; /* Apply animation */
`;

const CarCard = ({vehicle, highlighted}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const cardStyle = {
        width: "225px",
        height: "300px",
        position: "relative",
        margin: 10,
        padding: 0,
        borderWidth: 2,
        borderColor: '#1c1c1c',
        borderRadius: 8
    };

    const cardImgStyle = {
        height: "60%",
        width: "100%",
        margin: 0,
        objectFit: "cover",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    };

    return (
        <>
            {vehicle ? (
                <StyledCard
                    style={cardStyle}
                    className="mx-2"
                    onClick={handleShowModal}
                    highlighted={highlighted} // Pass highlighted prop to styled component
                    id={`car-card-${vehicle.vehicle_id}`}
                >
                    <Card.Img
                        variant="top"
                        src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type.toLowerCase()}/${vehicle.body_type.toLowerCase()}.jpg`}
                        alt={`${vehicle.body_type}_image`}
                        style={cardImgStyle}
                        id={`car-card-img-${vehicle.vehicle_id}`}
                    />
                    <Card.Body id={`car-card-body-${vehicle.vehicle_id}`}>
                        <Card.Text id={`car-card-text-${vehicle.vehicle_id}`} style={{ fontWeight: '350' }}>
                            <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong> {/* Bold text */}
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
