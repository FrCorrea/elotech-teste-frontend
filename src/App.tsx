import React, { useState, useEffect } from 'react';
import LoansUserList from './components/LoanUserList';
import UsersSelect from './components/UsersSelect';
import LoansList from './components/LoansList';
import UsersList from './components/UsersList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BookList from './components/BookList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RecommendationsUser from './components/RecommendationsUser';
import BookGoogleDocs from './components/BookGoogleDocs';

import AddBookModal from './components/AddBookModal';
import axios from 'axios';
import EditBookModal from './components/EditBookModal';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import { TextField } from '@mui/material';

interface User {
  id: number | null;
  name: string;
  email: string;
  registerDate: string;
  phoneNumber: string;
}



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

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  category: string;
}

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

function App() {

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openAddBookModal, setOpenAddBookModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loansUser, setLoansUser] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [recommedationsUser, setRecommendationsUser] = useState<Book[]>([]);
  const [editBookModal, setEditBookModal] = useState<Book | null>(null);
  const [openEditBookModal, setOpenEditBookModal] = useState<boolean>(false);
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false);
  const [openEditUserModal, setOpenEditUserModal] = useState<boolean>(false);
  const [editUserModal, setEditUserModal] = useState<User | null>(null);
  const [googleBooks, setGoogleBooks] = useState<BooksGoogle[]>([]);
  const [googleSearch, setGoogleSearch] = useState<string>('');

  useEffect(() => {
    if(selectedUserId) {
      fetchLoansUser();
      fetchRecommendationsUser();
      return;
    }
    fetchBooks();
    fetchUsers();
    fetchLoans();
  }, [selectedUserId]);

  const handleOpenAddBookModal = () => {
    setOpenAddBookModal(true);
  };

  const handleCloseAddBookModal = () => {
    setOpenAddBookModal(false);
  };

  const handleOpenEditUserModal = (user: User) => {
    setEditUserModal(user);
    setOpenEditUserModal(true);
  };

  const handleCloseEditUserModal = () => {
    setEditUserModal(null);
    setOpenEditUserModal(false);
  };
 
  const handleOpenEditBookModal = (book: Book) => {
    setEditBookModal(book);
    setOpenEditBookModal(true);
  };

  const handleCloseEditBookModal = () => {
    setEditBookModal(null);
    setOpenEditBookModal(false);
  };

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  const fetchBooksGoogle = async (title : string) => {
    try {
      const toLower = title.toLowerCase();
      const finalTitle = toLower.split(' ').join('.');
      console.log(finalTitle);
      const response = await axios.get<BooksGoogle[]>(`/books/getForGoogle?title=${finalTitle}`);
      setGoogleBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar livros. Tente novamente mais tarde. ' + err);
      setLoading(false);
    }
  };


  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>('/books');
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar livros. Tente novamente mais tarde. ' + err);
      setLoading(false);
    }
  };

  const handleEditUser = async (id : number | null, name : string, email : string,  phoneNumber : string, registerDate : string) => {
    try {
      await axios.put(`/users/update`, { id, name, email, phoneNumber, registerDate });
      handleCloseEditUserModal();
      fetchUsers();
    } catch (err) {
      setError('Erro ao editar o usuário. Tente novamente mais tarde. ' + err);
    }
  };

  const handleEditBook = async (id: number, title : string, author : string, isbn : string, publishDate : string, category : string) => {
    try {
      await axios.put(`/books/update`, { id, title, author, isbn, publishDate, category });
      fetchBooks();
      fetchLoans();
      if(selectedUserId) {
        fetchLoansUser();
        fetchRecommendationsUser();
      }
      handleCloseEditBookModal();
    } catch (err) {
      setError('Erro ao editar o livro. Tente novamente mais tarde. ' + err);
    }
  };

  const deleteBook = async (bookId: number) => {
    try {
      await axios.delete(`/books/delete/${bookId}`);
      fetchBooks();
      fetchLoans();
      if(selectedUserId) {
        fetchLoansUser();
        fetchRecommendationsUser();
      }
    } catch (err) {
      setError('Erro ao deletar o livro. Tente novamente mais tarde. ' + err);
    }
  };

  const handleLoan = async (bookId: number) => {
    try {
      const today = new Date();
      const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
      const year = nextMonthDate.getFullYear();
      const month = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
      const day = String(nextMonthDate.getDate()).padStart(2, '0');
      const nextMonth = `${year}-${month}-${day}`;
      await axios.post('/loans/save', { bookId, userId: selectedUserId, loanDate: new Date().toISOString().split('T')[0], returnDate:  nextMonth});
      fetchLoans();
      if(selectedUserId) {
        fetchLoansUser();
        fetchRecommendationsUser();
      }
    } catch (err) {
      setError('Erro ao emprestar o livro. Tente novamente mais tarde. ' + err);
    }
  };

  const handleDeleteUser = async (id : number) => {
    try {
      await axios.delete(`/users/delete/${id}`);
      fetchUsers();
      fetchLoans();
    } catch (err) {
      setError('Erro ao deletar o usuário. Tente novamente mais tarde. ' + err);
    }
  };

  const handleAddUser = async (name : string, email : string, phoneNumber : string) => {
    try {
      await axios.post('/users/register', { name, email, phoneNumber });
      setOpenAddUserModal(false);
      fetchUsers();
    } catch (err) {
      console.error('Erro ao adicionar usuário:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar usuários. Tente novamente mais tarde. ' + err);
      setLoading(false);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await axios.get<Loan[]>('/loans');
      setLoans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar empréstimos. Tente novamente mais tarde. ' + err);
      setLoading(false);
    }
  };

  const fetchLoansUser = async () => {
    try {
      const response = await axios.get<Loan[]>(`/loans/getByUserId/${selectedUserId}`);
      setLoansUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar empréstimos. Tente novamente mais tarde. ' + err);
      setLoading(false);
    }
  };

  const fetchRecommendationsUser = async () => {
    try {
      const response = await axios.get<Book[]>(`/recommendations/${selectedUserId}`);
      setRecommendationsUser(response.data);
      setLoading(false);
    } catch (err) {
      console.log('err ', err);
      setError('Erro ao buscar empréstimos. Tente novamente mais tarde. ' + err);
      setLoading(false);
    }
  };


  const handleReturn = async (id : number, userId : number, bookId : number, loanDate : string, returnDate : string) => {
    try {
      await axios.put('/loans/return', {id, userId, bookId, loanDate, returnDate});
      fetchLoans();
      if(selectedUserId) {
        fetchLoansUser();
        fetchRecommendationsUser();
      }
    } catch (err) {
      setError('Erro ao devolver o empréstimo. Tente novamente mais tarde.' + err  );
    }
  };

  const handleAddBook = async (title : string, author : string, isbn : string, publishDate : string, category : string, onClose: () => void) => {
    try {
      await axios.post('/books/save', { title, author, isbn, publishDate, category });
      onClose();
      fetchBooks();
    } catch (err) {
      console.error('Erro ao adicionar livro:', err);
    }
  };

  return (
    <Container 
    style={{
      backgroundColor: '#f5f5f5'
    }}
    maxWidth={false} 
    sx={{ px: 4,height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <Box sx={{ my: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom color='primary'>
         Biblioteca Elotech
        </Typography>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 4 }} color='primary'>
            Lista de Usuários
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => handleOpenAddUserModal()} >
              Adicionar Novo Usuário
          </Button>
        </div>
          <UsersList users={users} loading={loading} error={error} handleDeleteUser={handleDeleteUser} handleEditUser={handleOpenEditUserModal} />
        <Typography variant="h4" component="h4" gutterBottom color='primary'>
          Lista de Empréstimos Geral
        </Typography>
        <LoansList loans={loans} loading={loading} error={error} />
        <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 4 }} color='primary'>
          Selecionar Usuário
        </Typography>
        <UsersSelect loading={loading} error={error} users={users} onUserSelect={setSelectedUserId} />
        {selectedUserId && (
          <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 4 }} color='primary'>
            Lista de Empréstimos do Usuário
          </Typography>
        )}
        {selectedUserId && <LoansUserList loans={loansUser} loading={loading} error={error} handleReturn={handleReturn} />}
        {selectedUserId && (
          <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 4 }} color='primary'>
            Lista de Recomendações ao Usuário
          </Typography>
        )}
        {selectedUserId && <RecommendationsUser books={recommedationsUser} loading={loading} error={error} handleLoan={handleLoan} />}
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 4 }} color='primary'>
            Lista de Livros
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleOpenAddBookModal}>
              Adicionar Novo Livro
          </Button>
        </div>
        
        <AddUserModal open={openAddUserModal} onClose={handleCloseAddUserModal} handleAddUser={handleAddUser} />
        <AddBookModal open={openAddBookModal} onClose={handleCloseAddBookModal} handleAddBook={handleAddBook} />
        <EditUserModal open={openEditUserModal} user={editUserModal} onClose={handleCloseEditUserModal} handleEditUser={handleEditUser} />
        <EditBookModal open={openEditBookModal} book={editBookModal} onClose={handleCloseEditBookModal} handleEditBook={handleEditBook} />
        <BookList userId={selectedUserId} books={books} loading={loading} error={error} handleLoan={handleLoan} handleOpenEditBookModal={handleOpenEditBookModal} deleteBook={deleteBook} />

        <div
          style={{
            marginTop: '30px',
            display: 'flex',
          }}
        >
          <TextField
            label='Pesquise um livro do Google Books'
            fullWidth
            value={googleSearch}
            onChange={(e) => setGoogleSearch(e.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => fetchBooksGoogle(googleSearch)}>Pesquisar</Button>
        <BookGoogleDocs handleSaveBook={handleAddBook} books={googleBooks} loading={loading} error={error} />
      </Box>
    </Container>
  );
}

export default App;