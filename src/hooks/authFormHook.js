import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../mode/authSlice";

function useAuthForm(isRegister) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("username", data.username.trim());
    formData.append("password", data.password.trim());
    if (isRegister) formData.append("email", data.email.trim());
    formData.append("action", isRegister ? "register" : "login");

    try {
      const response = await fetch("https://web.ics.purdue.edu/~vherce/auth.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setData({ username: "", password: "", email: "" });
        setSuccessMessage(result.success);
        setError("");

        dispatch(login());
        navigate("/");
      } else {
        setError(result.error);
        setSuccessMessage("");
      }
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    data,
    error,
    submitting,
    successMessage,
    handleChange,
    handleSubmit,
  };
}

export default useAuthForm;
