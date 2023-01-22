import api from "./api";

const registerUser = user => {
	return api.post("/auth/signup", user);
};

const loginUser = user => {
	return api.post("/auth/signin", user);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	registerUser,
	loginUser
};
