import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const privateKeyPath = path.resolve(dirname, '../../keys/private_key.key');
const publicKeyPath = path.resolve(dirname, '../../keys/public_key.key');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

export const createJwt = (id) => {
    return jwt.sign({ id }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '30m',
    });
};

export const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        }
        throw new Error('Invalid token');
    }
};