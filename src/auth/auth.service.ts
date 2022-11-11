import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

  signin() {
    return { msg: "Signing you in" };
  }

  signup() {
    return { msg: "Signing you up" };
  }

}