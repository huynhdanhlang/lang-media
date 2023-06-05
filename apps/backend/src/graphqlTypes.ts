
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
    currentHashedRefreshToken?: Nullable<string>;
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
    poster?: Nullable<string>;
}

export interface UpdateVideoInput {
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
    poster?: Nullable<string>;
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

export interface TagEntity {
    id: number;
    name: string;
}

export interface VideoEntity {
    id: number;
    name: string;
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
    tags: TagEntity[];
    poster?: Nullable<string>;
}

export interface CategoryEntity {
    id: number;
    name: string;
    videos: VideoEntity[];
}

export interface ObjectMessage {
    statusCode?: Nullable<number>;
    message: string;
}

export interface IQuery {
    findAllUser(): Nullable<UserEntity[]> | Promise<Nullable<UserEntity[]>>;
    findOneUser(id: number): Nullable<UserEntity> | Promise<Nullable<UserEntity>>;
    role(id: number): RoleEntity | Promise<RoleEntity>;
    findAllVideo(): Nullable<VideoEntity[]> | Promise<Nullable<VideoEntity[]>>;
    findOneVideo(id: number): Nullable<VideoEntity> | Promise<Nullable<VideoEntity>>;
    findAllTag(): Nullable<TagEntity[]> | Promise<Nullable<TagEntity[]>>;
    findOneTag(id: number): Nullable<TagEntity> | Promise<Nullable<TagEntity>>;
    findAllCategory(): Nullable<CategoryEntity[]> | Promise<Nullable<CategoryEntity[]>>;
    findOneCategory(id: number): Nullable<CategoryEntity> | Promise<Nullable<CategoryEntity>>;
    refreshToken(): UserEntity | Promise<UserEntity>;
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
    logout(): ObjectMessage | Promise<ObjectMessage>;
}

export type DateTime = any;
type Nullable<T> = T | null;
