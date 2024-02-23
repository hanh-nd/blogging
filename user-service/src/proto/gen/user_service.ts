import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserServiceClient as _UserServiceClient, UserServiceDefinition as _UserServiceDefinition } from './UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
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
  UpdateUserRequest: MessageTypeDefinition
  UpdateUserResponse: MessageTypeDefinition
  User: MessageTypeDefinition
  UserService: SubtypeConstructor<typeof grpc.Client, _UserServiceClient> & { service: _UserServiceDefinition }
}

