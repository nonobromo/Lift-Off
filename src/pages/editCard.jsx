import { useFormik } from "formik";
import Input from "../components/common/input";

import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsService";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import useCard from "../hooks/getCard";
import { useEffect } from "react";
import { cardFormSchema, cardValidateScehma } from "../formScehmas";

function EditCard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { _id } = useParams();
  const { card } = useCard(_id);
  const cardForm = useFormik({
    initialValues: cardFormSchema,
    validate(values) {
      const schema = cardValidateScehma;

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
        await cardsService.updateCard(_id, values);
        navigate(-1);
        toast.success("Changes Saved!");
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error(err.response.data);
        }
      }
    },
  });

  useEffect(() => {
    cardForm.setValues({
      title: card.title || "",
      subtitle: card.subtitle || "",
      description: card.description || "",
      phone: card.phone || "",
      email: card.email || "",
      web: card.web || "",
      image: { url: card.image?.url || "", alt: card.image?.alt || "" },
      address: {
        state: card.address?.state || "",
        country: card.address?.country || "",
        city: card.address?.city || "",
        street: card.address?.street || "",
        houseNumber: card.address?.houseNumber || "",
        zip: card.address?.zip || "",
      },
    });
  }, [card]);

  return (
    <div>
      <h1 className="text-center">Edit A Business Card</h1>
      <div className="form-container d-flex flex-column align-items-center">
        <form
          onSubmit={cardForm.handleSubmit}
          noValidate
          autoComplete="off"
          className={`form d-flex flex-column container ${
            theme === "dark" ? "bg-dark" : "bg-secondary-subtle"
          } p-3`}
        >
          <div className="d-flex justify-content-around form-field-flex">
            <Input
              {...cardForm.getFieldProps("title")}
              label="Title"
              type="text"
            />
            <Input
              label="SubTitle"
              type="text"
              {...cardForm.getFieldProps("subtitle")}
            />
            <Input
              label="Description"
              type="text"
              {...cardForm.getFieldProps("description")}
            />
          </div>
          <div className="d-flex justify-content-around form-field-flex">
            <Input
              label="Phone"
              type="text"
              {...cardForm.getFieldProps("phone")}
            />
            <Input
              label="Email"
              type="text"
              {...cardForm.getFieldProps("email")}
            />
            <Input label="Web" type="text" {...cardForm.getFieldProps("web")} />
          </div>
          <div className="d-flex justify-content-around form-field-flex">
            <Input
              label="URL"
              type="text"
              {...cardForm.getFieldProps("image.url")}
            />
            <Input
              label="Alt"
              type="text"
              {...cardForm.getFieldProps("image.alt")}
            />
          </div>

          <div className="d-flex justify-content-around form-field-flex">
            <Input
              label="State"
              type="text"
              {...cardForm.getFieldProps("address.state")}
            />
            <Input
              label="Country"
              type="text"
              {...cardForm.getFieldProps("address.country")}
            />
            <Input
              label="City"
              type="text"
              {...cardForm.getFieldProps("address.city")}
            />
          </div>
          <div className="d-flex justify-content-around form-field-flex">
            <Input
              label="Street"
              type="text"
              {...cardForm.getFieldProps("address.street")}
            />
            <Input
              label="House Number"
              type="text"
              {...cardForm.getFieldProps("address.houseNumber")}
            />
            <Input
              label="ZIP"
              type="text"
              {...cardForm.getFieldProps("address.zip")}
            />
          </div>
          <div className="my-2 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!cardForm.isValid}
            >
              Submit
            </button>
          </div>
        </form>
        <button className="btn btn-danger mt-3" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditCard;
