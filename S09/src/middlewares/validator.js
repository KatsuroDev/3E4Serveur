import expressValidator from 'express-validator';
const { matchedData, validationResult } = expressValidator;

export default (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next(); // Redirection vers ma route
    }

    //Nous avons des erreurs de validation
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    const errorResponse = {
        status : 422,
        developerMessage: extractedErrors,
        userMessage: `Erreur de validation de données`,
        moreInfo : `http://${process.env.BASE_URL}/errors/422`
    }

    return res.status(422).json(errorResponse);
}