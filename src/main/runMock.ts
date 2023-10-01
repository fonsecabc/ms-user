import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import * as controllers from '@/presentation/controllers'

const event = controllers.createUserController

initializeApp()

const request: any = {
  email: 'caiobragadafonseca@gmail.com',
  password: '123456',
}

event(request).then(console.log)
