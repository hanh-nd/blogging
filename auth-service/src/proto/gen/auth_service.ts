import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthServiceClient as _AuthServiceClient, AuthServiceDefinition as _AuthServiceDefinition } from './AuthService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AuthService: SubtypeConstructor<typeof grpc.Client, _AuthServiceClient> & { service: _AuthServiceDefinition }
  CreateUserPasswordRequest: MessageTypeDefinition
  CreateUserPasswordResponse: MessageTypeDefinition
  CreateUserRequest: MessageTypeDefinition
  CreateUserResponse: MessageTypeDefinition
  DeleteUserRequest: MessageTypeDefinition
  DeleteUserResponse: MessageTypeDefinition
  GetListUserOptions: MessageTypeDefinition
  GetListUserRequest: MessageTypeDefinition
  GetListUserResponse: MessageTypeDefinition
  GetUserByIdRequest: MessageTypeDefinition
  GetUserByIdResponse: MessageTypeDefinition
  GetUserByUserNameRequest: MessageTypeDefinition
  GetUserByUserNameResponse: MessageTypeDefinition
  GetUserCountRequest: MessageTypeDefinition
  GetUserCountResponse: MessageTypeDefinition
  GetUserPasswordByUserIdRequest: MessageTypeDefinition
  GetUserPasswordByUserIdResponse: MessageTypeDefinition
  UpdateUserRequest: MessageTypeDefinition
  UpdateUserResponse: MessageTypeDefinition
  User: MessageTypeDefinition
  UserPassword: MessageTypeDefinition
}

