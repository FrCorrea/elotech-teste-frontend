import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

interface User {
  id: number;
  name: string;
}

interface UsersSelectProps {
  onUserSelect: (userId: number) => void;
  users: User[];
  loading: boolean;
  error: string | null;
}

const UsersSelect = ({ onUserSelect, users, loading, error }: UsersSelectProps) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="user-select-label">Selecione um usuário</InputLabel>
      <Select
        labelId="user-select-label"
        onChange={(e) => onUserSelect(Number(e.target.value))}
        defaultValue=""
      >
        <MenuItem value="">
          <em>Nenhum</em>
        </MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default UsersSelect;
