import { Routes } from '@/presentation/helpers'
import * as controllers from '@/main/factories/controllers'

export const routes: Routes[] = [
  {
    path: '/create',
    method: 'POST',
    handler: controllers.CreateUserControllerFactory.getInstance().make(),
  },
  // {
  //   path: '/update-email',
  //   method: 'PUT',
  //   handler: controllers.UpdateUsersEmailControllerFactory.getInstance().make(),
  // },
  // {
  //   path: '/update-password',
  //   method: 'PUT',
  //   handler: controllers.UpdateUsersPasswordControllerFactory.getInstance().make(),
  // },
  {
    path: '/get',
    method: 'GET',
    handler: controllers.GetUserControllerFactory.getInstance().make(),
  },
  // {
  //   path: '/delete',
  //   method: 'DELETE',
  //   handler: controllers.DeleteUserControllerFactory.getInstance().make(),
  // },
  {
    path: '/login',
    method: 'POST',
    handler: controllers.LoginUserControllerFactory.getInstance().make(),
  },
]

