

export async function findPlayerByName(name) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/players?name=${encodeURIComponent(name)}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                return undefined;
            }

            throw new Error("Failed to load player");
        }

        const player = await response.json();
        return player;

    } catch (error) {
        throw error;
    }
}

export async function createPlayer(name) {
    try {
        const response = await fetch("http://localhost:3000/api/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create player");
        }

        const newPlayer = await response.json();
        return newPlayer;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function updatePlayer(player) {
    try {

        const response = await fetch(
            `http://127.0.0.1:3000/api/players/${player.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lowestTime: player.lowestTime
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update player's lowest time");
        }

        const updatedPlayer = await response.json();

        return updatedPlayer;

    } catch (error) {
        console.log("UPDATE ERROR:", error);
        return error.message;
    }
}


export async function getAllPlayers() {
    try {
        const response = await fetch("http://localhost:3000/api/players");

        if (!response.ok) {
            throw new Error("Failed to load players");
        }

        const players = await response.json();
        return players;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}














