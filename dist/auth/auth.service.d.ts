import { PrismaService } from "src/prisma/prisma.service";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signin(): {
        msg: string;
    };
    signup(): {
        msg: string;
    };
}
