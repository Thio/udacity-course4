import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
const logger = createLogger('createTodo')
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  logger.info(newTodo)
  // TODO: Implement creating a new TODO item
  return undefined
}
