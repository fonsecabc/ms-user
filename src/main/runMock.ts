import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import * as controllers from '@/presentation/controllers'

const event = controllers.getUserController

initializeApp()

const request: any = {
  uid: 'c6945948-3fde-4f4a-8eb6-a3ae2ff7fd98'
}

event(request).then(console.log)
