import "./App.css";
import { Stock } from "./pages/Stock";
import { AddProduct } from "./pages/AddProduct";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
	User: "ROLE_USER",
	Admin: "ROLE_ADMIN"
};

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route path="register" element={<Register />} />
				<Route path="login" element={<Login />} />

				{/* protected routes */}
				<Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
					<Route path="/" element={<Stock />} />
					<Route path="add" element={<AddProduct />} />
					<Route path="products/edit/:id" element={<AddProduct />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
