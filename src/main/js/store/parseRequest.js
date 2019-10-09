export default ({ response }) => {
    console.log(response);
    if (response && response.err === 0 && typeof response.data !== 'undefined') {
        return response.data;
    }
    throw response.msg;
};
