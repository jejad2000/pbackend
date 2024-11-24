import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

// Load environment variables SECRET KEY if none use default
const SECRET_KEY = process.env.JWT_SECRET || 'this_is_a_default_secret_key';

export interface DecodedToken {
    username: string;
}

export const generateToken = (username: string): string => {
    return sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return verify(token, SECRET_KEY) as DecodedToken;
    } catch (err) {
        return null;
    }
};