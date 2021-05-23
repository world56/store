import userHandle from './user';
import { combineReducers } from 'redux';

import type { UserState } from './user';

export interface Store { user: UserState };

export default combineReducers({
    user: userHandle
});
