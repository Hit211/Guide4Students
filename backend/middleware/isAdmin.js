import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
    const token = req.cookies.adminToken;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY_ADMIN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied: Admins Only" });
        }
        
        req.user = decoded;
        next();
    });
};
