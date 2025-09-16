import type { NewUserType } from '@/types'
import {
    useQueries,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import { createNewUserAccount, signInAccount } from '../appwrite/api'

export const useCreateuserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: NewUserType) => createNewUserAccount(user)
    })
}

export const useSigninAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string}) => signInAccount(user)
    })
}