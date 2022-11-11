import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(): {
        msg: string;
    };
    signup(): {
        msg: string;
    };
}
