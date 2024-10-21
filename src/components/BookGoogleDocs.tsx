import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';

interface BooksGoogle {
  volumeInfo: {
    title: string;
    authors: string[];
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    publishedDate: string;
    categories: string[];
  };
}

interface BooksGoogleProps {
  books: BooksGoogle[];
  loading: boolean;
  error: string | null;
  handleSaveBook: (title : string, author : string, isbn : string, publishDate : string, category : string, onClose: () => void) => void;
}

const BooksList : React.FC<BooksGoogleProps> = ({ books, loading, error, handleSaveBook }) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getStartDateOfYear = (date) => {
    if (/^\d{4}$/.test(date)) {
      return `${year}-01-01`;
    }
    return date;
  };


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Data de Publicação</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.items?.map((item) => {
            const volumeInfo = item.volumeInfo;
            const title = volumeInfo.title;
            const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor não informado';
            const isbn = volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.map(id => `${id.type}: ${id.identifier}`).join(', ') : 'ISBN não disponível';
            const publishedDate = volumeInfo.publishedDate ? volumeInfo.publishedDate : 'Data de publicação não disponível';
            const categories = volumeInfo.categories ? volumeInfo.categories.join(', ') : 'Categoria não disponível';

            return (
              <TableRow key={item.id}>
                <TableCell>{title}</TableCell>
                <TableCell>{authors}</TableCell>
                <TableCell>{isbn}</TableCell>
                <TableCell>{publishedDate}</TableCell>
                <TableCell>{categories}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveBook(title, authors, isbn, getStartDateOfYear(publishedDate), categories, () => {})}
                  >
                    Adicione aos livros
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>;
      </Table>
    </TableContainer>
  );
}

export default BooksList;