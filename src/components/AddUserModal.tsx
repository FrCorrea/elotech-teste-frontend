import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  handleAddUser: (name : string, email : string,  phoneNumber : string) => void;

}

function AddUserModal({ open, onClose, handleAddUser }: AddUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
        <Typography variant="h6" gutterBottom color='primary' sx={{ mb: 2 }}>
          Adicionar Novo Usuário
        </Typography>
        <TextField
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Telefone"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleAddUser(name, email, phoneNumber)}>
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
}

export default AddUserModal;