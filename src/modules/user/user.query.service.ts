import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { UserRepository } from './user.repository';

import { InternalServerErrorException } from '../../exceptions/internal-server-error.exception';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  async findById(id: string): Promise<UserDocument> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  async create(user: User): Promise<UserDocument> {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  async updateVerifiedStatus(id: string | Types.ObjectId): Promise<UserDocument> {
    const update = {
      $set: {
        verified: true,
      },
    };
    const options = {
      new: true,
    };
    try {
      return await this.userRepository.findByIdAndUpdate(id, update, options);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  convertDocumentToUser(userDocument: UserDocument): User {
    return userDocument.toObject();
  }
}
