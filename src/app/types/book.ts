export interface UnifiedBook {
    id: string
    volumeInfo: {
        title: string
        authors: string[]
        description?: string
        imageLinks?: {
            thumbnail?: string
        }
    }
    fromDatabase: boolean
}

