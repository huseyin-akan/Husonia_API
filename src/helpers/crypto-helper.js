const bcrypt = require('bcryptjs');

const encrpytPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const comparePassword = async (passwordToCompare, realPassword) => {
    const result = await bcrypt.compare(passwordToCompare, realPassword);
    return result;
} 

module.exports = {encrpytPassword, comparePassword};