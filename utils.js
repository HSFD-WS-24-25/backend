function isValidPermission(permission = null) {
    if (!permission || typeof permission !== 'object') {
        return false;
    }

    if (!permission.id || !permission.name) {
        return false;
    }

    return true;
}

module.exports = {
    isValidPermission,
}