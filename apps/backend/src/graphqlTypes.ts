
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
    username?: Nullable<string>;
    password?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    id: number;
}

export interface CreateVideoInput {
    name: string;
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<string>;
    country: string;
}

export interface UpdateVideoInput {
    name?: Nullable<string>;
    url?: Nullable<string>;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<string>;
    country?: Nullable<string>;
    id: number;
}

export interface CreateTagInput {
    name: string;
}

export interface UpdateTagInput {
    name?: Nullable<string>;
    id: number;
}

export interface CreateCategoryInput {
    name: string;
}

export interface UpdateCategoryInput {
    name?: Nullable<string>;
    id: number;
}

export interface UserClient {
    username: string;
    password: string;
    fullname: string;
    email: string;
    address?: Nullable<string>;
    phone?: Nullable<string>;
}

export interface VideoClient {
    name: string;
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<string>;
    country: string;
}

export interface TagClient {
    name: string;
}

export interface CategoryClient {
    name: string;
}

export interface IQuery {
    findAllUser(): Nullable<UserClient[]> | Promise<Nullable<UserClient[]>>;
    findOneUser(id: number): Nullable<UserClient> | Promise<Nullable<UserClient>>;
    findAllVideo(): VideoClient[] | Promise<VideoClient[]>;
    findOneVideo(id: number): VideoClient | Promise<VideoClient>;
    findAllTag(): TagClient[] | Promise<TagClient[]>;
    findOneTag(id: number): TagClient | Promise<TagClient>;
    findAllCategory(): CategoryClient[] | Promise<CategoryClient[]>;
    findOneCategory(id: number): CategoryClient | Promise<CategoryClient>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): UserClient | Promise<UserClient>;
    updateUser(updateUserInput: UpdateUserInput): UserClient | Promise<UserClient>;
    removeUser(id: number): UserClient | Promise<UserClient>;
    createVideo(createVideoInput: CreateVideoInput): VideoClient | Promise<VideoClient>;
    updateVideo(updateVideoInput: UpdateVideoInput): VideoClient | Promise<VideoClient>;
    removeVideo(id: number): VideoClient | Promise<VideoClient>;
    createTag(createTagInput: CreateTagInput): TagClient | Promise<TagClient>;
    updateTag(updateTagInput: UpdateTagInput): TagClient | Promise<TagClient>;
    removeTag(id: number): TagClient | Promise<TagClient>;
    createCategory(createCategoryInput: CreateCategoryInput): CategoryClient | Promise<CategoryClient>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): CategoryClient | Promise<CategoryClient>;
    removeCategory(id: number): CategoryClient | Promise<CategoryClient>;
}

type Nullable<T> = T | null;
