export interface IGroup {
    count: number
    sum: number
    offset: number
    items: {
        id: number
        name: string
        description: string
        benefits: string[]
        tags: string[]
        available: boolean
        products: {
            available: boolean
            type: string
            created_at: Date
            updated_at: Date
            id: number
            name: string
            description: string
            price: number
            benefits: string[]
            tags: string[]
            duration_days: number
            
        }[]
    }[]
}