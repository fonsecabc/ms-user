export interface User {
    uid: string
    email: string
    isActive: boolean
    isEnabled: boolean
    createdAt: any
    deletedAt?: any
    customerUid?: string
    subscriptionUid?: string
    subscriptionStatus?: string
}
