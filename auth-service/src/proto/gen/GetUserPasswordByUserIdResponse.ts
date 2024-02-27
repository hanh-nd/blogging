// Original file: src/proto/service/auth_service.proto

import type { UserPassword as _UserPassword, UserPassword__Output as _UserPassword__Output } from './UserPassword';

export interface GetUserPasswordByUserIdResponse {
  'userPassword'?: (_UserPassword | null);
}

export interface GetUserPasswordByUserIdResponse__Output {
  'userPassword'?: (_UserPassword__Output);
}
