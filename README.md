# Budget Warden
## Overview

<b>Budget Warden</b> is a web application which is designed to simplify personal finance management by keeping user's record of all recurring expenses, including subscriptions and bills, ultimately allowing users to regain control of their finances and reduce reckless spending.

### Problem Space

The increasing number of subscription services and the complexity of billing can make it difficult to monitor spending effectively. This often results in unintentional overspending. This application addresses this by providing a comprehensive view of recurring expenses, enabling users to proactively manage their finances and avoid unnecessary costs.

### User Profile

Budget warden will be used by people of different backgrounds, from students and young adults, to small business owners, families and individuals who want more control over their spending and subscriptions.

A User will create an account and input their subscription and bill information. They will be able to categorize their expenses and set up recurring payment reminders. Once completely setup users will be able to check their upcoming bills and recurring payments , and be able to add new bills and subscriptions as they come.

This app will be designed with the users in mind to give them complete satisfaction and cater to different user levels of financial literacy.

**Features**

- **User Accounts:**
  - Create/manage accounts.
  - Secure login/logout.
  - Password reset.
- **Subscriptions:**
  - Add/edit/delete subscriptions.
  - View subscription list.
  - Categorize subscriptions.
  - View renewal dates.
- **Bills:**
  - Add/edit/delete bills.
  - View bill list.
  - Categorize bills.
  - View due dates.
- **Expenses:**
  - View total expenses.
  - View expenses by category.
  - View expenses over time.
- **Budgets:**
  - Set budgets by category.
  - Track budget progress.
  - Receive budget alerts.
- **Notifications:**
  - Bill due date reminders.
  - Subscription renewal reminders.
  - Overspending alerts.
  - Customizable settings.
- **Visualization:**
  - Spending charts/graphs.
  - Category-based visualization.
  - Time-based visualization.
- **Settings:**
  - Password changes.
  - Currency/language settings.
  - Notification settings.
- **Data:**
  - Data backup.
  - Data restore.

**Implementation**

- **Tech Stack:**
  - React (Front-end)
  - Node.js (Back-end)
  - Express (Back-end framework)
  - MySQL (Database)
- **APIs:**
  - No external data APIs for the MVP. (Future implementations could include banking APIs)

**Sitemap**

- **Homepage:**
  - Displays expense summaries, upcoming bills/renewals, spending charts, and budget progress.
- **Subscriptions:**
  - Lists all subscriptions, allows adding, editing, and deleting.
- **Bills:**
  - Lists all bills, allows adding, editing, and deleting.
- **Budgets:**
  - Lists all budgets, allows adding, editing, and deleting.
- **Settings:**
  - User account settings, notification settings, currency/language settings.
- **Login/Register:**
  - User authentication pages.

**Mockups**

(Due to text-based limitations, I will describe the mockups. Imagine these as simple wireframes or hand-drawn sketches)

- **Homepage:**
  - A top section with a summary of total expenses.
  - A middle section with a list of upcoming bills and subscription renewals.
  - A bottom section with pie charts showing spending by category and a bar graph showing budget progress.
- **Subscriptions/Bills/Budgets Pages:**
  - A table listing all entries with columns for relevant information.
  - Buttons to add, edit, and delete entries.
  - Forms for adding and editing entries.
- **Settings Page:**
  - Form elements to change password, notification settings, and currency/language.
- **Login/Register Page:**
  - Input fields for email and password.
  - Buttons for login and registration.

**Data**

- **Users:**
  - `id` (Primary Key)
  - `username`
  - `email`
  - `password` (hashed)
  - `currency`
- **Subscriptions:**
  - `id` (Primary Key)
  - `user_id` (Foreign Key)
  - `name`
  - `cost`
  - `billing_cycle`
  - `renewal_date`
  - `category_id` (Foreign Key)
- **Bills:**
  - `id` (Primary Key)
  - `user_id` (Foreign Key)
  - `name`
  - `amount`
  - `due_date`
  - `category_id` (Foreign Key)
- **Budgets:**
  - `id` (Primary Key)
  - `user_id` (Foreign Key)
  - `category_id` (Foreign Key)
  - `amount`
  - `period`
- **Category:**
  - `id` (Primary Key)
  - `name`

**Endpoints**

- **Users Authentication**

  - `POST /api/auth/register`: Registers a new user.
  - `POST /api/auth/login`: Logs in a user.

- **Users Subscriptions**

  - `GET /users/:id/subscriptions`: Retrieves all subscriptions for a user.
  - `POST /users/:id/subscriptions`: Adds a new subscription.
  - `PUT /users/:id/subscriptions/:id`: Updates a subscription.
  - `DELETE /users/:id/subscriptions/:id`: Deletes a subscription.

- **Users Bills**

  - `GET /users/:id/bills`: Retrieves all bills for a user.
  - `POST /users/:id/bills`: Adds a new bill.
  - `PUT /users/:id/bills/:id`: Updates a bill.
  - `DELETE /users/:id/bills/:id`: Deletes a bill.

- **Users Budget**

  - `GET /users/:id/budgets`: Retrieves all budgets for a user.
  - `POST /users/:id/budgets`: Adds a new budget.
  - `PUT /users/:id/budgets/:id`: Updates a budget.
  - `DELETE /users/:id/budgets/:id`: Deletes a budget.

- **Users Expenses**

  - `GET /users/:id/expenses/`: Retrieves expense summary.
  - `GET /users/:id/expenses/?:category_name`: Retrieves expenses by category.

- **Categories**
  - `GET /categories`: Retrieves all categories.  
  - `GET /categories/{category_name}/items`: Retrieves all data related to that category {Bills, Budgets, Subscriptions }.
  - `GET /categories/:category_name/items/:item-type`: Retrieves all items of a particular item-type.


**Roadmap (4-Week Sprint)**

- **Week 1:**
  - Database setup (MySQL).
  - Back-end user authentication (Node.js/Express).
  - Back-end API endpoints for user management.
  - Basic Front end setup.
- **Week 2:**
  - Back-end API endpoints for subscriptions and bills.
  - Front-end implementation of subscription and bill management.
  - Begin basic styling.
- **Week 3:**
  - Back-end API endpoints for budgets and expense tracking.
  - Front-end implementation of budget management and expense visualization.
  - Implement notification system.
- **Week 4:**
  - Testing and debugging.
  - Deployment.
  - Implementation of data backup and restore.
  - Refinement and final touches.

**Future Implementations**

- Advanced reporting and analytics.
- Mobile application development.
- Implementation of a payment reminder system.