import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/createPostDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePosteDto } from './dto/updatePostDto';

@Injectable()
export class PostService {

    constructor(private readonly prismaService: PrismaService) { }

    async getAll() {
        return await this.prismaService.post.findMany({
            include: {
                user: {
                    select: {
                        userName: true,
                        email: true,
                        password: false
                    }
                },
                Comments: {
                    include: {
                        user: {
                            select: {
                                userName: true,
                                email: true,
                                password: false
                            },
                        },
                    },
                },
            },
        });

    }

    async create(createPostDto: CreatePostDto, userId: any) {
        const { body, title } = createPostDto;
        await this.prismaService.post.create({ data: { body, title, userId } });
        return { data: "Post created" };
    }

    async delete(postId: number, userId: any) {
        const post = await this.prismaService.post.findUnique({ where: { postId } })
        if (!post) throw new NotFoundException("Post not found");
        if (post.userId !== userId) throw new ForbiddenException("Forbiden action")
        await this.prismaService.post.delete({ where: { postId } });
        return { data: "Post deleted" }
    }

    async update(postId: number, userId: any, updatePosteDto: UpdatePosteDto) {
        const post = await this.prismaService.post.findUnique({ where: { postId } })
        if (!post) throw new NotFoundException("Post not found");
        if (post.userId !== userId) throw new ForbiddenException("Forbiden action");
        await this.prismaService.post.update({ where: { postId }, data: { ...updatePosteDto } })
        return { data: "Post updated!" }
    }
}
