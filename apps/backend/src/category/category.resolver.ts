import { Inject, forwardRef } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VideoEntity } from '../video/entities/video.entity';
import { VideoService } from '../video/video.service';
import { CategoryService } from './category.service';
import { CategoryFilter } from './dto/category-filter.input';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryEntity } from './entities/category.entity';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => VideoService))
    private videoService: VideoService
  ) {}

  @Mutation(() => CategoryEntity)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryEntity], { nullable: true })
  findAllCategory(
    @Args('categoryFilter', {
      nullable: true,
    })
    categoryFilter?: CategoryFilter
  ) {
    // @ts-ignore
    return this.categoryService.findAll({ ...categoryFilter });
  }

  @Query(() => CategoryEntity, { nullable: true })
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @ResolveField(() => VideoEntity, { nullable: true })
  async videos(@Parent() parent: CategoryEntity) {
    const { id } = parent;
    return this.videoService.getVideoByCategory(id);
  }

  @Mutation(() => CategoryEntity)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput
    );
  }

  @Mutation(() => CategoryEntity)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
