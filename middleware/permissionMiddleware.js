const { check } = require('express-validator');
const jwt = require('jsonwebtoken');
const { getSub, extractAndDecodeToken } = require('../helpers/authHelper');
const logToken = require('./logTokenMiddleware');


// this function will examine the token, extract the sub and check if the user has the required permissions to perform the given function
const checkPermissions = () => {
    return (req, res, next) => {
    // let permission = requestedFunction;
    let permission = 'getall';
    let isPermitted = false;
    //for debugging purposes     
    console.log('checking for user permission to perform:', permission);
    
    // extract and decode the token
    const decodedToken = extractAndDecodeToken(req);
    // extract the sub 
    const userId = getSub(decodedToken);

    // TODO check if the user has the required permission (impliment once the database is sorted)
    // if the user has the required permission set isPermitted to true and continue else return a message to the user
    //quiry permissions for userId against list of permissions required to perfiorm this function 


    if (isPermitted) {
        console.log('User has permission to perform:', permission);
        next();
    } else {
        console.log('User does not have permission to perform:', permission);
        next();
    }
    };
};

module.exports = checkPermissions;