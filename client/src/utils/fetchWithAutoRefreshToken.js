async function refreshAccessToken() {
    try {
        const refreshPromise = await fetch("http://localhost:5000/api/refresh", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!refreshPromise.ok) throw new Error("Refresh failed");
        const refreshResult = await refreshPromise.json();

        return refreshResult;
    } catch (err) { throw new Error(err.message) }
    finally { console.log("Refresh finally") };
}

export async function fetchWithRetry(input, init = {}, oldData, setUser) {
    const { accessToken } = oldData;

    try {
        let response = await fetch(input, {
            ...init,
            headers: {
                ...(init.headers || {}),
                "authorization": `Bearer ${accessToken}`,
            }
        });

        if (response.status !== 401) return response; // WARN: changed backend res code to 401, had to be reflected here

        // Token lejárt, próbáljuk frissíteni
        const newTokens = await refreshAccessToken();

        // TODO: talán ellenőrizni newTokens-t?
        setUser({ ...oldData, accessToken: newTokens.accessToken });

        return await fetch(input, {
            ...init,
            headers: {
                ...(init.headers || {}),
                "authorization": `Bearer ${newTokens.accessToken}`,
            },
        });
    } catch (err) { throw err };
}


/* invocation */
/*
fetchWithRetry("/api/protected-data")
    .then(res => res.json())
    .then(data => console.log("Adat:", data))
    .catch(err => console.error("Hiba:", err));
*/