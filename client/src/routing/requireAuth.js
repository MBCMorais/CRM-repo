import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();

	// ! Verificar para depois dar acesso a diferentes roles(admin/user/dev)
	// return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
	// 	<Outlet />
	// ) : auth?.user ? (
	// 	<Navigate to="unauthorized" state={{ from: location }} replace />
	// ) : (
	// 	<Navigate to="/login" state={{ from: location }} replace />
	// );

	return auth?.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
