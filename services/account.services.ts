import { AccountModel } from 'models';

// create account
const create = ({ email, tier }: { email: string; tier: string }) => {
  return AccountModel.create({ email, tier });
};

// methods to find account
const findByEmail = ({ email }: { email: string }) => {
  return AccountModel.findOne({ email });
};

const findById = (id: string) => {
  return AccountModel.findById(id);
};

// methods to edit accounts
const findByIdAndUpdate = async ({
  accountId,
  userId,
}: {
  accountId: string;
  userId: string;
}) => {
  return await AccountModel.findByIdAndUpdate(
    accountId,
    {
      $push: { users: userId },
    },
    { new: true }
  );
};

export const accountServices = {
  create,
  findByEmail,
  findById,
  findByIdAndUpdate,
};
