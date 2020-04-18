import 'source-map-support/register'

import {
  CustomAuthorizerEvent,
  CustomAuthorizerResult
} from 'aws-lambda'
import Axios from 'axios'
import {
  decode,
  verify
} from 'jsonwebtoken'
import { Logger } from 'winston'

import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'
import { createLogger } from '../../utils/logger'

const logger: Logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl: string =
  'https://dev-06m895h6.eu.auth0.com/.well-known/jwks.json'

let cert: any, certValue: string, finalCertKey: string

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  if (!cert) {
    let certRequest = await Axios.get(jwksUrl)
    cert = certRequest.data

    if (certRequest.status > 299)
      logger.error('Request failed for jwttoken certificate')
  }

  certValue = ExtractX5cKey(jwt)

  finalCertKey = generateCertificateKey()

  logger.debug('bla', cert, certValue, finalCertKey)

  return verify(token, finalCertKey, { algorithms: ['RS256'] }) as JwtPayload
}

function ExtractX5cKey(jwt: Jwt) {
  if (!certValue) return certValue

  const keys: any[] = cert.keys
  const signingKey = keys.find((key) => key.kid === jwt.header.kid)
  return signingKey.x5c[0]
}

function generateCertificateKey(): string {
  if (!finalCertKey) return finalCertKey

  return `-----BEGIN CERTIFICATE-----\n${certValue}\n-----END CERTIFICATE-----\n`
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
