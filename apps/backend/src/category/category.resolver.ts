import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryClient } from './dto/category.client';

@Resolver(() => CategoryClient)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryClient)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryClient])
  findAllCategory() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryClient)
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryClient)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput
    );
  }

  @Mutation(() => CategoryClient)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
