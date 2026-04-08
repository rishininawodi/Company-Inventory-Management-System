# Company Inventory Management System

A full-stack CRUD web application built using:

- Backend: PHP (OOP + REST API)
- Frontend: HTML, CSS, JavaScript (Bootstrap)
- Database: MySQL

---

#  Features

- User Authentication (Login/Register)
- User Logout
- Role-based system (Admin/User)
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
Normal User
```bash
Email: nawodirishini88@gmail.com
Password: 12345678

```
Admin User 
```bash
Email: Admin@gmail.com
Password: Admin123

```
