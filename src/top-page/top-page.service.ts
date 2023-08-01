import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPage, TopPageDocument } from './top-page.model';
import { Model } from 'mongoose';
import { TopPageDto } from './dto/top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: TopPageDto): Promise<TopPage> {
    const createdTopPage = await this.topPageModel.create(dto);
    return createdTopPage;
  }

  async getById(id: string): Promise<TopPage> {
    const topPage = await this.topPageModel.findById(id);
    return topPage;
  }

  async delete(id: string): Promise<TopPage> {
    const deletedTopPage = await this.topPageModel.findByIdAndDelete(id);
    return deletedTopPage;
  }

  async update(id: string, dto: TopPageDto): Promise<TopPage> {
    const updatedTopPage = await this.topPageModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedTopPage;
  }

  async find(dto: FindTopPageDto): Promise<TopPage[]> {
    const topPage = await this.topPageModel.find(dto);
    return topPage;
  }
}
