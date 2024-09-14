import { useFormik } from "formik";
import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import CheckBox from "../components/common/checkbox";
import ToolTip from "../components/common/toolTip";
import { registerFromScehma, registerValidateScehma } from "../formScehmas";

function SignUp() {
  const [serverError, setServerError] = useState("");
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  const { user, signUp, theme } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: registerFromScehma,
    validate(values) {
      const schema = registerValidateScehma;

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) return null;

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path.join(".");
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await signUp({ ...values });
        navigate("/sign-in");
      } catch (err) {
        if (err.response?.status === 400) setServerError(err.response.data);
      }
    },
  });

  if (user) return <Navigate to="/" />;

  return (
    <div className="container">
      <PageHeader
        title="Sign Up"
        description="Open a new account, Choose to be a regular or business account"
      />
      <form
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
        className="form d-flex flex-column"
      >
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
          <Input
            {...form.getFieldProps("name.first")}
            type="text"
            label="First Name"
            required
            error={form.touched.name?.first && form.errors["name.first"]}
          />
          <Input
            {...form.getFieldProps("name.middle")}
            type="text"
            label="Middle Name"
            error={form.touched.name?.middle && form.errors["name.middle"]}
          />
          <Input
            {...form.getFieldProps("name.last")}
            type="text"
            label="Last Name"
            required
            error={form.touched.name?.last && form.errors["name.last"]}
          />
        </div>
        <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
          <Input
            {...form.getFieldProps("phone")}
            type="text"
            label="Phone"
            required
            error={form.touched.phone && form.errors.phone}
          />
          <Input
            {...form.getFieldProps("email")}
            type="email"
            label="Email"
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
        </div>
        <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
          <Input
            {...form.getFieldProps("image.url")}
            type="text"
            label="Image Url"
            error={form.touched.image?.url && form.errors.image?.url}
          />
          <Input
            {...form.getFieldProps("image.alt")}
            type="text"
            label="Image Alt"
            error={form.touched.image?.alt && form.errors.image?.alt}
          />
        </div>
        <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
          <Input
            {...form.getFieldProps("address.state")}
            type="text"
            label="State"
            error={form.touched.address?.state && form.errors.address?.state}
          />
          <Input
            {...form.getFieldProps("address.country")}
            type="text"
            label="Country"
            required
            error={
              form.touched.address?.country && form.errors["address.country"]
            }
          />
          <Input
            {...form.getFieldProps("address.city")}
            type="text"
            label="City"
            required
            error={form.touched.address?.city && form.errors["address.city"]}
          />
        </div>
        <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
          <Input
            {...form.getFieldProps("address.street")}
            type="text"
            label="Street"
            required
            error={
              form.touched.address?.street && form.errors["address.street"]
            }
          />
          <Input
            {...form.getFieldProps("address.houseNumber")}
            type="number"
            label="House Number"
            required
            error={
              form.touched.address?.houseNumber &&
              form.errors["address.houseNumber"]
            }
          />
          <Input
            {...form.getFieldProps("address.zip")}
            type="number"
            label="Zip"
            required
            error={form.touched.address?.zip && form.errors["address.zip"]}
          />
        </div>
        <div className="my-2 d-flex m-auto w-100">
          <CheckBox
            label="Business"
            type="checkbox"
            check={check}
            {...form.getFieldProps("isBusiness")}
          />
          <ToolTip text="Business Accounts can create business cards" />
        </div>

        <div className="my-2 m-auto">
          <button
            type="submit"
            disabled={!form.isValid}
            className={theme ? "btn btn-secondary" : "btn btn-primary"}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
