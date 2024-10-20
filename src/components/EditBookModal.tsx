import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  category: string;
}

interface EditBookModalProps {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  handleEditBook: (id: number, title: string, author: string, isbn: string, publishDate: string, category: string) => void;
}

function EditBookModal({ open, onClose, handleEditBook, book }: EditBookModalProps) {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [publishDate, setPublishDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setPublishDate(book.publishDate);
      setCategory(book.category);
    }
  }, [book]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
          Editar Livro
        </Typography>
        <TextField
          label="Título"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Autor"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="ISBN"
          fullWidth
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Data de publicação"
          fullWidth
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Categoria"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (book) {
              handleEditBook(book.id, title, author, isbn, publishDate, category);
              onClose();
            }
          }}
        >
          Editar
        </Button>
      </Box>
    </Modal>
  );
}

export default EditBookModal;
