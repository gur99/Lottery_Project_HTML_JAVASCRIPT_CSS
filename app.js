// Constant
let currentAmount = 1000;
const TABLE_COST = 300;
const PRIZES = {
    allSixWithStrong: 1000,
    allSix: 600,
    fourWithStrong: 400,
    none: 0,
};

// Initialze first amount
let balance = document.getElementById("currentBalance");
balance.innerHTML = currentAmount;


// ADD TABLE FUNC----------------------------------------------------------
let tableIndex = 1;
function addTable() {
    if (tableIndex == 5) {
        alert("You cannot add more than 5 tables.");
        return;
    }
    // Increment the table index
    tableIndex++;

    // Create the main table container
    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('class', 'table');

    // Create the first part of the table
    let firstPart = document.createElement('div');
    firstPart.setAttribute('class', 'firstTablePart');

    let haedingDiv = document.createElement('div');
    firstPart.appendChild(haedingDiv);

    let heading = document.createElement('h4');
    heading.innerHTML = `Table <span class="spanNumber">${tableIndex}</span>`;
    haedingDiv.appendChild(heading);

    // Add the first part to the table
    tableDiv.appendChild(firstPart);

    // Create the numbers section
    let numbersDiv = document.createElement('div');
    numbersDiv.setAttribute('class', 'numbers');
    for (let i = 0; i < 6; i++) {
        let inputDiv = document.createElement('div');
        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('maxLength', '2');
        input.setAttribute('placeholder', '_');
        input.setAttribute('title', 'Field ' + (i + 1) + ' of 6, enter number between 1-37 only.');
        input.setAttribute('min', '1');
        input.setAttribute('max', '37');
        inputDiv.appendChild(input);
        numbersDiv.appendChild(inputDiv);
    }
    tableDiv.appendChild(numbersDiv);

    // Create the second part of the table
    let secondPart = document.createElement('div');
    secondPart.setAttribute('class', 'secondTablePart');

    let strongNumberDiv = document.createElement('div');
    secondPart.appendChild(strongNumberDiv);

    let strongHeading = document.createElement('h4');
    strongHeading.textContent = 'Strong Number';
    strongNumberDiv.appendChild(strongHeading);

    // Add the second part to the table
    tableDiv.appendChild(secondPart);

    // Create the strong number section
    let singleNumberDiv = document.createElement('div');
    singleNumberDiv.setAttribute('class', 'singleNumber');
    let inputDiv = document.createElement('div');
    let strongInput = document.createElement('input');

    strongInput.setAttribute('type', 'number');
    strongInput.setAttribute('maxLength', '1');
    strongInput.setAttribute('max', '7');
    strongInput.setAttribute('min', '1');
    strongInput.setAttribute('placeholder', '_');
    strongInput.setAttribute('title', 'Field 1 of 1, enter number between 1-7 only.');
    inputDiv.appendChild(strongInput);
    singleNumberDiv.appendChild(inputDiv);

    // Add the strong number section to the table
    tableDiv.appendChild(singleNumberDiv);

    // Append the new table to the form
    document.getElementById("form").appendChild(tableDiv);
}




// REMOVE TABLE FUNC ----------------------------------------------------------


function removeTable() {
    let form = document.getElementById("form");
    // Get the last table in the form
    let lastTable = form.lastElementChild;

    // Ensure at least one table remains
    if (form.children.length <= 1) {
        alert("At least one table must remain.");
        return;
    }
    // Remove the last table
    form.removeChild(lastTable);

    // Decrement the table index
    tableIndex--;

}

// CLEAR TABLE FUNC ----------------------------------------------------------

function clearAllTables() {
    // Select all tables inside the container (e.g., form)
    let tables = document.querySelectorAll(".table");

    // Iterate through each table
    tables.forEach(function (table) {
        // Find all input elements within the table
        let inputs = table.querySelectorAll("input[type='number']");

        // Clear the value of each input
        inputs.forEach(function (input) {
            input.value = ""; // Set input value to empty
        });
    });
}


