import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';

interface Loan {
  id: number;
  user: {
    name: string;
  };
  book: {
    title: string;
    isbn: string;
    publishDate: string;
    category: string;
  };
  loanDate: string;
  returnDate: string;
  status: string;
}

interface LoansUserListProps {
  loans: Loan[];
  loading: boolean;
  error: string | null;
  handleReturn: (id: number, userId: number, bookId: number, loanDate: string, returnDate: string) => void;
}

const LoansUserList : React.FC<LoansUserListProps> = ({ loans, loading, error, handleReturn }) => {

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>Livro</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Data de Publicação</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Data do Empréstimo</TableCell>
            <TableCell>Data prevista / Data da Devolução</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.id}</TableCell>
              <TableCell>{loan.user.name}</TableCell>
              <TableCell>{loan.book.title}</TableCell>
              <TableCell>{loan.book.isbn}</TableCell>
              <TableCell>{loan.book.publishDate}</TableCell>
              <TableCell>{loan.book.category}</TableCell>
              <TableCell>{loan.loanDate}</TableCell>
              <TableCell>{loan.returnDate}</TableCell>
              <TableCell
                style={
                  loan.status === 'Pendente'
                    ? { color: 'red' } : {color: 'green'}
                }
              >{loan.status}</TableCell>
              <TableCell>
                {loan.status === 'Pendente' && (
                  <Button variant="contained"
                  color="primary"
                  onClick={() => handleReturn(loan.id, loan.user.id, loan.book.id, loan.loanDate, new Date().toISOString().split('T')[0])}>
                    Devolver
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LoansUserList;
