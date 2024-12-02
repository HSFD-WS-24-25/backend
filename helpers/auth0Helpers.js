const jwt = require('jsonwebtoken');

//function for extracting the token from the header 
function extractAndDecodeToken(req) {
    const authHeader = req.headers.authorization;
    let decodedToken = null;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            decodedToken = jwt.decode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    } else {
        console.log('No Authorization header found');
    }

    return decodedToken;
}


// Function for getting sub from a decoded token
function getSub(decodedToken) {
    try {
        if (!decodedToken.sub) {
            throw new Error('Token contains no sub');
        } else {
            return decodedToken.sub;
        }
    } catch (error) {
        console.error('Error getting sub from token:', error);
        return null;
    }
}

// Helper function for splitting name returned from token as an array
function splitName(fullName) {
    // Check if there are any spaces in the name, if not return name
    if (!fullName.includes(' ')) {
        return fullName;
    } else {
        const nameArray = fullName.trim().split(/\s+/);
        return nameArray;
    }
}

// Function for getting name if available in a decoded token
function getName(decodedToken) {
    try {
        if (!decodedToken.name) {
            throw new Error('No name found in token');
        } else {
            // Returns name as an array
            return splitName(decodedToken.name);
        }
    } catch (error) {
        console.error('Error getting name from token:', error);
        return null;
    }
}

// Function for getting email if available in a decoded token
function getEmail(decodedToken) {
    try {
        if (!decodedToken.email) {
            throw new Error('No email found in token');
        } else {
            return decodedToken.email;
        }
    } catch (error) {
        console.error('Error getting email from token:', error);
        return null;
    }
}

module.exports = { getSub, getName, getEmail,extractAndDecodeToken };