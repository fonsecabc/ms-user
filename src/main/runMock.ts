import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import * as controllers from '@/presentation/controllers'

const event = controllers.loginUserController

initializeApp()

const request: any = {
  email: 'caiobragadafonseca@gmail.com',
  password: '123456',
}

event(request).then(console.log)
