import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    logger.info(todoId)

    // Build img url https + Bucketname + s3.amazon.com + todoitem

    // Get signed url -> DataLayer -> S3Client

    // Update AttachmentUrl for Todo item  -> TodoService (businesslogic)

    // return 200 -> stringify url
    return undefined
  }
)

handler.use(
  cors({
    credentials: true
  })
)
