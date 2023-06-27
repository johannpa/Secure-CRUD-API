import { Controller, Post } from '@nestjs/common';
import { Delete, Body, UseGuards, Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
import { Request } from 'express';
import { DeleteAccountDto } from './dto/deleteAccountDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication")
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
    @Post("reset-password-confirmation")
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        return this.authService.resetPasswordConfirmation(resetPasswordConfirmationDto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteAccount(@Req() request : Request, @Body() deleteAccountDto: DeleteAccountDto) {
        const userId = request.user["userId"];
        return this.authService.deleteAccount(userId, deleteAccountDto)
    }
}
