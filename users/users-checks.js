module.exports = {
	checkInput,
};

function checkInput(user) {
	return Boolean(user.name && user.password && user.email);
}
