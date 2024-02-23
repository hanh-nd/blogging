// Original file: src/proto/service/user_service.proto


export interface UpdateUserRequest {
  'userId'?: (number);
  'displayName'?: (string);
  'email'?: (string);
  '_displayName'?: "displayName";
  '_email'?: "email";
}

export interface UpdateUserRequest__Output {
  'userId'?: (number);
  'displayName'?: (string);
  'email'?: (string);
  '_displayName': "displayName";
  '_email': "email";
}
