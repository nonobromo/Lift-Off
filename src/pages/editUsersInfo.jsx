import { useAuth } from "../contexts/auth.context";
import { useEffect } from "react";
import usersService from "../services/usersService";
import { useFormik } from "formik";
import Input from "../components/common/input";
import { useTheme } from "../contexts/theme.context";
import useUser from "../hooks/getUser";
import Joi from "joi";
import { phoneRegex } from "../regax";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function EditUserInfo() {
  const { user } = useAuth();
  const { editUser } = usersService;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { userInfo } = useUser(user._id);

  const form = useFormik({
    initialValues: {
      name: { first: "", middle: "", last: "" },
      phone: "",
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
      image: { url: "", alt: "" },
    },
    validate(values) {
      const schema = Joi.object({
        name: Joi.object({
          first: Joi.string().min(2).max(256).required().label("First Name"),
          middle: Joi.string().min(2).max(256).allow(""),
          last: Joi.string().min(2).max(256).required(),
        }),
        phone: Joi.string().min(9).max(11).required().pattern(phoneRegex),
        address: Joi.object({
          state: Joi.string().min(2).max(256).allow(""),
          country: Joi.string().min(2).max(256).required(),
          city: Joi.string().min(2).max(256).required(),
          street: Joi.string().min(2).max(256).required(),
          houseNumber: Joi.number().min(1).required(),
          zip: Joi.number().min(1).required(),
        }),
        image: Joi.object({
          url: Joi.string().min(14).allow(""),
          alt: Joi.string().min(2).max(256).allow(""),
        }),
      });
      const { error } = schema.validate(values, { abortEarly: false });
      if (error) {
        const errors = {};
        for (const detail of error.details) {
          const key = detail.path.join(".");
          errors[key] = detail.message;
        }
        return errors;
      }
      return null;
    },
    async onSubmit(values) {
      try {
        await editUser(user?._id, values);
        navigate("/user-info");
        toast.success("Information Changed");
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    form.setValues({
      name: {
        first: userInfo.name?.first || "",
        middle: userInfo.name?.middle || "",
        last: userInfo.name?.last || "",
      },
      phone: userInfo.phone || "",
      address: {
        state: userInfo.address?.state || "",
        country: userInfo.address?.country || "",
        city: userInfo.address?.city || "",
        street: userInfo.address?.street || "",
        houseNumber: userInfo.address?.houseNumber || "",
        zip: userInfo.address?.zip || "",
      },
      image: { url: userInfo.image?.url || "", alt: userInfo.image?.alt || "" },
    });
  }, [userInfo]);

  return (
    <div className="container">
      <h1>Edit Your Info</h1>

      <div className="container">
        <form
          onSubmit={form.handleSubmit}
          noValidate
          autoComplete="off"
          className="form d-flex flex-column"
        >
          <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
            <Input
              {...form.getFieldProps("name.first")}
              type="text"
              label="First Name"
            />
            <Input
              {...form.getFieldProps("name.middle")}
              type="text"
              label="Middle Name"
            />
            <Input
              {...form.getFieldProps("name.last")}
              type="text"
              label="Last Name"
            />
          </div>
          <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
            <Input {...form.getFieldProps("phone")} type="text" label="Phone" />
            <Input
              {...form.getFieldProps("image.url")}
              type="text"
              label="Image Url"
            />
            <Input
              {...form.getFieldProps("image.alt")}
              type="text"
              label="Image Alt"
            />
          </div>
          <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
            <Input
              {...form.getFieldProps("address.state")}
              type="text"
              label="State"
            />
            <Input
              {...form.getFieldProps("address.country")}
              type="text"
              label="Country"
            />
            <Input
              {...form.getFieldProps("address.city")}
              type="text"
              label="City"
            />
          </div>
          <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto form-field-flex">
            <Input
              {...form.getFieldProps("address.street")}
              type="text"
              label="Street"
            />
            <Input
              {...form.getFieldProps("address.houseNumber")}
              type="number"
              label="House Number"
            />
            <Input
              {...form.getFieldProps("address.zip")}
              type="number"
              label="Zip"
            />
          </div>
          <div className="my-2 d-flex justify-content-around align-items-center w-100 mx-auto">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!form.isValid}
            >
              Change Info
            </button>

            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
                toast.success("Canceled");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserInfo;
