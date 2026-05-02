let isInitialized = false;

export const initGoogleAuth = (callback) => {
    if (isInitialized) return;

    google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback,
    });

    isInitialized = true;
};