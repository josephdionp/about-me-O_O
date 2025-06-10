const fs = require('fs');
const path = require('path');

// 1. Create a file with SQL content or HTML content
function createFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Error creating file:", err);
        } else {
            console.log(`File "${filePath}" created successfully!`);
        }
    });
}

// 2. Edit a file (overwrite or append)
function editFile(filePath, newContent, append = false) {
    const flag = append ? 'a' : 'w';  // 'a' for append, 'w' for overwrite
    
    fs.open(filePath, flag, (err, fd) => {
        if (err) {
            console.error("Error opening file:", err);
            return;
        }

        fs.write(fd, newContent, (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log(`File "${filePath}" edited successfully!`);
            }

            fs.close(fd, (err) => {
                if (err) {
                    console.error("Error closing file:", err);
                }
            });
        });
    });
}

// 3. Delete the file
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
            console.log(`File "${filePath}" deleted successfully!`);
        }
    });
}

// Example SQL content to create, edit, and delete a table
const sqlCreateTable = `
-- SQL query to create a table
CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

-- SQL query to add a new column to the table
ALTER TABLE Users ADD COLUMN phone_number VARCHAR(20);
`;

const sqlDeleteTable = `
-- SQL query to delete the table
DROP TABLE Users;
`;

// Example HTML content for creating a box
const htmlBox = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Box Example</title>
    <style>
        .box {
            width: 300px;
            height: 200px;
            border: 2px solid black;
            padding: 10px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>This is a box!</h2>
        <p>Content inside the box.</p>
    </div>
</body>
</html>
`;

// Example usage
const sqlFilePath = path.join(__dirname, 'create_table.sql');
const htmlFilePath = path.join(__dirname, 'box.html');

// Create SQL file
createFile(sqlFilePath, sqlCreateTable);

// Create HTML file
createFile(htmlFilePath, htmlBox);

// Edit the SQL file (appending SQL delete table)
editFile(sqlFilePath, sqlDeleteTable, true);

// Optionally, delete the SQL file
// deleteFile(sqlFilePath);
