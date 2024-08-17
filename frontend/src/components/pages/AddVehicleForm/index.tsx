import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

interface Vehicle {
  id: string;
  number: string;
  make: string;
  model: string;
  ownerName: string;
}

interface AddVehicleFormProps {
  onAddVehicle: (vehicle: Vehicle) => void;
}

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ onAddVehicle }) => {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const handleSubmit = async () => {
    const newVehicle = {
      id: Date.now().toString(),
      number,
      make,
      model,
      ownerName,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/vehicles",
        newVehicle
      );
      if (response.status === 201) {
        onAddVehicle(newVehicle);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Vehicle
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Number"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Make"
            fullWidth
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Model"
            fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Owner Name"
            fullWidth
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVehicleForm;
