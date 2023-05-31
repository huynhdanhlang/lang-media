
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    username: string;
    password: string;
    fullname: string;
    email: string;
}

export interface UpdateUserInput {
    password: string;
    fullname: string;
    email: string;
    id: number;
}

export interface CreateRoleInput {
    name: string;
}

export interface UpdateRoleInput {
    id: number;
}

export interface CreateVideoInput {
    name: string;
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
}

export interface UpdateVideoInput {
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
    id: number;
}

export interface CreateTagInput {
    name: string;
}

export interface UpdateTagInput {
    id: number;
}

export interface CreateCategoryInput {
    name: string;
}

export interface UpdateCategoryInput {
    id: number;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface RoleEntity {
    id: number;
    name: string;
}

export interface UserEntity {
    id: number;
    username: string;
    password: string;
    fullname: string;
    email: string;
    address?: Nullable<string>;
    phone?: Nullable<string>;
    role: RoleEntity;
    roleId: number;
    createdAt: DateTime;
}

export interface VideoEntity {
    id: number;
    name: string;
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
}

export interface TagEntity {
    id: number;
    name: string;
}

export interface CategoryEntity {
    id: number;
    name: string;
}

export interface IQuery {
    findAllUser(): Nullable<UserEntity[]> | Promise<Nullable<UserEntity[]>>;
    findOneUser(id: number): Nullable<UserEntity> | Promise<Nullable<UserEntity>>;
    role(id: number): RoleEntity | Promise<RoleEntity>;
    findAllVideo(): VideoEntity[] | Promise<VideoEntity[]>;
    findOneVideo(id: number): VideoEntity | Promise<VideoEntity>;
    findAllTag(): TagEntity[] | Promise<TagEntity[]>;
    findOneTag(id: number): TagEntity | Promise<TagEntity>;
    findAllCategory(): CategoryEntity[] | Promise<CategoryEntity[]>;
    findOneCategory(id: number): CategoryEntity | Promise<CategoryEntity>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): UserEntity | Promise<UserEntity>;
    updateUser(updateUserInput: UpdateUserInput): UserEntity | Promise<UserEntity>;
    removeUser(id: number): UserEntity | Promise<UserEntity>;
    createRole(createRoleInput: CreateRoleInput): RoleEntity | Promise<RoleEntity>;
    updateRole(updateRoleInput: UpdateRoleInput): RoleEntity | Promise<RoleEntity>;
    removeRole(id: number): RoleEntity | Promise<RoleEntity>;
    createVideo(createVideoInput: CreateVideoInput): VideoEntity | Promise<VideoEntity>;
    updateVideo(updateVideoInput: UpdateVideoInput): VideoEntity | Promise<VideoEntity>;
    removeVideo(id: number): VideoEntity | Promise<VideoEntity>;
    createTag(createTagInput: CreateTagInput): TagEntity | Promise<TagEntity>;
    updateTag(updateTagInput: UpdateTagInput): TagEntity | Promise<TagEntity>;
    removeTag(id: number): TagEntity | Promise<TagEntity>;
    createCategory(createCategoryInput: CreateCategoryInput): CategoryEntity | Promise<CategoryEntity>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): CategoryEntity | Promise<CategoryEntity>;
    removeCategory(id: number): CategoryEntity | Promise<CategoryEntity>;
    login(loginInput: LoginInput): UserEntity | Promise<UserEntity>;
}

export type DateTime = any;
type Nullable<T> = T | null;
