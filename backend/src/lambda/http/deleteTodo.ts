import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
const logger = createLogger('deleteTodo')

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  logger.info(todoId)

  // TODO: Remove a TODO item by id
  return undefined
}
