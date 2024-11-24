
import { compare, hash } from 'bcryptjs';
import { UserManager } from '../../helper/UserManager';
import { generateToken } from '../../helper/Auth';
import { errorResponse, successResponseWithData, successResponse } from "../../helper/ApiResponse";

class UserAccess {

    // Initialize UserManager
    private static userManager = new UserManager();

    public static async login(req: any, res: any) {
        const { username, password } = req.body;

        const user = UserAccess.userManager.findUser(username);
        if (!user) {
            return errorResponse(res, "User is not available");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return errorResponse(res, "Invalid credentials");
        }

        const token = generateToken(username);
        return successResponseWithData(res, "Successfully login", { token: token });
    }

    public static async register(req: any, res: any) {
        const { username, password } = req.body;

        console.log(username, password)

        if (UserAccess.userManager.findUser(username)) {
            return errorResponse(res, "User already exists");
        }

        const hashedPassword = await hash(password, 10);
        UserAccess.userManager.addUser({ username, password: hashedPassword });
        return successResponse(res, "User registered successfully");
    }
    
}

export default UserAccess;
