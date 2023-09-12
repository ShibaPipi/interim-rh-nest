import { SetMetadata } from '@nestjs/common'

export const ROUTE_WITHOUT_TOKEN_KEY = 'routeWithoutToken'
export const WithoutToken = () => SetMetadata(ROUTE_WITHOUT_TOKEN_KEY, true)
