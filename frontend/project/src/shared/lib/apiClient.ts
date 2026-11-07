import { ApiError } from "./ApiError";

const API_URL = import.meta.env.VITE_API_URL;

interface ErrorBody{
    code?: string;
    error?: string;
}

const request = async <T>(path: string, init: Omit<RequestInit, "headers"> = {}): Promise<T> => {

    let res: Response;
    const esFormData = init.body instanceof FormData;

    try {
        res = await fetch(`${API_URL}${path}`, {
            credentials: "include",
            headers: esFormData ? undefined : { "Content-Type": "application/json" },
            signal: AbortSignal.timeout(30_000),
            ...init
        });
    } catch(err) {

        if(err instanceof DOMException && err.name === "TimeoutError"){
            throw new ApiError(0, "TIMEOUT", "El servidor tardó demasiado en responder");
        }
        throw new ApiError(0, "NETWORK", "No se pudo conectar con el servidor, revisa tu conexión");
    }

    const readJson = async(res: Response) => {
        try {
            return await res.json();
        } catch {
            return null
        }
    }

    const body = await readJson(res)

    if(!res.ok){
        const errBody = body as ErrorBody | null
        throw new ApiError(res.status, errBody?.code ?? "BAD_RESPONSE", errBody?.error ?? "El servidor respondio con un error inesperado");
    }

    if(body === null){
        throw new ApiError(res.status, "BAD_RESPONSE", "Respuesta inválida del servidor");
    }

    return body as T;

}

export const apiClient = {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
        request<T>(path, {method: "POST", body: JSON.stringify(body)}),
    put: <T>(path: string, body: unknown) =>
        request<T>(path, {method: "PUT", body: JSON.stringify(body)}),
    delete: <T>(path: string) => request<T>(path, {method: "DELETE"}),
    postForm: <T>(path: string, form: FormData) => 
        request<T>(path, { method: "POST", body: form })
};