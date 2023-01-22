import "../styles/productsTable.css";
import productService from "../services/productService";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const ProductsTable = () => {
	const navigate = useNavigate();
	let [isDisabled, setIsDisabled] = useState(false);
	const { setAuth } = useAuth();

	const [products, setProducts] = useState([]);
	const [productCode, setProductCode] = useState("");
	const [productName, setProductName] = useState("");
	const [productCategory, setProductCategory] = useState("");

	useEffect(() => {
		getAllProducts();
	}, []);

	const getAllProducts = () => {
		productService
			.getAllProducts()
			.then(response => {
				setProducts(response.data.content);
			})
			.catch(error => {
				console.log("Couldnt get all products", error);
			});
	};

	const deleteProduct = id => {
		productService
			.deleteProduct(id)
			.then(response => {
				console.log("product deleted successfully", response.data);
			})
			.catch(error => {
				console.error("couldnt delete product", error);
			});
	};

	const handleSearch = e => {
		e.preventDefault();
		if (isDisabled) {
			productService
				.getProductByProductCode(productCode)
				.then(response => {
					setProducts(response.data.content);
				})
				.catch(error => {
					console.error("couldnt get product by product code", error);
				});
		} else if (productCategory !== "all") {
			productService
				.getProductsByNameAndCategory(productName, productCategory)
				.then(response => {
					setProducts(response.data.content);
				})
				.catch(error => {
					console.error("couldnt get products by name and category", error);
				});
		} else {
			productService
				.getAllProducts()
				.then(response => {
					setProducts(response.data.content);
				})
				.catch(error => {
					console.error("couldnt get products", error);
				});
		}
	};

	const logout = () => {
		setAuth({});
		navigate("/login");
	};

	return (
		<main>
			<div className="search">
				<form action="" className="search-form">
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="product name"
						disabled={isDisabled}
						value={productName}
						onChange={e => {
							setProductName(e.target.value);
						}}
					/>
					<label htmlFor="category-select">Category:</label>
					<select
						name="category-select"
						id="search-category"
						placeholder="Category"
						disabled={isDisabled}
						onChange={e => {
							setProductCategory(e.target.value);
						}}
					>
						<option value="all">All</option>
						<option value="office-supplies">Office Supplies</option>
						<option value="building-supplies">Building Supplies</option>
						<option value="food-items">Food Items</option>
					</select>
					<input
						type="text"
						name="productCode"
						id="productCode"
						placeholder="Product code"
						value={productCode}
						onChange={e => {
							if (e.target.value) {
								setProductCode(e.target.value);
								setIsDisabled(true);
							} else {
								setProductCode("");
								setIsDisabled(false);
							}
						}}
					/>
					<button className="button button-primary" type="submit" onClick={handleSearch}>
						Search
					</button>
					<button
						className="button button-primary"
						onClick={() => {
							navigate("/add");
						}}
					>
						Add new product
					</button>
				</form>

				<div>
					<button className="button button-danger" onClick={logout}>
						Logout
					</button>
				</div>
			</div>
			<div className="products-table">
				<table>
					<thead>
						<tr>
							<th>Image</th>
							<th>Name</th>
							<th>Description</th>
							<th>Buy price</th>
							<th>Sell price</th>
							<th>Quantity</th>
							<th>Category</th>
							<th>Code</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.length !== 0 ? (
							products.map(product => (
								<tr key={product.id}>
									<td>
										<img src={product.image} alt="" width="50px" height="50px" />
									</td>
									<td>{product.productName}</td>
									<td>{product.description}</td>
									<td>{product.buyPrice}</td>
									<td>{product.sellPrice}</td>
									<td>{product.quantity}</td>
									<td>{product.category}</td>
									<td>{product.productCode}</td>
									<td>
										<button
											className="button button-danger"
											type="submit"
											onClick={e => {
												deleteProduct(product.id);
												window.location.reload();
											}}
										>
											Delete
										</button>
										<Link
											className="button button-primary"
											to={`/products/edit/${product.id}`}
										>
											Edit
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td> No product found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</main>
	);
};
