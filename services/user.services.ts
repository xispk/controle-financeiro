import { CreateUserInput } from 'schemas';
import { UserModel } from 'models';

// create a new user
const create = ({ user }: { user: Partial<CreateUserInput> }) => {
  return UserModel.create(user);
};

// methods to find users
const findByEmail = ({ email }: { email: string }) => {
  return UserModel.findOne({ email });
};

const findById = (id: string) => {
  return UserModel.findById(id);
};

const findByName = (username: string) => {
  return UserModel.findOne({ username });
};

// methods to edit users

export const userServices = {
  create,
  findById,
  findByEmail,
  findByName,
};
