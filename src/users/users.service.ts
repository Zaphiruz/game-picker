import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOne(query: FilterQuery<User>): Promise<UserDocument | undefined> {
        return this.userModel.findOne(query);
    }

    async findById(id: string): Promise<UserDocument | undefined> {
        return this.userModel.findById('id');
    }

    async create(partial: Partial<User>): Promise<UserDocument> {
        let doc = new this.userModel(partial);
        return doc.save();
    }
}
