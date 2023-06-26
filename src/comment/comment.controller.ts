import { Controller, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService : CommentService){}
    
    @Post("create")
    create(@Req() request : Request, @Body() createCommentDto: CreateCommentDto) {
        const userId = request.user["userId"]
        return this.commentService.create(userId, createCommentDto)
    }
}
