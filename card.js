function generateCells() {
    const columns = 30; // Columns 1-30
    const rows = "ABCDEFGHIJKLMNOP".split(""); // Rows A-P
    const result = [];

    // Helper function to calculate distance between two cells
    function distance(cell1, cell2) {
        const col1 = parseInt(cell1.match(/\d+/)[0], 10);
        const row1 = cell1.match(/[A-P]/)[0];
        const col2 = parseInt(cell2.match(/\d+/)[0], 10);
        const row2 = cell2.match(/[A-P]/)[0];

        const colDiff = Math.abs(col1 - col2);
        const rowDiff = Math.abs(rows.indexOf(row1) - rows.indexOf(row2));
        return Math.max(colDiff, rowDiff);
    }

    while (result.length < 4) {
        const randomCol = Math.floor(Math.random() * columns) + 1; // Random column between 1 and 30
        const randomRow = rows[Math.floor(Math.random() * rows.length)]; // Random row between A and P
        const newCell = `${randomCol}${randomRow}`;

        // Check if the new cell is at least 5 cells away from all others
        if (result.every(cell => distance(cell, newCell) >= 5)) {
            result.push(newCell);
        }
    }

    return result;
}

function createCards(cells, colors) {
    // Reference the "cards" container
    const cardsContainer = document.getElementById("cards");

    // Loop through the array of cell identifiers
    cells.forEach(cell => {
        // Extract column and row from the cell (e.g., "10F" -> column=10, row="F")
        const column = parseInt(cell.match(/\d+/)[0], 10); // Extract numeric column index
        const row = cell.match(/[A-P]/)[0]; // Extract letter row index

        // Create the card div
        const card = document.createElement("div");
        card.className = "card";

        // Create the swatch div
        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.backgroundColor = getCellColor(column, row, colors); // Set background color
        card.appendChild(swatch);

        const swatchLabel = document.createElement("div");
        swatchLabel.className = "swatch-label";
        swatchLabel.textContent = cell; // Set background color
        card.appendChild(swatchLabel);

        // Add the card to the cards container
        cardsContainer.appendChild(card);
    });
}


const cellReferences = generateCells();
createCards(cellReferences);
