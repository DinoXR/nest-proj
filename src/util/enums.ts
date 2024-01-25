export enum StatusCodes {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  INVALID_METHOD = 405,
  INVALID_FORMAT = 403,
  UNAUTHORIZED = 401,
  CREATED = 201,
  DELETED = 204,
}

export enum ErrorMessages {
  UNAUTHORIZED = 'Unauthorized',
  USER_NOT_FOUND = 'User not found',
  MANAGE_PREFERENCES_FAILED = 'Manage preferences failed',
  FAILED_TO_DELETE_USER = 'Failed to delete user',
  FAILED_TO_CREATE_USER = 'Failed to create user',
  PREFERENCE_NOT_FOUND = 'Preference not found',
  FAILED_TO_FETCH_PREFERENCES = 'Failed to fetch preferences',
  FAILED_TO_FETCH_USERS = 'Failed to fetch users',
  PREFERENCE_ALREADY_EXISTS = 'Preference already exists',
  USER_PREFERENCES_EMPTY = "User's preferences are empty",
  INVALID_ACTION_TYPE = 'Invalid action type',
}

export enum ResponseStatus {
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum SuccessMessages {
  PREFERENCES_FETCHED_SUCCESSFULLY = 'Preferences fetched successfully',
  USER_CREATED_SUCCESSFULLY = 'User created successfully',
  USER_FETCHED_SUCCESSFULLY = 'User fetched successfully',
  USER_UPDATED_SUCCESSFULLY = 'User updated successfully',
  USER_DELETED_SUCCESSFULLY = 'User deleted successfully',
  PREFERENCES_MANAGED_SUCCESSFULLY = 'Preferences managed successfully',
}
