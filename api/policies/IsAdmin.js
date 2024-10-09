module.exports = (req, res, next) => {

    if (req.sessionData && (req.sessionData.role === 0)) {
        next();
    } else {
        return ResponseService.json(res, ConstantService.responseCode.FORBIDDEN, ConstantService.responseMessage.ERR_MSG_ONLY_ADMIN_OR_STAFF_AUTHORIZED_API);
    }
};
