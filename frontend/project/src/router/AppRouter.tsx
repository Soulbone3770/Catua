import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../features/auth";
import { ProtectedRoute } from "../features/auth";

import RegisterUserPage from "../pages/RegisterUserPage";
import LoginUserPage from "../pages/LoginUserPage";
import Index from "../pages/Index";
import HacerPublicacion from "../pages/HacerPublicacion";
import MisPublicacionesPage from "../pages/MisPublicacionesPage";

//Sesion lista
const AppRouter = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<RegisterUserPage />} />
                <Route path="/login" element={<LoginUserPage />} />
                <Route path="/hacerPublicacion" element={
                    <ProtectedRoute>
                        <HacerPublicacion />
                    </ProtectedRoute>
                }/>
                <Route path="/misPublicaciones" element={
                    <ProtectedRoute>
                        <MisPublicacionesPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default AppRouter;