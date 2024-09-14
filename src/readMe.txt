2024 React Module Project

This project is a comprehensive summery of the entire React module learned during the Full-stack Development course in HackerU.

This project foucses on creating a web app that incorporates server side http requests. React hooks, custom hooks. State handeling, Side effects on components, Context for authorization and darkmode.

This web app is designed for bussiness looking to expand there exposure or anyone who is looking for something particular.

As a user you can either create regular or business account. (A business account is created by checking the checkbox in the sign-up form)

As a regular user you can:
1. Search for business cards and set them as your favorite
2. Edit your personal info

As a business user you can:
1. Search for business cards and set them as your favorite
2. Edit your personal info
3. Create business cards and edit their details when needed

When logged as in admin:
Can do all of the actions a business user can do, and also delete users or change there accounts status from business to a regular and vice versa

**NOTE**
Protected routes where added for pages such: Create Card, Edit Card, Cards Created, Control Panel (Admin Only).
This is so if users want to accsess pages that are not whitin their authorization, it will send them back to the main page.

Other features:
Light/Dark Mode
Pagination (Disabled when searching for something in the search filed in the navbar)

Libraries used:
Axois: To handle http requests
Formik: Handling forms
Joi: Validation for form schemas
toastify: Giving users alerts for when a action was either successfully fulfilled or cancled
jwt-decode: for decoding the token given from the server to fetch data.