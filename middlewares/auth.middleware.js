export const auth = (req, res, next) => {
    if (req.session.userEmail) {
        //console.log(req.session.userEmail)
         next() 
        }
    else {
        res.render('error-404')}
}