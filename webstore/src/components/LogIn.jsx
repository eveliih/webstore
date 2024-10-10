import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "../hooks/index";
import { loginUser } from "../reducers/userReducer";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm({ setShowLoginForm, setShowRegisterForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notifyWith = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
      setShowLoginForm(false);
      navigate("/products");
    } catch (e) {
      notifyWith("wrong username or password", "error");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  return (
    <Container id="custom-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button
          className="green-button"
          id="login-button"
          variant="primary"
          type="submit"
        >
          Log in
        </Button>
      </Form>
      <Button
        className="account-button mt-5"
        type="button"
        variant="outline-dark"
        onClick={openRegisterForm}
      >
        Create Account
      </Button>
    </Container>
  );
}

export default LoginForm;
