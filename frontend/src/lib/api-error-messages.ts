export const ErrorMessages = {
  UsernameAlreadyTaken: 'Username already taken',
  EmailAlreadyInUse: 'Email already in use',
  ValidationError: 'Validation error',
  ServerError: 'Server error',
  ClientError: 'Client error',
  UserNotFound: 'User not found',
}

export type ServerErrors = keyof typeof ErrorMessages
