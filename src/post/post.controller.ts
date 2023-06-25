import { Body, Controller, Post, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePostDto } from './dto/createPostDto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(@Body() createPostDto: CreatePostDto, @Req() request : Request) {
        const userId = request.user["userId"];
        return this.postService.create(createPostDto, userId);
    }
}
