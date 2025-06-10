const fs = require('fs');
const path = require('path');

// 1. Function to create a script (create a new file with content)
function createScript(fileName, content) {
    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error("Error creating script:", err);
        } else {
            console.log(`Script "${fileName}" created successfully!`);
        }
    });
}

// 2. Function to edit a script (overwrite or append content)
function editScript(fileName, newContent, append = false) {
    const flag = append ? 'a' : 'w';  // 'a' for append, 'w' for overwrite
    
    fs.open(fileName, flag, (err, fd) => {
        if (err) {
            console.error("Error opening file:", err);
            return;
        }

        fs.write(fd, newContent, (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log(`Script "${fileName}" edited successfully!`);
            }

            fs.close(fd, (err) => {
                if (err) {
                    console.error("Error closing file:", err);
                }
            });
        });
    });
}

// 3. Function to delete a script (delete the file)
function deleteScript(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error("Error deleting script:", err);
        } else {
            console.log(`Script "${fileName}" deleted successfully!`);
        }
    });
}

// Example usage:
const fileName = 'example_script.js';
const content = "// This is an auto-generated script\nconsole.log('Hello, World!');\n";

// Create a script
createScript(fileName, content);

// Edit the script by appending new content
const newContent = "\nconsole.log('This is an edited script!');";
editScript(fileName, newContent, true);

// Delete the script
// deleteScript(fileName);
