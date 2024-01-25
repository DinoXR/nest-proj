export class CreateUserDto {
  id: string;
  fullName: string;
  email: string;
  dob: string;
  preferences: Array<string>;
}
