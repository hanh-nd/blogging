// Original file: src/proto/service/user_service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateUserRequest as _CreateUserRequest, CreateUserRequest__Output as _CreateUserRequest__Output } from './CreateUserRequest';
import type { CreateUserResponse as _CreateUserResponse, CreateUserResponse__Output as _CreateUserResponse__Output } from './CreateUserResponse';
import type { DeleteUserRequest as _DeleteUserRequest, DeleteUserRequest__Output as _DeleteUserRequest__Output } from './DeleteUserRequest';
import type { DeleteUserResponse as _DeleteUserResponse, DeleteUserResponse__Output as _DeleteUserResponse__Output } from './DeleteUserResponse';
import type { GetListUserRequest as _GetListUserRequest, GetListUserRequest__Output as _GetListUserRequest__Output } from './GetListUserRequest';
import type { GetListUserResponse as _GetListUserResponse, GetListUserResponse__Output as _GetListUserResponse__Output } from './GetListUserResponse';
import type { GetUserByIdRequest as _GetUserByIdRequest, GetUserByIdRequest__Output as _GetUserByIdRequest__Output } from './GetUserByIdRequest';
import type { GetUserByIdResponse as _GetUserByIdResponse, GetUserByIdResponse__Output as _GetUserByIdResponse__Output } from './GetUserByIdResponse';
import type { GetUserByUserNameRequest as _GetUserByUserNameRequest, GetUserByUserNameRequest__Output as _GetUserByUserNameRequest__Output } from './GetUserByUserNameRequest';
import type { GetUserByUserNameResponse as _GetUserByUserNameResponse, GetUserByUserNameResponse__Output as _GetUserByUserNameResponse__Output } from './GetUserByUserNameResponse';
import type { GetUserCountRequest as _GetUserCountRequest, GetUserCountRequest__Output as _GetUserCountRequest__Output } from './GetUserCountRequest';
import type { GetUserCountResponse as _GetUserCountResponse, GetUserCountResponse__Output as _GetUserCountResponse__Output } from './GetUserCountResponse';
import type { UpdateUserRequest as _UpdateUserRequest, UpdateUserRequest__Output as _UpdateUserRequest__Output } from './UpdateUserRequest';
import type { UpdateUserResponse as _UpdateUserResponse, UpdateUserResponse__Output as _UpdateUserResponse__Output } from './UpdateUserResponse';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _CreateUserRequest, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _CreateUserRequest, callback: grpc.requestCallback<_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteUser(argument: _DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _DeleteUserRequest, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _DeleteUserRequest, callback: grpc.requestCallback<_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetListUser(argument: _GetListUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  GetListUser(argument: _GetListUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  GetListUser(argument: _GetListUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  GetListUser(argument: _GetListUserRequest, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  getListUser(argument: _GetListUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  getListUser(argument: _GetListUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  getListUser(argument: _GetListUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  getListUser(argument: _GetListUserRequest, callback: grpc.requestCallback<_GetListUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserById(argument: _GetUserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _GetUserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _GetUserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _GetUserByIdRequest, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _GetUserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _GetUserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _GetUserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _GetUserByIdRequest, callback: grpc.requestCallback<_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserByUserName(argument: _GetUserByUserNameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  GetUserByUserName(argument: _GetUserByUserNameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  GetUserByUserName(argument: _GetUserByUserNameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  GetUserByUserName(argument: _GetUserByUserNameRequest, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  getUserByUserName(argument: _GetUserByUserNameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  getUserByUserName(argument: _GetUserByUserNameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  getUserByUserName(argument: _GetUserByUserNameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  getUserByUserName(argument: _GetUserByUserNameRequest, callback: grpc.requestCallback<_GetUserByUserNameResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserCount(argument: _GetUserCountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  GetUserCount(argument: _GetUserCountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  GetUserCount(argument: _GetUserCountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  GetUserCount(argument: _GetUserCountRequest, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  getUserCount(argument: _GetUserCountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  getUserCount(argument: _GetUserCountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  getUserCount(argument: _GetUserCountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  getUserCount(argument: _GetUserCountRequest, callback: grpc.requestCallback<_GetUserCountResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateUser(argument: _UpdateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _UpdateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _UpdateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _UpdateUserRequest, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _UpdateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _UpdateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _UpdateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _UpdateUserRequest, callback: grpc.requestCallback<_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_CreateUserRequest__Output, _CreateUserResponse>;
  
  DeleteUser: grpc.handleUnaryCall<_DeleteUserRequest__Output, _DeleteUserResponse>;
  
  GetListUser: grpc.handleUnaryCall<_GetListUserRequest__Output, _GetListUserResponse>;
  
  GetUserById: grpc.handleUnaryCall<_GetUserByIdRequest__Output, _GetUserByIdResponse>;
  
  GetUserByUserName: grpc.handleUnaryCall<_GetUserByUserNameRequest__Output, _GetUserByUserNameResponse>;
  
  GetUserCount: grpc.handleUnaryCall<_GetUserCountRequest__Output, _GetUserCountResponse>;
  
  UpdateUser: grpc.handleUnaryCall<_UpdateUserRequest__Output, _UpdateUserResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_CreateUserRequest, _CreateUserResponse, _CreateUserRequest__Output, _CreateUserResponse__Output>
  DeleteUser: MethodDefinition<_DeleteUserRequest, _DeleteUserResponse, _DeleteUserRequest__Output, _DeleteUserResponse__Output>
  GetListUser: MethodDefinition<_GetListUserRequest, _GetListUserResponse, _GetListUserRequest__Output, _GetListUserResponse__Output>
  GetUserById: MethodDefinition<_GetUserByIdRequest, _GetUserByIdResponse, _GetUserByIdRequest__Output, _GetUserByIdResponse__Output>
  GetUserByUserName: MethodDefinition<_GetUserByUserNameRequest, _GetUserByUserNameResponse, _GetUserByUserNameRequest__Output, _GetUserByUserNameResponse__Output>
  GetUserCount: MethodDefinition<_GetUserCountRequest, _GetUserCountResponse, _GetUserCountRequest__Output, _GetUserCountResponse__Output>
  UpdateUser: MethodDefinition<_UpdateUserRequest, _UpdateUserResponse, _UpdateUserRequest__Output, _UpdateUserResponse__Output>
}
