const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const authToken = localStorage.getItem("authToken");

const userId = currentUser?.id;

export { authToken, currentUser, userId }