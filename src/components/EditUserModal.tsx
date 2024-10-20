import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';


interface User {
  id: number | null;
  name: string;
  email: string;
  registerDate: string;
  phoneNumber: string;
}

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  handleEditUser: (id : number | null, name : string, email : string,  phoneNumber : string, registerDate : string) => void;
  user: User | null;

}

function EditUserModal({ open, onClose, handleEditUser, user }: EditUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registerDate, setRegisterDate] = useState('');
  const id = user ? user.id : null;


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setRegisterDate(user.registerDate);
    }
  }, [user]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
        <Typography variant="h6" gutterBottom color='primary' sx={{ mb: 2 }}>
           Editar Usuário
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
        <TextField
          label="Data de Cadastro"
          fullWidth
          value={registerDate}
          onChange={(e) => setRegisterDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleEditUser(id ,name, email, phoneNumber, registerDate)}>
          Editar
        </Button>
      </Box>
    </Modal>
  );
}

export default EditUserModal;