import { Login } from "../pages/common";
import { useAuth } from "../context/AuthContext";

export function AdminLayout({ children }) {
  const { auth } = useAuth();
  if (!auth) return <Login />;
  return <div>{children}</div>;
}