import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
const logger = createLogger('getTodos')
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  logger.info(event)

  return undefined
}
