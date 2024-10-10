import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "../hooks/index";
import { registerUser } from "../reducers/userReducer";
import { Container } from "react-bootstrap";

function RegisterForm({ setShowRegisterForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const notifyWith = useNotification();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      notifyWith("Passwords do not match", "error");
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }
    try {
      dispatch(registerUser({ username, name, password }));
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setShowRegisterForm(false);
    } catch (e) {
      console.log("error");
      notifyWith("Registration failed", "error");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container id="custom-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            placeholder="Enter name: Peter Parker"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Text className="text-muted">
            The password must be at least 8 characters long and include numbers,
            uppercase letters and special characters.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </Form.Group>

        <Button
          className="green-button register-button"
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterForm;
