import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  category: string;
}

interface BooksListProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  handleLoan: (bookId: number) => void;
  deleteBook: (bookId: number) => void;
  handleOpenEditBookModal: (book: Book) => void;
  userId: number | null;
}

const BooksList : React.FC<BooksListProps> = ({ books, loading, error, handleLoan, deleteBook, userId, handleOpenEditBookModal }) => {
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
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Data de Publicação</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.publishDate}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>
                {userId ? (
                    <Button variant="contained" color="primary" onClick={() => handleLoan(book.id)}>
                    Emprestar
                    </Button>
                ) : null }
                  <Button 
                  style={userId ? {marginLeft: '10px'}: {}}
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenEditBookModal(book)}>
                    Editar
                  </Button>
                  <Button
                  variant="contained"
                  color="primary"
                  style={{marginLeft: '10px'}}
                  onClick={() => deleteBook(book.id)}>
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

export default BooksList;