// Function to validate the tables ---BOLEAN ----------------------------------------------------------
function validateTables() {
    let tables = document.querySelectorAll(".table");

    for (let table of tables) {
        let numberInputs = table.querySelectorAll(".numbers input");
        let strongNumberInput = table.querySelector(".singleNumber input");

        let numbers = [];
        for (let i = 0; i < numberInputs.length; i++) {
            numbers.push(parseInt(numberInputs[i].value));
        }

        strongNumber = parseInt(strongNumberInput.value);

        // Check for empty fields
        let hasNaN = false;
        for (let i = 0; i < numbers.length; i++) {
            if (isNaN(numbers[i])) {
                hasNaN = true;
                break;
            }
        }
        if (hasNaN || isNaN(strongNumber)) {
            alert("All fields must be filled in.");
            return false;
        }



        // Check for valid ranges
        let isInvalid = false;
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] < 1 || numbers[i] > 37) {
                isInvalid = true;
                break;
            }
        }

        if (isInvalid || strongNumber < 1 || strongNumber > 7) {
            alert("Numbers must be within the valid range: 1-37 for numbers, 1-7 for the strong number.");
            return false;
        }

        // Check for duplicates in numbers
        let hasDuplicates = false;
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] === numbers[j]) {
                    hasDuplicates = true;
                    break;
                }
            }
            if (hasDuplicates) {
                break;
            }
        }

        if (hasDuplicates) {
            alert("Numbers in each table must not repeat.");
            return false;
        }
    }
    return true;
}


// Function to calculate winnings based on results ----------------------------------------------------------
function calculatePrize(userNumbers, userStrong, results) {
    let selectedNumbers = results.selectedNumbers;
    let strongNumber = results.strongNumber;

    let matchingNumbers = 0;
    for (let i = 0; i < userNumbers.length; i++) {
        for (let j = 0; j < selectedNumbers.length; j++) {
            if (userNumbers[i] === selectedNumbers[j]) {
                matchingNumbers++;
                break;
            }
        }
    }

    const strongMatch = userStrong === strongNumber;

    if (matchingNumbers === 6 && strongMatch) {
        return PRIZES.allSixWithStrong;
    } else if (matchingNumbers === 6) {
        return PRIZES.allSix;
    } else if (matchingNumbers === 4 && strongMatch) {
        return PRIZES.fourWithStrong;
    } else {
        return PRIZES.none;
    }
}


// Function to update the balance ----------------------------------------------------------
function updateBalance(results) {
    let tables = document.querySelectorAll(".table");
    let cost = tables.length * TABLE_COST;

    if (currentAmount < cost) {
        alert("Insufficient balance to play the lottery.");
        return false;
    }

    let totalWinnings = 0;
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const numberInputs = table.querySelectorAll(".numbers input");
        const strongNumberInput = table.querySelector(".singleNumber input");

        let userNumbers = [];
        for (let j = 0; j < numberInputs.length; j++) {
            userNumbers.push(parseInt(numberInputs[j].value));
        }

        const userStrong = parseInt(strongNumberInput.value);

        totalWinnings += calculatePrize(userNumbers, userStrong, results);
    }

    currentAmount -= cost;
    currentAmount += totalWinnings;
    balance.innerHTML = currentAmount;

    if (totalWinnings > 0) {
        alert("Congratulations! You won " + totalWinnings + " shekels.");
    } else {
        alert("No winnings this time. Better luck next time!");
    }

    return true;
}

// Function to generate lottery results ----------------------------------------------------------
function generateLotteryResults() {
    let selectedNumbers = [];
    while (selectedNumbers.length < 6) {
        let randNum = Math.floor(Math.random() * 37) + 1;
        let isDuplicate = false;

        for (let i = 0; i < selectedNumbers.length; i++) {
            if (selectedNumbers[i] === randNum) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            selectedNumbers.push(randNum);
        }
    }

    let strongNumber = Math.floor(Math.random() * 7) + 1;

    //    Checking winning situations
    selectedNumbers = [1, 2, 3, 4, 5, 6]
    strongNumber = 2;


    return { selectedNumbers, strongNumber };
}

