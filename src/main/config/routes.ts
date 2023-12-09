import { Routes } from '@/presentation/helpers'
import * as controllers from '@/presentation/controllers'

export const routes: Routes[] = [
  {
    path: '/create',
    method: 'POST',
    handler: controllers.createUserController,
  },
  // {
  //   path: '/update-email',
  //   method: 'PUT',
  //   handler: controllers.updateUsersEmailController,
  // },
  // {
  //   path: '/update-password',
  //   method: 'PUT',
  //   handler: controllers.updateUsersPasswordController,
  // },
  {
    path: '/get',
    method: 'GET',
    handler: controllers.getUserController,
  },
  // {
  //   path: '/delete',
  //   method: 'DELETE',
  //   handler: controllers.deleteUserController,
  // },
  {
    path: '/login',
    method: 'POST',
    handler: controllers.loginUserController,
  },
]

