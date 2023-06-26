import { Controller, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService : CommentService){}
    
    @Post("create")
    create(@Req() request : Request) {
        const userId = request.user["userId"]
    }
}
