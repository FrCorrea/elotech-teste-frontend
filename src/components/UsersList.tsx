import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';

interface User {
    id: number | null;
    name: string;
    email: string;
    registerDate: string;
    phoneNumber: string;
  }

interface UsersListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    handleDeleteUser: (id: number) => void;
    handleEditUser: (user: User) => void;
  }

  const UsersList: React.FC<UsersListProps> = ({ users, loading, error,handleDeleteUser, handleEditUser })  => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Data de Cadastro</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.registerDate}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditUser(user)}>
                  Editar
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleDeleteUser(user.id)}>
                  Deletar
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersList;