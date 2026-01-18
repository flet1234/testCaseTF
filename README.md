🛠️ Material Inventory System
A full-stack application for managing company assets (materials) and tracking their assignments to people or locations.

🚀 Features
Inventory Management: Track Laptops, Screens, Furniture, and more.
Entity Tracking: Manage both Employees (People) and Offices (Locations).
Assignment History: Real-time tracking of who has what, including start and end dates.
Type-Safe Architecture: Built with Vue 3 (Pinia), Node.js (Knex), and PostgreSQL.

🏗️ Database Setup
You will need a local PostgreSQL instance. Use the following queries to initialize your schema and seed data:

1. Create Tables

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Laptop', 'Screen', 'Phone', 'Furniture', 'Other')),
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    purchase_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Available', 'Assigned', 'Under maintenance')),
    notes TEXT
);

CREATE TABLE entities (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Person', 'Location')),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    email VARCHAR(255) UNIQUE, 
    job_title VARCHAR(100),
    address TEXT
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    material_id INT NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    entity_id INT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    CONSTRAINT check_dates CHECK (end_date IS NULL OR end_date > start_date)
);

2. Seed Data

INSERT INTO materials (name, category, serial_number, purchase_date, status, notes)
VALUES 
('MacBook Pro M14', 'Laptop', 'SN-MBP-2024-001', '2024-02-10', 'Available', 'New unit for dev team'),
('Dell UltraSharp 27', 'Screen', 'SN-DELL-998877', '2023-11-05', 'Assigned', 'Desk 42'),
('iPhone 15 Pro', 'Phone', 'SN-IPH-554433', '2024-01-20', 'Available', 'Executive backup'),
('Ergonomic Chair', 'Furniture', 'SN-FUR-112233', '2023-06-15', 'Available', 'Warehouse B'),
('Logitech MX Master 3S', 'Other', 'SN-LOGI-776655', '2024-03-01', 'Under maintenance', 'Left click issue');

INSERT INTO entities (type, name, email, job_title) 
VALUES 
('Person', 'Sarah Connor', 'sarah@example.com', 'IT Manager'),
('Person', 'Daniel Pitchberg', 'daniel@example.com', 'Designer');

INSERT INTO entities (type, name, address, description) 
VALUES 
('Location', 'Main Warehouse', '123 Industry Rd, Sector 7', 'Primary storage facility'),
('Location', 'Kinder Garden', '321 Lazy Rd, Sector 1', 'To my moma');

⚙️ Environment Variables
Check the .env.example files in both the /frontend and /backend directories.

In both backend and frontend do 
npm install
npm run dev

note:If you don have proper env for db, server will throw error.

🛠️ Tech Stack
Frontend: Vue 3, Vite, Tailwind CSS (v4), Pinia.
Backend: Node.js, Express, Knex.js.
Database: PostgreSQL.