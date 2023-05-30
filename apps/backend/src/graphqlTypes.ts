
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

export interface RoleClient {
    id: number;
    name: string;
}

export interface UserClient {
    id: number;
    username: string;
    password: string;
    fullname: string;
    email: string;
    address?: Nullable<string>;
    phone?: Nullable<string>;
    role: RoleClient;
    roleId: number;
    createdAt: DateTime;
}

export interface Role {
    exampleField: number;
}

export interface VideoClient {
    id: number;
    name: string;
    url: string;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
}

export interface TagClient {
    id: number;
    name: string;
}

export interface CategoryClient {
    id: number;
    name: string;
}

export interface IQuery {
    findAllUser(): Nullable<UserClient[]> | Promise<Nullable<UserClient[]>>;
    findOneUser(id: number): Nullable<UserClient> | Promise<Nullable<UserClient>>;
    role(id: number): Role | Promise<Role>;
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
    createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;
    updateRole(updateRoleInput: UpdateRoleInput): Role | Promise<Role>;
    removeRole(id: number): Role | Promise<Role>;
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

export type DateTime = any;
type Nullable<T> = T | null;
