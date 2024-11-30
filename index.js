const cellsFilled = [];

function getUniquePrefix(name, names) {
    // Find the first initial of the given name
    const firstInitial = name[0].toLowerCase();

    // Check if the first initial is unique in the list
    const sameInitialNames = names.filter(n => n[0].toLowerCase() === firstInitial);

    if (sameInitialNames.length === 1) {
        // If only one name with this initial, return the initial
        return firstInitial;
    } else {
        // Find the shortest distinguishing prefix
        let prefixLength = 1;
        while (true) {
            // Extract the prefix from the given name
            const prefix = name.slice(0, prefixLength).toLowerCase();

            // Check how many names start with this prefix
            const matchingNames = names.filter(n => n.toLowerCase().startsWith(prefix));

            if (matchingNames.length === 1) {
                // If only one name matches this prefix, it's the unique prefix
                return prefix;
            }

            // Otherwise, increase the prefix length and check again
            prefixLength++;
        }
    }
}

function undo() {
    const lastCellFilled = cellsFilled.pop();
    lastCellFilled.classList.remove('color-selected');
    lastCellFilled.textContent = '';

    const textarea = document.getElementById("players");
    const players = textarea.value.split("\n").filter(name => name.trim() !== "");
    const lastPlayer = players.pop();
    let allPlayers = [
        lastPlayer,
        ...players
    ];
    textarea.value = allPlayers.join("\n");

    const nextPlayerElement = document.getElementById('next-player');
    nextPlayerElement.textContent = getUniquePrefix(lastPlayer, allPlayers);
}

function createGrid() {
    const grid = document.getElementById("grid");
    const rows = "ABCDEFGHIJKLMNOP".split(""); // Rows A to P
    const columns = 30; // Columns 1 to 30

    // Add the top-left empty corner
    const corner = document.createElement("div");
    corner.className = "cell-label";
    grid.appendChild(corner);

    // Add column headers (1 to 30)
    for (let column = 1; column <= columns; column++) {
        const header = document.createElement("div");
        header.className = "cell-label";
        header.textContent = column;
        grid.appendChild(header);
    }

    // Add rows with row headers and colored cells
    rows.forEach(row => {
        // Add row label
        const rowLabel = document.createElement("div");
        rowLabel.className = "cell-label";
        rowLabel.textContent = row;
        grid.appendChild(rowLabel);

        // Add cells for the row
        for (let column = 1; column <= columns; column++) {
            const cell = document.createElement("div");
            cell.className = "cell-color";
            cell.style.backgroundColor = getCellColor(column, row);
            grid.appendChild(cell);

            cell.addEventListener("click", () => {
                if (cell.classList.contains('color-selected')) {
                    return;
                }

                const textarea = document.getElementById("players");
                const players = textarea.value.split("\n").filter(name => name.trim() !== "");
                if (players.length > 0) {
                    const playerName = players.shift(); // Get the next player
                    const allPlayerNames = [...players, playerName];
                    textarea.value = allPlayerNames.join("\n"); // Update the textarea

                    // Add the "color-selected" class and display the player's name
                    cell.classList.add("color-selected");
                    cell.textContent = getUniquePrefix(playerName, allPlayerNames);

                    cellsFilled.push(cell);

                    const nextPlayerElement = document.getElementById('next-player');
                    nextPlayerElement.textContent = getUniquePrefix(allPlayerNames[0], allPlayerNames);
                }
            });
        }
    });

    const buttonContinue = document.getElementById("continue");
    buttonContinue.addEventListener('click', () => {
        const textarea = document.getElementById("players");
        const players = textarea.value.split("\n").filter(name => name.trim() !== "");
        if (players.length > 0) {
            startGame();
        }
    });

    document.getElementById("undo").addEventListener('click', () => {
        undo();
    });

    document.getElementById("clear").addEventListener('click', () => {
        const numCellsToUnfill = cellsFilled.length;
        for (let i = 0; i < numCellsToUnfill; i++) {
            undo();
        }
    });
}

function startGame() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('game-started');

    const textarea = document.getElementById("players");
    const players = textarea.value.split("\n").filter(name => name.trim() !== "");
    const nextPlayerElement = document.getElementById('next-player');
    nextPlayerElement.textContent = getUniquePrefix(players[0], players);
}

// Initialize the grid
createGrid();

