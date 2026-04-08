# Company Inventory Management System

A full-stack CRUD web application built using:

- Backend: PHP (OOP + REST API)
- Frontend: HTML, CSS, JavaScript (Bootstrap)
- Database: MySQL

---

#  Features

- User Authentication (Login/Register)
- User Logout
- Product CRUD (Add,Get, View, Update, Delete)
- Image upload (single/multiple)
- Dashboard with statistics
- Search, filter, pagination, sorting
- Responsive UI (Mobile-first)
- Profile management

---

# Setup Instructions 

## 1. Clone Repository

```bash
git clone https://github.com/rishininawodi/Company-Inventory-Management-System.git
```
---
## 2. Move to XAMPP
Place project inside:
```bash
C:/xampp/htdocs/Company-Inventory-Management-System
```
---
## 3. Start Server
Start Apache<br>
Start MySQL (XAMPP)

## 4. Create Database
Open phpMyAdmin<br>
Create database:  company_inventorydb <br>
Import SQL file:database/company_inventorydb.sql

## 5. Configure Database
backend/config/db.php

## 6. Run Project
Open browser:<br>
```bash
http://localhost/Company-Inventory-Management-System/frontend/register.html
http://localhost/Company-Inventory-Management-System/frontend/login.html
```

---

#    API Endpoints
Authentication<br>

POST -->	/api/register.php	--> User registration <br>
POST -->	/api/login.php	--> User login  <br>
POST -->	/api/logout.php	--> Logout <br>

Products

GET  -->	/api/get_products.php	--> Get all products <br>
GET	 --> /api/get_product.php?id=1	--> Get single product <br>
POST --> /api/add_product.php --> Add product <br>
POST --> /api/update_product.php -->	Update product <br>
GET  -->	/api/delete_product.php?id=1 -->	Delete product <br>

Dashboard

GET	--> /api/dashboard_stats.php	--> Get dashboard statistics


#  Login Credentials
```bash
Email: nawodirishini88@gmail.com
Password: 12345678

```
# Register
<img width="1913" height="915" alt="image" src="https://github.com/user-attachments/assets/93b63f43-1e9e-4688-9faf-7adee7dcb7e4" />

<img width="447" height="811" alt="image" src="https://github.com/user-attachments/assets/210b8818-29aa-442c-857c-9127588dc8d3" />

#  Login
<img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/68f0c027-1e8b-45ce-bfcc-b9c95b92bfca" />

<img width="464" height="846" alt="image" src="https://github.com/user-attachments/assets/27d17037-affc-4954-9547-098ac37a18d4" />

#   Dashboard
<img width="1914" height="906" alt="image" src="https://github.com/user-attachments/assets/5d15f55f-dd47-47c2-84bf-84cb275f2614" />
<img width="1884" height="923" alt="image" src="https://github.com/user-attachments/assets/f53ba25b-1790-4d6a-9767-260d2a603232" />
<img width="375" height="810" alt="image" src="https://github.com/user-attachments/assets/1a4208d8-3e3c-4d34-961e-b78aeb9dfa9b" />

#  Products
<img width="1906" height="926" alt="image" src="https://github.com/user-attachments/assets/dfa72b64-4d39-4048-bdfb-48b60f853e4e" />
<img width="371" height="806" alt="image" src="https://github.com/user-attachments/assets/43f71dc5-2872-42a8-bb73-0ddabcf56343" />

#  Add product
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/c98c1457-c7bb-4338-8c04-1082e55b7ce6" />
<img width="383" height="816" alt="image" src="https://github.com/user-attachments/assets/1e8b5086-31ce-46c5-b331-d55b4322ae47" />

# Profile
<img width="1919" height="804" alt="image" src="https://github.com/user-attachments/assets/e285abd0-f3c3-4eda-920a-56bb64e6de2f" />
<img width="372" height="814" alt="image" src="https://github.com/user-attachments/assets/ca64e9c6-ffe0-4793-9a79-d87402b3e769" />

# Product details view
<img width="1918" height="730" alt="image" src="https://github.com/user-attachments/assets/821fd274-b707-4707-96d1-8f381a621be4" />
<img width="376" height="807" alt="image" src="https://github.com/user-attachments/assets/0f51422d-934a-4f89-aeb0-5bd98a60f469" />



