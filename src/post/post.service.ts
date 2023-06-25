import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPostDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.post.findMany({
            include : {
                user : {
                    select : {
                        userName : true,
                        email : true,
                        password : false
                    }
                },
                Comments : {
                    include : {
                        user : {
                            select : {
                                userName : true,
                                email : true,
                                password : false
                            }
                        }
                    }
                }
            }
        });
        
    }

    async create(createPostDto: CreatePostDto, userId: any) {
        const {body, title} = createPostDto
        await this.prismaService.post.create({data : {body, title, userId}});
        return {data: "Post created"};
    }
}
