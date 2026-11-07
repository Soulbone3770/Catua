
export type ErrorCodeType = "NOT_FOUND" | "CONFLICT" | "VALIDATION" | "UNAUTHENTICATED" | "FORBIDDEN"

export class AppError extends Error{
    readonly code: ErrorCodeType;

    constructor(code: ErrorCodeType, message: string){
        super(message);

        this.code = code;
        this.name = new.target.name;
    }

}

export class NotFoundError extends AppError{
    constructor(message = "Recurso no encontrado"){
        super("NOT_FOUND", message);
    }
}

export class ConflictError extends AppError{
    constructor(message = "Recurso ya existente"){
        super("CONFLICT", message);
    }
}

export class ValidationError extends AppError{
    constructor(message = "Error en la validación"){
        super("VALIDATION", message);
    }
}

export class UnauthenticatedError extends AppError{
    constructor(message = "Error de autenticación"){
        super("UNAUTHENTICATED", message);
    }
}

export class ForbiddenError extends AppError{
    constructor(message = "Acción prohibida"){
        super("FORBIDDEN", message);
    }
}