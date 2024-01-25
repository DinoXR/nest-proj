import Joi from 'joi';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const userCreateValidator = (request: CreateUserDto) => {
  const userEntityValidator = Joi.object({
    id: Joi.string().allow(null),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    dob: Joi.string().isoDate().required(),
    preferences: Joi.array().items(Joi.string()).default([]),
  });
  return userEntityValidator.validate(request);
};
