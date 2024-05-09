import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notification from './Notification';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks/index'
import { loginUser } from '../reducers/userReducer'

function LoginForm({ setShowLoginForm, setShowRegisterForm }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notifyWith = useNotification()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      setShowLoginForm(false);
    } catch (e) {
      console.log("error")
      notifyWith('wrong username or password', 'error')
    }
  }

  const openRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
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
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Button type="button" variant="outline-dark" onClick={openRegisterForm}>Create Account</Button>
        <Notification/>
    </>
  );
}

export default LoginForm;