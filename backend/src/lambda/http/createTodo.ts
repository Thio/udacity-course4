import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    logger.info(newTodo)
    // TODO: Implement creating a new TODO item
    return undefined
  }
)

handler.use(
  cors({
    credentials: true
  })
)
