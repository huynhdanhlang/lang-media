import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { VideoEntity } from '../video/entities/video.entity';
import Video from '../database/models/Video';
import { VideoService } from '../video/video.service';
import { CategoryFilter } from './dto/category-filter.input';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private videoService: VideoService
  ) {}

  @Mutation(() => CategoryEntity)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryEntity], { nullable: true })
  findAllCategory(@Args('categoryFilter') categoryFilter: CategoryFilter) {
    // @ts-ignore
    return this.categoryService.findAll({...categoryFilter});
  }

  @Query(() => CategoryEntity, { nullable: true })
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @ResolveField(() => VideoEntity, { nullable: true })
  async videos(@Parent() parent: CategoryEntity) {
    const { id } = parent;
    const category = await this.categoryService.findOne(id, {
      include: [
        {
          model: Video,
        },
      ],
      attributes: [],
    });
    return category.videos;
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
