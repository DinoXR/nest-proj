import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { APIGatewayProxyEventHeaders } from 'aws-lambda';
import { ErrorMessages } from 'src/util/enums';

@Injectable()
export class AuthService {
  verifyUser = async (headers: APIGatewayProxyEventHeaders) => {
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        tokenUse: 'id',
        clientId: process.env.COGNITO_CLIENT_ID,
      });

      const isVerified = await verifier.verify(headers.authorization);

      return isVerified;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED);
    }
  };
}
