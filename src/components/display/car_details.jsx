import React from "react";
import { Table } from "react-bootstrap";

const CarDetails = ({ vehicle }) => {
  // Check if vehicle data is available, otherwise display placeholder values
  const make = vehicle ? vehicle.make : "Loading";
  const model = vehicle ? vehicle.model : "Loading";
  const bodyType = vehicle ? vehicle.body_type : "Loading";
  const color = vehicle ? vehicle.color : "Loading";
  const year = vehicle ? vehicle.year : "Loading";
  const price = vehicle ? vehicle.price : "Loading";
  const transmission = vehicle ? vehicle.transmission : "Loading";
  const miles = vehicle ? vehicle.miles : "Loading";
  const mpg = vehicle ? vehicle.mpg : "Loading";
  const fuelType = vehicle ? vehicle.fuel_type : "Loading";

  return (
      <>
        <style>{`
        #carDetailsTable {
          /* Add custom styles for the table */
        }

        .detailLabel {
          font-weight: bold;
        }

        .detailValue {
          /* Add custom styles for the table values */
        }

      `}</style>
        <h2>Car Details</h2>
        <Table bordered id="carDetailsTable">
          <tbody>
          <tr>
            <td className="detailLabel">Make</td>
            <td className="detailValue">{make}</td>
          </tr>
          <tr>
            <td className="detailLabel">Model</td>
            <td className="detailValue">{model}</td>
          </tr>
          <tr>
            <td className="detailLabel">Body Type</td>
            <td className="detailValue">{bodyType}</td>
          </tr>
          <tr>
            <td className="detailLabel">Color</td>
            <td className="detailValue">{color}</td>
          </tr>
          <tr>
            <td className="detailLabel">Year</td>
            <td className="detailValue">{year}</td>
          </tr>
          <tr>
            <td className="detailLabel">Price</td>
            <td className="detailValue">{"$" + price.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="detailLabel">Transmission</td>
            <td className="detailValue">{transmission}</td>
          </tr>
          <tr>
            <td className="detailLabel">Miles</td>
            <td className="detailValue">{miles}</td>
          </tr>
          <tr>
            <td className="detailLabel">MPG</td>
            <td className="detailValue">{mpg}</td>
          </tr>
          <tr>
            <td className="detailLabel">Fuel</td>
            <td className="detailValue">{fuelType}</td>
          </tr>
          </tbody>
        </Table>
      </>
  );
};

export default CarDetails;
