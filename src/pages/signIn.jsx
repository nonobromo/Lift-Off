import Joi from "joi";
import { useFormik } from "formik";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import { useAuth } from "../contexts/auth.context";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMe } from "../services/usersService";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/theme.context";

function SignIn() {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [error, setServerError] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(6)
          .required()
          .email({ tlds: { allow: false } })
          .label("Email"),
        password: Joi.string().min(7).max(20).required().label("Password"),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path[0];
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await login(values);
        navigate("/");
        toast.success("Login success");
        await getMe(user._id);
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError("Incorrect Email or Password");
          toast.error("Incorrect Email or Password");
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <PageHeader title="Sign In" description="Sign in with your account" />
      <div
        className={`d-flex justify-content-center w-50 m-auto p-3 ${
          theme === "dark" ? "sign-in-dark" : "sign-in-light"
        }`}
      >
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          <Input
            {...form.getFieldProps("email")}
            type="email"
            label="Email"
            placeholder="john@doe.com"
            required
            error={form.touched.email && form.errors.email}
          />
          <Input
            {...form.getFieldProps("password")}
            type="password"
            label="Password"
            required
            error={form.touched.password && form.errors.password}
          />

          <div className="my-2">
            <button
              type="submit"
              disabled={!form.isValid}
              className="btn btn-primary"
            >
              Sign In
            </button>
          </div>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
