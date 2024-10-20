import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  handleAddBook: (title : string, author : string, isbn : string, publishDate : string, category : string, onClose: () => void) => void;

}

function AddBookModal({ open, onClose, handleAddBook }: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [category, setCategory] = useState('');
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
        <Typography variant="h6" gutterBottom color='primary' sx={{ mb: 2 }}>
          Adicionar Novo Livro
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
        <Button variant="contained" color="primary" onClick={() => handleAddBook(title, author, isbn, publishDate, category, onClose)}>
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
}

export default AddBookModal;