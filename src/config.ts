const key = import.meta.env.VITE_LOCAL_STORAGE_KEY || "";
const backendURL = import.meta.env.VITE_LOCAL_STORAGE_BACKEND_URL || "";

export const env = {
	key,
	backendURL,
};
