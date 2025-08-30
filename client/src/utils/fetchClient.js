// fetchClient.js

const fetchClient = (() => {
    const requestInterceptors = [];
    const responseInterceptors = [];

    return {
        addRequestInterceptor(interceptor) {
            requestInterceptors.push(interceptor);
        },

        addResponseInterceptor(interceptor) {
            responseInterceptors.push(interceptor);
        },

        async fetch(input, init = {}) {
            // Request interceptors
            for (const interceptor of requestInterceptors) {
                [input, init] = await interceptor(input, init);
            }

            let response = await fetch(input, init);

            // Response interceptors
            for (const interceptor of responseInterceptors) {
                response = await interceptor(response);
            }

            return response;
        }
    };
})();

// auth token hozzáadása
fetchClient.addRequestInterceptor(async (input, init) => {
    const token = localStorage.getItem("token");
    return [
        input,
        {
            ...init,
            headers: {
                ...init.headers,
                Authorization: `Bearer ${token}`,
            },
        },
    ];
});

// hiba kezelés
fetchClient.addResponseInterceptor(async (response) => {
    if (!response.ok) {
        const error = await response.json();
        console.error("Hiba történt:", error.message);
        // opcionálisan dobhatod is
        throw new Error(error.message);
    }
    return response;
});

// lekérés
fetchClient.fetch("/api/data")
    .then(res => res.json())
    .then(data => console.log("Adat:", data))
    .catch(err => console.error("Hiba:", err));
