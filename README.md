# Consultation - Client Side

- ![am i responsive](/images-readme/Iamresponsive.jpg)
- live link - [Consultations](https://dhiaa-alomari.github.io/consultations-FE/index.html)

## Introduction
   - Legal Consultation Services
   Our platform offers an online service for a wide range of legal consultations, including but not limited to family law, criminal law, misdemeanors, commercial contracts, immigration law, and more.
   Through our application, users can easily book a legal consultation and connect with experienced lawyers and legal experts via Zoom. Before scheduling, users can select the type of consultation they require and specify the duration of the session.
   To complete the booking process, users will need to pay the specified consultation fee depending on the type and length of the service. Payments are securely processed using a bank card.

---
## Table of Contents
- [User Profiles](#user-profiles)
- [User Goals](#user-goals)
- [Design](#design)
  - [Wireframes section](#wireframes-section)
- [Features](#features)
  - [Home Page](#home-page)
  - [Registration Page](#registration-page)
  - [Login page](#login-page)
  - [Add Post Page](#add-post-page)
  - [Albums Page](#albums-page)
  - [Liked Posts](#liked-posts)
  - [Settings Page](#settings-page)
  - [Logged out](#logged-out)
- [Accessibility & UX Considerations](#accessibility--ux-considerations)  

- [Manual test](#manual-test)
  - [Nav-bar](#nav-bar)
  - [Search field](#search-field)
  - [Home_page](#home-page-1)
  - [Register page](#register-page)
  - [Login](#login)
  - [Add Post page.](#add-post-page-1)
  - [Albums](#albums)
- [Validation](#validation)
- [Lighthouse](#lighthouse)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
  - [Heroku](#heroku)
- [Bugs](#bugs)
- [Credits](#credits)
---

## User Profiles

User Experience on Our Legal Consultation Platform

- Users often find comfort in browsing our diverse array of legal consultation services as a way to gain insights and reassurance. They appreciate discovering new legal knowledge and occasionally upload queries or documents for personal advice.

- They take satisfaction in seeing expert responses to their inquiries and value their contributions to a knowledgeable network.

- Our platform simplifies the process of booking consultations, allowing users to gain the legal recognition they seek. The functionality to organize their consultation history and explore various legal services is an essential feature.

- Users love collecting and organizing their legal documents and inquiries. They enjoy curating their requests and sharing their experiences with family and friends.

- The seamless process of booking consultations and managing inquiries is crucial, as they frequently log in to explore, schedule, and enhance their legal knowledge

---

### User Goals

The Casual User:
- These users seek to discover new legal services and insights. They enjoy browsing through consultation options as a relaxing way to explore their legal needs.

The Client Seeking Advice:
- This group uses the platform to book consultations and connect with legal professionals. They appreciate feedback and guidance through interactions, session reviews, and the clarity of information provided.

The Engaged User:
- Enthusiasts enjoy finding and collecting useful legal resources. They take pride in organizing their consultations and gathering valuable legal knowledge.

Website Owner Goals:
- The owner's primary goal is to increase website traffic. More users lead to opportunities to expand features to enhance the experience for current users and attract new clients.

- This growth can result in increased revenue from consultations and potential subscription services for premium features.

- New features must be carefully selected to ensure existing users remain satisfied and engaged.

- The site must function seamlessly on both mobile devices and larger screens to ensure easy access and usability for all users.



---
## Design

### Wireframes section

- Mobile and iPad versions will share the same structure.
- Mobile - Home page wireframe.
- ![Mobile - Home page](/images-readme/index_mobile.drawio.png) 

- On mobile and iPad devices, clicking the hamburger icon opens the navigation menu, allowing users to access options such as services, contact, (log in, and register / cart, profile and logout). The menu remains open for easy navigation, and users should click the hamburger icon again to close it if user want it or click on anywhere except this menu.
---

- Mobile - Cart page wireframe
- ![Mobile - Cart page](/images-readme/payment_mobile.drawio.png)

---

- Mobile - log in page wireframe.
- ![Mobile - log in page](/images-readme/login_mobile.drawio.png)

---

- Desktop and wide screen devices versions will share the same structure.
- Desktop - Home page wireframe
- ![Desktop - Home page](/images-readme/index_desktop.drawio.png)

---

- Desktop - Cart page wireframe
- ![Desktop - Cart page](/images-readme/payment_desktop.drawio.png)

---

- Desktop - Profile page wireframe
- ![Desktop - Profile page](/images-readme/profile_desktop.drawio.png)

---

- Desktop - Log in page wireframe
- ![Desktop - Log in page](/images-readme/login_desktop.drawio.png)

---

## Features

### Authentication and Athorization System:
  - Admin account cannot be delete it.
  - Every user has sperated cart and profile page, cannot other user get access to it.
  - Must user input correct password when want delete user account.
  - Encrypt every password for more secure by backend server.
  - Every email must be unique.
  - Log in session has limit time when user is not active on page.

### Payment (Cart Page):
  - Empty Cart will prevent user to open it.
  - Show all booking consultations.
  - Can remove any booking consultations by delete button that located beside this booking.
  - Can update any booking consultations by edit button that located beside this booking.
  - To complete booking should click on pay button.
  - Show total price dependson duration and consultation type for every booking.
  - Can continue to book more consultations or browse the website by clicking on logo at navbar.

---

### Profile Page:
  - Show all a user's booking on appointment table that had been paid previously.
  - Can change any of user details by user information form.
  - Can change user password by change password form.
  - Can remove user account by input user password, just admin user is not able to removing.
  - Show avatar on profile page and can be change it.
  - Upload Avatar: Users can upload an image file to set as their profile avatar.
  - Username Field:
  - Displays the current username of the user.
  - Allows editing to update the username.
  - Biography Field:
    - Text area for users to input or edit their biography.
  - Avatar Upload:
    - Provides an option to upload a profile picture (avatar).
    - Includes a "Choose File" button for selecting an image file.
    - Displays "No file chosen" by default when no file is uploaded.
  - Save Changes:
    - Save Button: An orange button labeled "Save" to confirm and apply updates made to the profile.

---

### Updating booking Page:
  - Show booking details.
  - Can change any booking data like (consultation type, duratio, date and time).
  - Show total prise and it is updated when user change duration or type.
  - Validation prevent user book before 9am and after 6pm.
  - Validation prevent user book old date.
  - Show information messages when user get action on updating form.
  - Validation is running on both sides (browser side and server side).

---

### Home Page

- Navigation Bar:
  Includes options to navigate to the Home, Services, Contact, Login, and Register pages for quick access.
- The "Consultations" text, located on the top-left corner of the navigation bar.It is clickable and serves as a home button, allowing users to quickly return to the homepage from anywhere on the site.
- When user is logged in the navigation bar will hide login and register button.
- When user is logged in the navigation bar will show logout button, profile and cart.
- Hero section is under the navigation bar and shows image with a book button.
- Home page includes three sections customers review, booking form and contact form.
- Footer bar is at tile page and includes some contact information.
---

### Registration Page

- The Registration Page allows new users to create an account by providing their credentials.
  - Username: Users can enter their desired username.
  - E-mail: just an unique email get approved.
  - Password: Users can input their password for account security. Password must have at least 8 characters.
  - Confirm Password: Users must re-enter their password to ensure it matches.
  - Register button to submit their information and create an account.
- Register Button Behavior:
   - orange color: Indicates that the form is incomplete (e.g., the username field is empty), and the button is disabled unclickable.
   - darker orange: Indicates that the form is correctly filled out, and the button is active and ready to submit.
---

### Login page

- The Login Page allows registered users to access their accounts by entering their credentials.
- Username: Users must enter their registered username.
- E-mail that provided by user in register form can input in username field as alternative of username.
- Password: Users must enter their account password.
- Users can click the "Login" button to authenticate and access their account.

---

### Our Customers Reviews Section

- Show customers review by gentle design and.
- Show customers rating by gold stars.

---

### Book consultation Section

- Simple form for using.
- There validation rules on most form fields. 
- Interactive notification when user input correct or wrong data in fields.
- Check availability system send and recieve from database.
- Form fields is protected on client side and server side.

---

### Contact Us Section

- Simple form for using.
- There validation rules on email field. 
- Show success message when user send message.
- Form fields is protected on client side and server side.
- There no need user is logged in or has account.
---

### Logged out

- When user logged out you will be redirecting to the login page, informs the user that they’ve been successfully logged out and provides them an immediate option to log back in if they logged out by mistake. Improved user experience.

---

### Toaster Messages in the Project

- In this project, toaster messages are used to provide real-time feedback for user actions. These notifications appear in the bottom right corner of the screen to inform users about the success or failure of their actions.

---
## Accessibility & UX Considerations:
- This application follows accessibility guidelines by using semantic HTML, providing alt text for images, ensuring keyboard navigability, and maintaining sufficient color contrast. The user interface is designed for ease of use with clear navigation, intuitive interactions, and responsive design.
---

## Manual test

### Nav-bar

| Tasks                                                                                                               | Yes | No  |
| ------------------------------------------------------------------------------------------------------------------- | --- | --- |
| Click on Consultations home page load.                                                                                     | x   |     |
| Click on home icon, home page load.                                                                                 | x   |     |
| Click on login, form login page load.                                                                              | x   |     |
| Click on register, form register page load.                                                                         | x   |     |
| On smaller screen navbar turn to hamburger icon.                                                                    | x   |     |
| click on hamburger icon it will expand.                                                                             | x   |     |
| Hamburger icon expands shows(Home, login, register) before login.                                                    | x   |     |
| Hamburger icon after login shows(home, profile, cart,logout). | x   |     |


---

### Home page.

| Tasks                                                                        | Yes | No  |
| ---------------------------------------------------------------------------- | --- | --- |
| Page loads.                                                                  | x   |     |
| If you are not logged in, you will not be able to book consultation.                | x   |     |
| If you are logged in, you will be able to book consultation.                 | x   |     |
| Click on book appointment, it will take you to your cart page.                   | x   |     |
| Click on cart in navbar when cart is empty, cart page does not open.          | x   |     |
| Click on send in contact form, it will show you a success message.             | x   |     |
| Time list not working when type field and date list not be selected. | x   |     |
| Click on book now button, you will move to book consultation section.       | x   |     |

---

### Register page

| Tasks                                                                     | Yes | No  |
| ------------------------------------------------------------------------- | --- | --- |
| Page load.                                                                | x   |     |
| Click on register, form load to create new user.                          | x   |     |
| The form should not be any blank fields.                                  | x   |     |
| Both passwords must match.                                                | x   |     |
| click on Register, successful register you are taken to the sign in page. | x   |     |

---

### Login

| Tasks                                              | Yes | No  |
| -------------------------------------------------- | --- | --- |
| Click on Login, dispaly form for login page.       | x   |     |
| Form shouldn't be blank.                            | x   |     |
| You have sign, and taken to your posts page.       | x   |     |
| You can sign by email or username.       | x   |     |
| After login, logout, cart and profile display in the navbar. | x   |     |

---

### Book a new appointment.

| Tasks                                                            | Yes | No  |
| ---------------------------------------------------------------- | --- | --- |
| You should be logged in to have ability to booking.                    | x   |     |
| Click on book button, you will move to cart page.                     | x   |     |
| Message from the form will displays if user do a mistake         | x   |     |
| Check availability when select date and time.                                               | x   |     |
| Submit, your booking will be add to your cart.                      | x   |     |
| When the form is submitted there is a success toast notification | x   |     |

---

### Profile

| Tasks                                                                                             | Yes | No  |
| ------------------------------------------------------------------------------------------------- | --- | --- |
| You must be logged in to access Profile. page.                                                  | x   |     |
| Appointment table show all paid booking.          | x   |     |
| Profile form fields will display all user information.              | x   |     |
| Upload avatar is working.                                     | x   |     |
| For every action performed, the appropriate message will be displayed in the top-right corner. | x   |     |
| Change password form works.                                     | x   |     |


---

## Validation

  **Document checking completed. No errors or warnings to show.**
- I tested all my pages and result was no error in html, css and javascript code.
- I have validated all my __html__ files using the W3C Validator, and no errors were found.
### index.html
- ![index html test](/images-readme/index_html_check.jpg)
### login.html
- ![login html test](/images-readme/login_html_check.jpg)
### register.html
- ![sign up html test](/images-readme/register_html_check.jpg)
### payment.html
- ![cart html test](/images-readme/payment_html_check.jpg)
### updating.html
- ![updating html test](/images-readme/updating_html_check.jpg)
### profile.html
- ![profile html test](/images-readme/profile_html_check.jpg)
---
- I have validated all my __JavaScript__ and JSX files using ESLint, and no errors were found.
### main.js
- ![main js test](/images-readme/main_js_validator_test.jpg)
### profile.js
- ![profile js test](/images-readme/profile_js_validator_test.jpg)
### payment.js
- ![payment js test](/images-readme/payment_js_validator_test.jpg)
### auth.js
- ![auth js test](/images-readme/auth_js_validator_test.jpg)
### config.js
- ![config js test](/images-readme/config_js_validator_test.jpg)
### updating.js
- ![updating js test](/images-readme/updating_js_validator_test.jpg)
### utils.js
- ![utils js test](/images-readme/utils_js_validator_test.jpg)
---
### style.css
- I have validated all my __CSS__ files using the W3C Jigsaw Validator, and no errors were found.
- ![css test](/images-readme/w3c_css_validator_test.jpg)
---
### Lighthouse test
- ![lighthouse test](/images-readme/lighthouse_test.jpg)

### Stripe payment test
- ![Stripe test](/images-readme/prove_succeded_payment_on_stripe.png)

---

## Technologies Used

- Core Technologies:
  - __Vanila Javascript__:  script language.
- Styling & UI:
  - __CSS__: cascading style sheets.
- Markup Language:
  - __HTML__: Hyper Text Markup Language.
- State Management & Utilities:
  - __Axios__: Handles HTTP requests with a global axiosInstance.
  - __Local Storage__: store data in web browser .


---

## Deployment

- Deploy the project on __Github Pages__.
  - Enable GitHub Pages
    - Go to Your Repository on GitHub: Navigate to your repository in your web browser.

  - Access Repository Settings:
    - Click on the "Settings" tab.
    - Scroll to GitHub Pages:
    - Find the "Pages" section in the left sidebar.
    - Under the "Source" section, select the branch you want to use (usually main or master).
    - If needed, select the / (root) folder for your project.
    - Save Your Changes: Click "Save" if prompted.

  - Access Your Deployed Site View Your Site:
    - After enabling GitHub Pages, your site will be available at https://username.github.io/repository-name/ (or https://username.github.io/ for user sites).
    - It may take a few minutes for the site to be accessible.
    - Check for Issues: If the page doesn’t load, ensure your index.html file is in the root directory, as GitHub Pages defaults to looking for this file.

---
## Bugs
- Updating for specific appointment on web browser in mobile not going:
  - I had no error in the console while updating appointment but there no update for this appointment data in backend (databse) that happend just when I use mobile but in desktop everything was done in both sides (frontend and backend), I asked Open AI Chatgpt and it gave me one suggestion for adding slash __/__ on end of request address.
  - This image before adding slash to request address:
  - ![bad request](/images-readme/error_http_request_url_without_slash.png)
  - After debug ths request address:
  - ![success request](/images-readme/fix_http_request_url_without_slash.png)
---
- Input html tag missing autocomplete attribute:
   - When I test this website by lighthouse test tool in google chrome web browser, there found warning that input html tag is missing to autocomplete attribute and for giving more secure to the website code lighthouse tool recommend me to add this attribute to this input element when the type is password.
  - This image before adding autocomplete attribute to input html tag:
  - ![missing attribute](/images-readme/error_input_html_tag_missing_autocomplete_attribute.jpg)
  - After adding autocomplete attribute:
  - ![attribute included](/images-readme/fix_input_html_tag_missing_autocomplete_attribute.jpg)
---
- Form html element does not have label element:
   - When I test this website by lighthouse test tool in google chrome web browser, on the result of test there found warning that form tag has label with no for attribute and for attribute must has value likes to form's id and that is useful with search engines and SEO. Lighthouse tool ask me to add this attribute to label html element with appropriated value.
  - Lighthouse warning message:
  - ![form element with no label](/images-readme/form_has_no_label.jpg)
---
- New CSS propert not existing in interpreter:
   - I used new css property that was text-box-trim but when I tested my css code by W3C css validator service there was error with this new property and tester cannot know it for that I deleted this property and change it with line-height property.
  - ![new css property](/images-readme/text_box_trim_not_existing_in_legacy_css.jpg)
---
- Object variable cannot be passed as a data attribute in an html element:
   - I needed pass javascript object by data attribute in an html element to get it in function but it was not allowed just can put variable type (number, boolean or string) in data attribute for that I asked chatgpt to give me solve for this problem and this AI model gave me a good suggestion this objict will convert it to string type then in function can return it to object type again by using JSON.stringify then JSON.parse.
  - The image will explain this problem, you can see the problem with the red line:
  - ![missing attribute](/images-readme/error_object_variable_not_pass_by_attribute.jpg)
  - The problem is solved when JSON used for solving:
  - ![attribute included](/images-readme/fix_object_variable_not_pass_by_attribute.jpg)
---
## Credits
- I would like to extend my sincere appreciation to Code Institute for granting me extra time to complete this project. Their support and flexibility allowed me to refine my work and ensure I met all the necessary requirements. I am grateful for the opportunity to improve and successfully complete this milestone.
- Inspiration_
  - The design and layout of the front-end were inspired by a similar website I came across  [- ( Snaps ) -](https://snaps-frontend-871b3764ee9c.herokuapp.com/). No code was copied; I only used it as a reference for the visual structure and user experience.
- AI model that Open AI Chatgpt was used to solve some buges.