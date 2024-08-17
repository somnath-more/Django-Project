import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import AddVehicleForm from "../AddVehicleForm";
import ViewSession from "../ViewSession";

interface Vehicle {
  id: string;
  number: string;
  make: string;
  model: string;
  ownerName: string;
}

const VehicleTable: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/vehicles");
        if (response.status === 200) {
          setVehicles(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/vehicles/${id}`);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const onViewSession = (id: string) => {
    setSelectedVehicleId(id);
  };

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  const handleCloseSessionView = () => {
    setSelectedVehicleId(null);
  };

  if (selectedVehicleId) {
    return (
      <ViewSession
        vehicleId={selectedVehicleId}
        onClose={handleCloseSessionView}
      />
    );
  }

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h3">Parked Vehicles</Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        <AddVehicleForm onAddVehicle={handleAddVehicle} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Owner Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.number}</TableCell>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.ownerName}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onViewSession(vehicle.id)}
                  style={{ marginRight: "8px" }}
                >
                  View Session
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDelete(vehicle.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;
