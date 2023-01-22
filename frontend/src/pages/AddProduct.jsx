import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../services/productService";
import "../styles/addProduct.css";

export const AddProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [productName, setProductName] = useState("");
	const [description, setDescription] = useState("");
	const [buyPrice, setBuyPrice] = useState("");
	const [sellPrice, setSellPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [category, setCategory] = useState("office-supplies");
	const [productCode, setProductCode] = useState("");
	const [image, setImage] = useState("");

	const addProduct = e => {
		e.preventDefault();

		const product = {
			productName,
			description,
			buyPrice,
			sellPrice,
			quantity,
			category,
			productCode,
			image,
			id
		};

		if (id) {
			productService
				.updateProduct(product)
				.then(response => {
					navigate("/");
				})
				.catch(error => {
					console.error("couldnt update product", error);
				});
		} else {
			productService
				.createProduct(product)
				.then(response => {
					navigate("/");
				})
				.catch(error => {
					console.error("couldnt create product", error);
				});
		}
	};

	useEffect(() => {
		if (id) {
			productService
				.getProductById(id)
				.then(product => {
					setProductName(product.data.productName);
					setDescription(product.data.description);
					setBuyPrice(product.data.buyPrice);
					setSellPrice(product.data.sellPrice);
					setQuantity(product.data.quantity);
					setCategory(product.data.category);
					setProductCode(product.data.productCode);
					setImage(product.data.image);
				})
				.catch(error => {
					console.error("couldnt get product by id", error);
				});
		}
	}, [id]);

	const convertFileToBase64 = e => {
		const file = e.target.files[0];
		const fileReader = new FileReader();

		fileReader.onloadend = () => {
			setImage(fileReader.result.toString());
		};

		fileReader.readAsDataURL(file);
	};

	return (
		<div className="add-container">
			<section className="add-section">
				<form action="" className="add-product-form" onSubmit={addProduct}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						required
						maxLength={50}
						value={productName}
						onChange={e => {
							setProductName(e.target.value);
						}}
					/>

					<label htmlFor="description">Description</label>
					<input
						type="text"
						id="description"
						required
						minLength={1}
						maxLength={2000}
						value={description}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>

					<label htmlFor="buyPrice">Buy price</label>
					<input
						type="number"
						id="buyPrice"
						required
						min={0}
						step="0.01"
						value={buyPrice}
						onChange={e => {
							setBuyPrice(e.target.value);
						}}
					/>

					<label htmlFor="sellPrice">Sell price</label>
					<input
						type="number"
						id="sellPrice"
						required
						min={0}
						step="0.01"
						value={sellPrice}
						onChange={e => {
							setSellPrice(e.target.value);
						}}
					/>

					<label htmlFor="quantity">Quantity</label>
					<input
						type="number"
						id="quantity"
						min={0}
						value={quantity}
						onChange={e => {
							setQuantity(e.target.value);
						}}
					/>

					<label htmlFor="category">Category</label>
					<select
						name="category"
						id="category"
						required
						onChange={e => {
							setCategory(e.target.value);
						}}
						value={category}
					>
						<option value="office-supplies">Office Supplies</option>
						<option value="building-supplies">Building Supplies</option>
						<option value="food-items">Food Items</option>
					</select>

					<label htmlFor="productCode">Product code</label>
					<input
						type="text"
						id="productCode"
						required
						value={productCode}
						onChange={e => {
							setProductCode(e.target.value);
						}}
					/>

					<label htmlFor="image">Select an image</label>
					<input
						type="file"
						id="image"
						onChange={e => {
							convertFileToBase64(e);
						}}
					/>

					<button type="submit" className="add-button">
						{id ? "Update product" : "Add product"}
					</button>
					<Link className="link" to={"/"}>
						Back to list of products
					</Link>
				</form>
			</section>
		</div>
	);
};
