// Original file: src/proto/service/auth_service.proto

import type { GetListUserOptions as _GetListUserOptions, GetListUserOptions__Output as _GetListUserOptions__Output } from './GetListUserOptions';

export interface GetUserCountRequest {
  'options'?: (_GetListUserOptions | null);
  '_options'?: "options";
}

export interface GetUserCountRequest__Output {
  'options'?: (_GetListUserOptions__Output);
  '_options': "options";
}
