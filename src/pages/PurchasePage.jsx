import React, {useEffect, useState} from "react";
import PurchaseComponent from "../components/purchasing/purchaseComponent";
import {useNavigate, useParams} from "react-router-dom";
import VehicleService from "../services/vehicleInfo"; // Import the VehicleService

const PurchasePage = () => {
    const {vehicle_id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const firstName = localStorage.getItem("firstName");
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        // Fetch vehicle data based on vehicle_id
        VehicleService.getVehicleById(vehicle_id)
            .then((response) => {
                //console.log(response.data);
                setVehicle(response.data)
            })
            .catch((error) => {
                console.error(error);
                //navigate("/");

            })
    }, [navigate, vehicle_id]);

    // If vehicle data is not loaded yet, you can render a loading indicator or message
    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{
                paddingTop: 50,
                paddingBottom: 50,
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/blur.jpg)`, // Use url() function to specify the image URL
                backgroundSize: 'cover', // Adjust background size as needed
                backgroundPosition: 'center', // Adjust background position as needed
            }}>
                <PurchaseComponent vehicle={vehicle}/>
            </div>
        </>
    );
};

export default PurchasePage;
