import JWt from 'jsonwebtoken';

export const generateToken = (UserId,res) => {
    const token= JWt.sign({ UserId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    res.cookie("JWT", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sanesite: true,
        secure: process.env.NODE_ENV === 'development', // Use secure cookies in development
    });
    return token;
}