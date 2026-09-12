function fetchUserId(callback: (error: Error | null, userId?: string) => void) {
    console.log("Fetching user ID...");
    setTimeout(() => {
        const userId = "user";
        callback(null, userId);
    }, 2000);
}



function fetchUserData(userId: string, callback: (error: Error | null, userData?: { name: string; email: string }) => void) {
    console.log(`Fetching data for user ID: ${userId}`);
    setTimeout(() => {
        const userData = { name: "John Doe", email: "Shape@njbh.com" };
        callback(null, userData);
    }, 3000);
}

function savedUserLog(userName: string, userEmail: string, callback: (error: Error | null, logStatus?: string) => void) {
    console.log(`Saving log for $(userName") with $(userEmail)`);
    setTimeout(() => {
        const status = "succesfully"
        callback(null, status)
    }, 3000)
}

fetchUserId((error, userId) => {
    if (error) {
        console.error(`Error in fetching user id`, error.message);
        return;
    }
    if (userId) {
        fetchUserData(userId, (error, userData) => {
            if (error) {
                console.error("Error in fetching user details", error.message);
                return;
            }
            if (userData) {
                savedUserLog(userData.email, userData.name, (error, logStatus) => {
                    if (error) {
                        console.error("Error is user details", error.message);
                        return;
                    }
                    if (logStatus) {
                        console.log("All operations completed ")
                        console.log("Final status", logStatus);
                    }
                })

            }

        })
    }
})



function promiseFetchUserId(): Promise<string> {
    console.log("fetching user id")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userId = "user123";
            resolve(userId);
        }, 1000)
    })
}

function promiseFetchUserDetails(userId: string): Promise<{ name: string; email: string }> {
    console.log(`fetching details for userId: ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const details = { name: "mine", email: "promise@gmail.com" }
            resolve(details)
        }, 2000)
    })
}

function promiseSaveUserLog(userName: string, userEmail: string): Promise<string> {
    console.log(`Saving user log for ${userName} ,email: ${userEmail}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const status = "Log Saved succesfully"
            resolve(status)
        }, 2000)
    })
}

promiseFetchUserId().then((userId) => {
    return promiseFetchUserDetails(userId)
}).then((details) => {
    return promiseSaveUserLog(details.name, details.email)
}).then((logStatus) => {
    console.log("all operations completed successfully")
    console.log("final status:", logStatus)
}).catch((error) => {
    console.error("An error occured in the promise chain:", error.message)
})


async function processUserData(): Promise<void> {
    try {
        console.log("starting async process");
        const userId = await promiseFetchUserId()
        const details = await promiseFetchUserDetails(userId)
        const logStatus = await promiseSaveUserLog(details.name, details.email);
        console.log("all operations completed successfully")
        console.log("final status:", logStatus)
    } catch (error: any) {
        console.error("an error occured in this process:", error.message);

    }
}
processUserData();


