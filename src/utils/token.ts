import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id: string; 
}

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value; // Get the token from cookies
        
        if (!token) {
            throw new Error("Token does not exist"); // Provide a clear error message
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

        // Return the user ID from the decoded token
        return decoded.id; 
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token"); // Handle invalid token error
        } else if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Token has expired"); // Handle expired token error
        } else {
            throw new Error("An unknown error occurred during token verification"); // General error message
        }
    }
};