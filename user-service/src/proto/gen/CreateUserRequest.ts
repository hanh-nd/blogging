// Original file: src/proto/service/user_service.proto


export interface CreateUserRequest {
  'userName'?: (string);
  'displayName'?: (string);
  'email'?: (string);
  'provider'?: (string);
  '_displayName'?: "displayName";
}

export interface CreateUserRequest__Output {
  'userName'?: (string);
  'displayName'?: (string);
  'email'?: (string);
  'provider'?: (string);
  '_displayName': "displayName";
}
