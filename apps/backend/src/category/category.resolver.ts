import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryEntity)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryEntity])
  findAllCategory() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryEntity)
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
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
