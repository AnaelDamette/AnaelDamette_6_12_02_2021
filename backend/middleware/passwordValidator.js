const passwordSchema = require('../models/password');


module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Le mot de passe est trop faible, veuillez mettre au moins 1 majuscule, 1 chiffre, 1 caractère spécial"}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};