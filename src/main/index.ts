import './config/moduleAlias'
import { routes } from '@/main/config'
import { defineHttpService } from '@/main/adapters'

export const user = defineHttpService(routes)
