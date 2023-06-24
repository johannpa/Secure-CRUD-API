import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post("signup")
    signup(@Body() signupDto : SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post("signin")
    signin(@Body() signinDto : SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Post("reset-password")
    resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
        return this.authService.resetPasswordDemand(resetPasswordDemandDto)
    }
}