// Display lottery results in a dialog ----------------------------------------------------------
function displayResults(results) {
    let numbers = results.selectedNumbers;
    let numbersString = "";
    for (let i = 0; i < numbers.length; i++) {
        numbersString += numbers[i];
        if (i < numbers.length - 1) {
            numbersString += ", ";
        }
    }
    let tableIndex = 1;
    let tables = document.querySelectorAll(".table");
    let myTables = "Your tables:\n";
    for (let table of tables) {
        let numberInputs = table.querySelectorAll(".numbers input");
        let strongNumberInput = table.querySelector(".singleNumber input");
        myTables += "Table " + tableIndex + "\nNumbers:";
        tableIndex++;
        let numbers = [];
        for (let i = 0; i < numberInputs.length; i++) {
            numbers.push(parseInt(numberInputs[i].value));
        }
        strongNumber = parseInt(strongNumberInput.value);
        myTables += numbers + "\nStrong number:\n" + strongNumber + "\n";
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
    alert("Lottery Results:\nNumbers: " + numbersString + "\nStrong Number: " + results.strongNumber + "\n\n" + myTables);
}

// DONE PLAYING function ------------------------------------------------------------------------- 

function donePlaying() {
    let tables = document.querySelectorAll(".table");

    // Iterate through each table
    tables.forEach(function (table) {
        // Find all input elements within the table
        let inputs = table.querySelectorAll("input[type='number']");

        inputs.forEach(function (input) {
            input.value = "";
            input.disabled = true;
        });
    });

    let actionButtons = document.getElementById('ActionButtons');
    let buttons = actionButtons.querySelectorAll("input[type='button']")
    buttons.forEach(function (button) {
        button.disabled = true;
        button.className = 'disabledButton';
    });

    alert("Your final amount: " + currentAmount + "\nWe hope to see you soon!");
}







// Start lottery button handler ----------------------------------------------------------

function startButton() {
    if (!validateTables()) return;
    if (currentAmount < TABLE_COST) {
        // alert("You have run out of money. Please reload to continue playing.");

        let dialog = document.getElementById('myDialog');
        dialog.showModal();
        setTimeout(() => {
            dialog.close();
        }, 5000); // 3000 milliseconds = 3 seconds
        donePlaying();
        return;
    }

    let results = generateLotteryResults();
    displayResults(results);

    // debugger
    if (!updateBalance(results)) return;
    clearAllTables();
};

// Dialogs for NAVIGATOR: 
// ABOUT  DIALOG 

document.getElementById("aboutButton").addEventListener("click", function () {
    let dialog = document.getElementById("aboutDialog");
    dialog.showModal(); // Show the dialog
});

document.getElementById("closeDialog").addEventListener("click", function () {
    let dialog = document.getElementById("aboutDialog");
    dialog.close(); // Close the dialog
});


// STATISTICS DIALOG
document.getElementById("statisicsButton").addEventListener("click", function () {
    let dialog = document.getElementById("StatisticsDialog");
    dialog.showModal(); // Show the dialog
});

document.getElementById("closeSDialog").addEventListener("click", function () {
    let dialog = document.getElementById("StatisticsDialog");
    dialog.close(); // Close the dialog
});

// WINNERS DIALOG

document.getElementById("winnersButton").addEventListener("click", function () {
    let dialog = document.getElementById("winnersDialog");
    dialog.showModal(); // Show the dialog
});

document.getElementById("closeWDialog").addEventListener("click", function () {
    let dialog = document.getElementById("winnersDialog");
    dialog.close(); // Close the dialog
});

// TERMS OF USE DIALOG

document.getElementById("temsOfUseButton").addEventListener("click", function () {
    let dialog = document.getElementById("TermsOfUseDialog");
    dialog.showModal(); // Show the dialog
});

document.getElementById("closeTermsOfUseDialog").addEventListener("click", function () {
    let dialog = document.getElementById("TermsOfUseDialog");
    dialog.close(); // Close the dialog
});



// Rules expand and minimize

function showRules() {
    let rulesContent = document.getElementById("rulesContent");
    let rulesButton = document.getElementById("rulesButton");

    if (rulesContent.style.display == "none") {
        rulesContent.style.display = "block";
        rulesButton.textContent = "Minimize";
    } else {
        rulesContent.style.display = "none";
        rulesButton.textContent = "Show More";
    }
}