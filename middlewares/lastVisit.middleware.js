export const setLastVisit = (req, res, next) => {
    if (req.cookies.lastVisit) {
        const options = {day:'2-digit',month:'short',year:'numeric'}
        res.locals.lastVisitTime = new Date(req.cookies.lastVisit).toLocaleString('en-GB');
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleDateString('en-GB', options);
    } else {
        res.locals.lastVisitTime = 'First Visit';
    }

    res.cookie('lastVisit', new Date().toISOString(), { maxAge: 2 * 24 * 60 * 60 * 1000 });
    next();
};
