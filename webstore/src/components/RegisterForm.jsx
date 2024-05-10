import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notification from './Notification';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks/index'
import { registerUser } from '../reducers/userReducer'
import { Container } from 'react-bootstrap';

function RegisterForm({ setShowRegisterForm }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const notifyWith = useNotification()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(registerUser({ username, name, password }))
      setUsername('')
      setPassword('')
      setName('')
      setShowRegisterForm(false);
    } catch (e) {
      console.log("error")
      notifyWith('wrong username or password', 'error')
    }
  }

  return (
    <Container id='custom-container'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Full Name</Form.Label>
        <Form.Control 
          placeholder="Enter name: Peter Parker" 
          id="name"
          value={name}
          onChange={({ target }) => setName(target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control 
          placeholder="Enter username" 
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={({ target }) => setPassword(target.value)}/>
           <Form.Text className="text-muted">
         The password must be at least 8 characters long and include numbers, uppercase letters and special characters.
        </Form.Text>
      </Form.Group>
      <Button className='green-button register-button' variant="primary" type="submit">
        Register
      </Button>
    </Form>
        <Notification/>
    </Container>
  );
}

export default RegisterForm;