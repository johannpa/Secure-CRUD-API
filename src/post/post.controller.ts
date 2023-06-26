import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePostDto } from './dto/createPostDto';
import { PostService } from './post.service';
import { UpdatePosteDto } from './dto/updatePostDto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    getAll() {
        return this.postService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
        const userId = request.user["userId"];
        return this.postService.create(createPostDto, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    delete(@Param("id", ParseIntPipe) postId: number, @Req() request: Request) {
        const userId = request.user["userId"];
        return this.postService.delete(postId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    updatae(
        @Param("id", ParseIntPipe) postId: number, 
        @Body() updatePosteDto: UpdatePosteDto, 
        @Req() request: Request
        ) {
        const userId = request.user["userId"];
        return this.postService.update(postId, userId, updatePosteDto);
    }
}
