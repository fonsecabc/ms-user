import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import * as controllers from '@/presentation/controllers'

const event = controllers.loginUserController

initializeApp()

const request: any = {

}

event(request).then(console.log)
