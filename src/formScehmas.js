import Joi from "joi";
import { phoneRegex, emailRegex, passwordRegex, webRegex } from "./regax";

export const registerFromScehma = {
  name: { first: "", middle: "", last: "" },
  phone: "",
  email: "",
  password: "",
  image: { url: "", alt: "" },
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  },
  isBusiness: false,
};

export const registerValidateScehma = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required().label("First Name"),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required().label("Last Name"),
  }),
  phone: Joi.string()
    .min(9)
    .max(11)
    .required()
    .pattern(phoneRegex)
    .message("phone must be a standard Israeli phone number"),
  email: Joi.string()
    .min(5)
    .required()
    .email({ tlds: { allow: false } })
    .pattern(emailRegex),
  password: Joi.string()
    .min(7)
    .max(20)
    .required()
    .pattern(passwordRegex)
    .message(
      "must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*- "
    ),
  image: Joi.object({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required().label("Country"),
    city: Joi.string().min(2).max(256).required().label("City"),
    street: Joi.string().min(2).max(256).required().label("Street"),
    houseNumber: Joi.number().min(1).required().label("House Number"),
    zip: Joi.number().min(1).required(),
  }),
  isBusiness: Joi.boolean(),
});

export const cardFormSchema = {
  title: "",
  subtitle: "",
  description: "",
  phone: "",
  email: "",
  web: "",
  image: { url: "", alt: "" },
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  },
};

export const cardValidateScehma = Joi.object({
  title: Joi.string().min(2).max(256).allow(""),
  subtitle: Joi.string().min(2).max(256).allow(""),
  description: Joi.string().min(2).max(1024).allow(""),
  phone: Joi.string().min(9).max(11).allow(""),
  email: Joi.string().min(5).allow(""),
  web: Joi.string().min(14).allow(""),
  image: Joi.object({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().allow(""),
    city: Joi.string().allow(""),
    street: Joi.string().allow(""),
    houseNumber: Joi.number().min(1).allow(""),
    zip: Joi.number().allow(""),
  }),
});

export const cardCreateValidateScehma = Joi.object({
  title: Joi.string().min(2).max(256).required().label("Title"),
  subtitle: Joi.string().min(2).max(256).required().label("Subtitle"),
  description: Joi.string().min(2).max(1024).required().label("description"),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(phoneRegex)
    .message("phone must be a standard Israeli phone number")
    .required()
    .label("Phone"),
  email: Joi.string()
    .min(5)
    .pattern(emailRegex)
    .message("email must be a standard email")
    .email({ tlds: { allow: false } })
    .label("Email"),
  web: Joi.string()
    .min(14)
    .allow("")
    .pattern(webRegex)
    .message("web must be a standard URL")
    .label("subtitle"),
  image: Joi.object({
    url: Joi.string().min(14).allow("").label("Image url"),
    alt: Joi.string().min(2).max(256).allow("").label("Image alt"),
  }),
  address: Joi.object({
    state: Joi.string().min(2).max(256).allow("").label("state"),
    country: Joi.string().min(2).max(256).required().label("country"),
    city: Joi.string().min(2).max(256).required().label("city"),
    street: Joi.string().min(2).max(256).required().label("street"),
    houseNumber: Joi.number()
      .min(1)
      .required()
      .messages({
        "number.min": "house number must be a minimum of 2 digits.",
      })
      .label("house number"),
    zip: Joi.number()
      .required()
      .messages({ "number.min": "Zip must be a minimum of 2 digits." })
      .label("ZIP"),
  }),
});
