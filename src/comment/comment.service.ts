import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/createCommentDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Injectable()
export class CommentService {
    
    constructor(private readonly prismaService: PrismaService){}
    async create(userId: number, createCommentDto: CreateCommentDto) {
        const {postId, content} = createCommentDto
        const post = await this.prismaService.post.findUnique({ where : {postId}})
        if(!post) throw new NotFoundException("Post not found")
        await this.prismaService.comment.create({
            data : {
                content, userId, postId
            },
        });
        return {data: "comment Created!"};
    }

    async delete(commentId: number, userId: number, postId: number) {
        const comment = await this.prismaService.comment.findFirst({where : {commentId}})
        if(!comment) throw new NotFoundException('Comment not found');
        if(comment.postId !== postId) throw new UnauthorizedException("Post id does not mathc")
        if(comment.postId !== userId) throw new ForbiddenException("Forbiden action")
        await this.prismaService.comment.delete({where : {commentId}})
        return {data: "Comment deleted"}
    }

    async update(commentId: number, userId: any, updateCommentDto: UpdateCommentDto) {
        const {content, postId} = updateCommentDto
        const comment = await this.prismaService.comment.findFirst({
            where: { commentId }
        });
        if(!comment) throw new NotFoundException('Comment not found');
        if(comment.postId !== postId)
            throw new UnauthorizedException('Post id does not match');
        if(comment.userId !== userId)
            throw new ForbiddenException("Forbiden action");

            await this.prismaService.comment.update({where : {commentId}, data: {content}})
            return {data: "comment Updated"}
    }
}
