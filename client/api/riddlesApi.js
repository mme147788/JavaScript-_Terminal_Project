
export async function getAllRiddles() {
    try {
        const response = await fetch("http://localhost:3000/api/riddles");

        if (!response.ok) {
            throw new Error("Riddles not found");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function createRiddle(riddle) {
    try {
        const response = await fetch("http://localhost:3000/api/riddles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riddle)
        });

        if (!response.ok) {
            throw new Error("Failed to create riddle");
        }

        const addRiddle = await response.json();
        return addRiddle;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function updateRiddle(id, riddle) {
    try {
        const response = await fetch(`http://localhost:3000/api/riddles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riddle)
        });

        if (!response.ok) {
            throw new Error("Failed to update riddle");
        }

        const updatedRiddle = await response.json();
        return updatedRiddle;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function deleteRiddle(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/riddles/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete riddle");
        }

        const deletedRiddle = await response.json();
        return deletedRiddle;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}













