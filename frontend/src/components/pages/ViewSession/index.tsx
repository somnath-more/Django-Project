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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

interface ParkingSession {
  id: string;
  vehicle_id: string;
  check_in_time: string;
  check_out_time: string | null;
  amount_due: string;
}

interface ViewSessionProps {
  vehicleId: string;
  onClose: () => void;
}

const ViewSession: React.FC<ViewSessionProps> = ({ vehicleId, onClose }) => {
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [open, setOpen] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [amountDue, setAmountDue] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/parking-sessions?vehicle_id=${vehicleId}`
        );
        if (response.status === 200) {
          setSessions(response.data);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [vehicleId]);

  const handleDelete = async (id: string) => {
    try {
      setSessions(sessions.filter((session) => session.id !== id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleAddSession = async () => {
    const newSession = {
      id: Date.now().toString(),
      vehicle_id: vehicleId,
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      amount_due: amountDue,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/parking_sessions",
        newSession
      );
      if (response.status === 201) {
        setSessions([...sessions, response.data]);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        style={{ marginBottom: "16px" }}
      >
        Back to Vehicles
      </Button>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h4">
          Parking Sessions for Vehicle ID: {vehicleId}
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Session
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Check-In Time</TableCell>
              <TableCell>Check-Out Time</TableCell>
              <TableCell>Amount Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{session.check_in_time}</TableCell>
                <TableCell>{session.check_out_time}</TableCell>
                <TableCell>{session.amount_due}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(session.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Parking Session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Check-In Time"
            fullWidth
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Check-Out Time"
            fullWidth
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Amount Due"
            fullWidth
            value={amountDue}
            onChange={(e) => setAmountDue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSession} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewSession;
