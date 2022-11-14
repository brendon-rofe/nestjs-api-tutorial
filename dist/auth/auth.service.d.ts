import { PrismaService } from "src/prisma/prisma.service";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(): {
        msg: string;
    };
    signin(): {
        msg: string;
    };
}
