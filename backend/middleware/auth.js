module.exports = (req, res, next) => {
    if (!req.session.userId && !req.session.driverId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
