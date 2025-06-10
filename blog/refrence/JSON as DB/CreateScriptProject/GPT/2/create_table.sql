
-- SQL query to create a table
CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

-- SQL query to add a new column to the table
ALTER TABLE Users ADD COLUMN phone_number VARCHAR(20);

-- SQL query to delete the table
DROP TABLE Users;
