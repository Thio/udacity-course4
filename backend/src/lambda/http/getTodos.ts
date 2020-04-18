import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodos')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(event)

    // Get todo items  -> TodoService (businesslogic)

    // return 200 -> stringify (todo items)
    return undefined
  }
)

handler.use(
  cors({
    credentials: true
  })
)
