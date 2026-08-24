import mongoose from 'mongoose';

export const makeWrapper = (mongooseModel) => {
  return {
    find: async (filter = {}) => {
      return await mongooseModel.find(filter).lean();
    },
    findOne: async (filter = {}) => {
      return await mongooseModel.findOne(filter).lean();
    },
    findById: async (id) => {
      return await mongooseModel.findById(id).lean();
    },
    create: async (data) => {
      const instance = new mongooseModel(data);
      const saved = await instance.save();
      return saved.toObject();
    },
    findByIdAndUpdate: async (id, updateData, options = { new: true }) => {
      return await mongooseModel.findByIdAndUpdate(id, updateData, { ...options, lean: true });
    },
    findByIdAndDelete: async (id) => {
      return await mongooseModel.findByIdAndDelete(id).lean();
    },
    countDocuments: async (filter = {}) => {
      return await mongooseModel.countDocuments(filter);
    }
  };
};
