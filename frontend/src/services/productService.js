import api from "./api";

const getAllProducts = () => {
	// return api.get(`/products?pageNo=${pageNo}&pageSize=${pageSize}`);
	return api.get(`/products`);
};

const getProductById = id => {
	return api.get(`/products/${id}`);
};

const createProduct = product => {
	return api.post("/products", product);
};

const updateProduct = product => {
	return api.put(`/products/${product.id}`, product);
};

const deleteProduct = id => {
	return api.delete(`/products/${id}`);
};

const getProductByProductCode = productCode => {
	return api.get(`/products/productCode/${productCode}`);
};

const getProductsByNameAndCategory = (name, category) => {
	return api.get(`/products/category?name=${name}&category=${category}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductByProductCode,
	getProductsByNameAndCategory
};
