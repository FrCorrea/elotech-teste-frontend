import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

interface Loan {
  id: number;
  user: {
    name: string;
  };
  book: {
    title: string;
  };
  loanDate: string;
  returnDate: string;
  status: string;
}


interface LoansListProps {
  loans: Loan[];
  loading: boolean;
  error: string | null;
}


const LoansList : React.FC<LoansListProps> = ({ loans, loading, error }) => {

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
            <TableCell>Usuário</TableCell>
            <TableCell>Livro</TableCell>
            <TableCell>Data do Empréstimo</TableCell>
            <TableCell>Data do Retorno</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.id }</TableCell>
              <TableCell>{loan.user?.name ? loan.user.name : 'Usuário apagado'}</TableCell>
              <TableCell>{loan.book?.title ? loan.book.title : 'Livro apagado'}</TableCell>
              <TableCell>{loan.loanDate}</TableCell>
              <TableCell>{loan.returnDate}</TableCell>
              <TableCell>{loan.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LoansList;