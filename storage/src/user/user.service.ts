import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { UploadAvatarEvent } from 'src/event/upload-avatar.event'

@Injectable()
export class UserService {
    constructor(
        private cloudinary: CloudinaryService,
        @Inject('USER_SERVICE') private user: ClientProxy,
    ) {}

    async uploadAvatar(file: Express.Multer.File, userId?: number) {
        const uploadedImage = await this.cloudinary.uploadFile(
            file,
            `users/${userId}`,
        )
        const image = this.cloudinary.make(uploadedImage.public_id, {
            transformation: [
                {
                    gravity: 'face',
                    height: 200,
                    width: 200,
                    crop: 'thumb',
                },
            ],
        })
        if (userId) {
            this.user.emit(
                'user_updateAvt',
                new UploadAvatarEvent({
                    userId,
                    imageUrl: image,
                }),
            )
        }
        return image
    }
}
