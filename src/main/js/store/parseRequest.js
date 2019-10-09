export default ({ status, response }) => {
    if (status >= 200 && status <= 210) {
        return response;
    }
    throw response;
};
