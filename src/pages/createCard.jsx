import { useFormik } from "formik";
import Input from "../components/common/input";

import { useNavigate } from "react-router-dom";
import cardsService from "../services/cardsService";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { cardCreateValidateScehma, cardFormSchema } from "../formScehmas";

function CreateCard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const cardForm = useFormik({
    initialValues: cardFormSchema,
    validate(values) {
      const schema = cardCreateValidateScehma;

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
        const { image, ...body } = values;

        if (image) {
          body.image = image;
        }
        await cardsService.createCard(values);
        navigate("/my-cards");
        toast.success("Card Created!");
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error(err.response.data);
        }
      }
    },
  });
  return (
    <div>
      <h1 className="text-center">Create A Business Card</h1>
      <form
        onSubmit={cardForm.handleSubmit}
        noValidate
        autoComplete="off"
        className={`form d-flex flex-column container ${
          theme === "dark" ? "bg-dark" : "bg-secondary-subtle"
        } p-3`}
      >
        <div className="d-flex justify-content-around form-field-flex mb-5">
          <Input
            {...cardForm.getFieldProps("title")}
            label="Title"
            type="text"
            required
            error={cardForm.touched.title && cardForm.errors.title}
          />
          <Input
            label="SubTitle"
            type="text"
            required
            {...cardForm.getFieldProps("subtitle")}
            error={cardForm.touched.subtitle && cardForm.errors.subtitle}
          />
          <Input
            label="Description"
            type="text"
            required
            {...cardForm.getFieldProps("description")}
            error={cardForm.touched.description && cardForm.errors.description}
          />
        </div>
        <div className="d-flex justify-content-around form-field-flex mb-5">
          <Input
            label="Phone"
            type="text"
            required
            {...cardForm.getFieldProps("phone")}
            error={cardForm.touched.phone && cardForm.errors.phone}
          />
          <Input
            label="Email"
            type="text"
            required
            {...cardForm.getFieldProps("email")}
            error={cardForm.touched.email && cardForm.errors.email}
          />
          <Input
            label="Web"
            type="text"
            required
            {...cardForm.getFieldProps("web")}
            error={cardForm.touched.web && cardForm.errors.web}
          />
        </div>
        <div className="d-flex justify-content-around form-field-flex mb-5">
          <Input
            label="URL"
            type="text"
            {...cardForm.getFieldProps("image.url")}
            error={cardForm.touched.image?.url && cardForm.errors.image?.url}
          />
          <Input
            label="Alt"
            type="text"
            {...cardForm.getFieldProps("image.alt")}
          />
        </div>

        <div className="d-flex justify-content-around form-field-flex mb-5">
          <Input
            label="State"
            type="text"
            {...cardForm.getFieldProps("address.state")}
          />
          <Input
            label="Country"
            type="text"
            required
            {...cardForm.getFieldProps("address.country")}
          />
          <Input
            label="City"
            type="text"
            required
            {...cardForm.getFieldProps("address.city")}
          />
        </div>
        <div className="d-flex justify-content-around form-field-flex">
          <Input
            label="street"
            type="text"
            required
            {...cardForm.getFieldProps("address.street")}
          />
          <Input
            label="House Number"
            type="number"
            required
            {...cardForm.getFieldProps("address.houseNumber")}
          />
          <Input
            {...cardForm.getFieldProps("address.zip")}
            label="ZIP"
            type="number"
            required
          />
        </div>
        <div className="my-2 d-flex justify-content-around align-items-center w-50 mx-auto">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!cardForm.isValid}
          >
            Submit
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
  );
}

export default CreateCard;
