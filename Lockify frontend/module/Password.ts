export class Password {
    id !: number
    emailOrUsername !: string
    password !: string
    website !: string
    userId !: string

    constructor(id ?: number, emailOrPassword ?: string, password ?: string, website ?: string, userId ?: string) {
        this.id = id || 0
        this.emailOrUsername = emailOrPassword || ""
        this.password = password || ""
        this.website = website || ""
        this.userId = userId || ""
    }

}