/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Container = styled("div")({
  padding: "20px",
  fontFamily: "Arial, sans-serif",
});

const Title = styled(Typography)({
  marginBottom: "20px",
  fontSize: "2em",
  color: "#4caf50",
});

const AddButton = styled(Button)({
  marginBottom: "20px",
  padding: "10px 20px",
  backgroundColor: "#4caf50",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1em",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const ViewButton = styled(Button)({
  padding: "5px 10px",
  backgroundColor: "#2196F3",
  color: "white",
  borderRadius: "3px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#1976D2",
  },
});

const DeleteButton = styled(Button)({
  padding: "5px 10px",
  backgroundColor: "#f44336",
  color: "white",
  borderRadius: "3px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [newVehicle, setNewVehicle] = useState({
    number: "",
    make: "",
    model: "",
    user: 1,
  });
  const [selectedSessions, setSelectedSessions] = useState<any[]>([]);
  const [checkOutData, setCheckOutData] = useState<any>({ amount_due: "" });
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const vehiclesResponse = await axios.get(
        "http://localhost:8000/vehicles/"
      );
      const sessionsResponse = await axios.get(
        "http://localhost:8000/parking-sessions/"
      );
      setVehicles(vehiclesResponse.data);
      setSessions(sessionsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddVehicle = async () => {
    try {
      await axios.post("http://localhost:8000/vehicles/", newVehicle);
      setOpenAddDialog(false);
      fetchData();
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleViewSessions = (vehicleId: number) => {
    const vehicleSessions = sessions.filter(
      (session: any) => session.vehicle === vehicleId
    );
    setSelectedSessions(vehicleSessions);
    setSelectedVehicle(vehicles.find((v: any) => v.id === vehicleId));
    setOpenViewDialog(true);
  };

  const handleCheckout = async () => {
    if (selectedSessionId === null) return;

    try {
      await axios.patch(
        `http://localhost:8000/parking-sessions/${selectedSessionId}`,
        {
          check_out_time: new Date().toISOString(),
          amount_due: checkOutData.amount_due,
        }
      );
      setOpenCheckoutDialog(false);
      fetchData();
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/vehicles/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <Container>
      <Title variant="h1">Dashboard</Title>
      <AddButton onClick={() => setOpenAddDialog(true)}>Add Vehicle</AddButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.number}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.user}</TableCell>
                <TableCell>
                  <ViewButton onClick={() => handleViewSessions(vehicle.id)}>
                    View Sessions
                  </ViewButton>
                  <DeleteButton onClick={() => handleDeleteVehicle(vehicle.id)}>
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Vehicle Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            label="Number"
            name="number"
            fullWidth
            margin="normal"
            value={newVehicle.number}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, number: e.target.value })
            }
          />
          <TextField
            label="Make"
            name="make"
            fullWidth
            margin="normal"
            value={newVehicle.make}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, make: e.target.value })
            }
          />
          <TextField
            label="Model"
            name="model"
            fullWidth
            margin="normal"
            value={newVehicle.model}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, model: e.target.value })
            }
          />
          <TextField
            label="User ID"
            name="user"
            fullWidth
            margin="normal"
            type="number"
            value={newVehicle.user}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                user: parseInt(e.target.value, 10),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddVehicle} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Sessions Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Vehicle Parking Sessions</DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <Typography variant="h6">
              Vehicle Number: {selectedVehicle.number}
            </Typography>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Check-In Time</TableCell>
                  <TableCell>Check-Out Time</TableCell>
                  <TableCell>Amount Due</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>{session.check_in_time}</TableCell>
                    <TableCell>{session.check_out_time}</TableCell>
                    <TableCell>{session.amount_due}</TableCell>
                    <TableCell>
                      {session.check_out_time === null && (
                        <Button
                          onClick={() => {
                            setSelectedSessionId(session.id);
                            setCheckOutData({ amount_due: "" });
                            setOpenCheckoutDialog(true);
                          }}
                        >
                          Check Out
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog
        open={openCheckoutDialog}
        onClose={() => setOpenCheckoutDialog(false)}
      >
        <DialogTitle>Checkout Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount Due"
            name="amount_due"
            fullWidth
            margin="normal"
            type="number"
            value={checkOutData.amount_due}
            onChange={(e) =>
              setCheckOutData({ ...checkOutData, amount_due: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckoutDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckout} color="primary">
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
