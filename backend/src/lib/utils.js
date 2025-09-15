import JWt from 'jsonwebtoken';

export const generateToken = (UserId,res) => {
    const token= JWt.sign({ id: UserId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    });
    return token;
}
