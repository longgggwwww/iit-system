export type Dto = {
    userId: number
    imageUrl: string
}

export class UploadAvatarEvent {
    private readonly userId: number
    private readonly imageUrl: string

    constructor({ userId, imageUrl }: Dto) {
        this.userId = userId
        this.imageUrl = imageUrl
    }
}
