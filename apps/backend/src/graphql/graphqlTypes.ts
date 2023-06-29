
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserFilter {
    order?: Nullable<string[][]>;
    attributes?: Nullable<FAttributeOptions>;
    include?: Nullable<IncludeModel[]>;
    group?: Nullable<string>;
    limit?: Nullable<number>;
    mapToModel?: Nullable<boolean>;
    nest?: Nullable<boolean>;
    offset?: Nullable<number>;
    paranoid?: Nullable<boolean>;
    plain?: Nullable<boolean>;
    raw?: Nullable<boolean>;
    skipLocked?: Nullable<boolean>;
    subQuery?: Nullable<boolean>;
    type?: Nullable<string>;
    useMaster?: Nullable<boolean>;
    where?: Nullable<UserWherClause>;
}

export interface FAttributeOptions {
    exclude?: Nullable<string[]>;
    include?: Nullable<string[]>;
}

export interface IncludeModel {
    where?: Nullable<JSON>;
    association?: Nullable<string>;
    as?: Nullable<string>;
    model?: Nullable<string>;
    attributes?: Nullable<FAttributeOptions>;
    include?: Nullable<IncludeModel[]>;
}

export interface UserWherClause {
    password?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    currentHashedRefreshToken?: Nullable<string>;
    id?: Nullable<number[]>;
}

export interface VideoFilter {
    order?: Nullable<string[][]>;
    attributes?: Nullable<FAttributeOptions>;
    include?: Nullable<IncludeModel[]>;
    group?: Nullable<string>;
    limit?: Nullable<number>;
    mapToModel?: Nullable<boolean>;
    nest?: Nullable<boolean>;
    offset?: Nullable<number>;
    paranoid?: Nullable<boolean>;
    plain?: Nullable<boolean>;
    raw?: Nullable<boolean>;
    skipLocked?: Nullable<boolean>;
    subQuery?: Nullable<boolean>;
    type?: Nullable<string>;
    useMaster?: Nullable<boolean>;
    where?: Nullable<VideoWhereClause>;
}

export interface VideoWhereClause {
    name?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country?: Nullable<string>;
    description?: Nullable<string>;
    trailerUrl?: Nullable<string>;
    url?: Nullable<string>;
    poster?: Nullable<string>;
    id?: Nullable<number[]>;
}

export interface CategoryFilter {
    order?: Nullable<string[][]>;
    attributes?: Nullable<FAttributeOptions>;
    include?: Nullable<IncludeModel[]>;
    group?: Nullable<string>;
    limit?: Nullable<number>;
    mapToModel?: Nullable<boolean>;
    nest?: Nullable<boolean>;
    offset?: Nullable<number>;
    paranoid?: Nullable<boolean>;
    plain?: Nullable<boolean>;
    raw?: Nullable<boolean>;
    skipLocked?: Nullable<boolean>;
    subQuery?: Nullable<boolean>;
    type?: Nullable<string>;
    useMaster?: Nullable<boolean>;
    where?: Nullable<CategoryWherClause>;
}

export interface CategoryWherClause {
    id?: Nullable<number[]>;
}

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

export interface CreateVideoDto {
    name: string;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
    categories: number[];
    tags: number[];
    description: string;
    trailerUrl: string;
}

export interface UpdateVideoInput {
    name?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country?: Nullable<string>;
    description?: Nullable<string>;
    trailerUrl?: Nullable<string>;
    url?: Nullable<string>;
    poster?: Nullable<string>;
    id?: Nullable<number>;
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

export interface InitMultiPartDto {
    filename: string;
    fileExt: string;
}

export interface MultiPartPreSignedUrlDto {
    parts: number;
    videoId: number;
    fileKey: string;
    fileId: string;
}

export interface MapMultiPartFinalDto {
    videoId: number;
    fileKey: string;
    fileId: string;
    parts: MultiPartFinal[];
    fieldType: string;
}

export interface MultiPartFinal {
    PartNumber: number;
    ETag: string;
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
    fullname: string;
    email: string;
    address?: Nullable<string>;
    phone?: Nullable<string>;
    role: RoleEntity;
    roleId: number;
    createdAt: DateTime;
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export interface TagEntity {
    id: number;
    name: string;
}

export interface VideoEntity {
    id: number;
    name: string;
    url?: Nullable<string>;
    trailerUrl?: Nullable<string>;
    language?: Nullable<string>;
    view?: Nullable<number>;
    country: string;
    tags: TagEntity[];
    categories: CategoryEntity[];
    description: string;
    poster?: Nullable<string>;
}

export interface CategoryEntity {
    id: number;
    name: string;
    videos: VideoEntity[];
}

export interface InitMultiPartEntity {
    fileId: string;
    fileKey: string;
}

export interface MapProcessingMultiPart {
    PartNumber: number;
    signedUrl: string;
}

export interface IProcessingMultipartUploadEntity {
    parts: MapProcessingMultiPart[];
}

export interface ObjectMessage {
    statusCode?: Nullable<number>;
    message: string;
}

export interface IQuery {
    findAllUser(userFilter?: Nullable<UserFilter>): Nullable<UserEntity[]> | Promise<Nullable<UserEntity[]>>;
    findOneUser(id: number): Nullable<UserEntity> | Promise<Nullable<UserEntity>>;
    role(id: number): RoleEntity | Promise<RoleEntity>;
    findAllVideo(videoFilter?: Nullable<VideoFilter>): Nullable<VideoEntity[]> | Promise<Nullable<VideoEntity[]>>;
    findOneVideo(id: number): Nullable<VideoEntity> | Promise<Nullable<VideoEntity>>;
    findAllVideoByCategory(categoryId: number): VideoEntity[] | Promise<VideoEntity[]>;
    findAllTag(): Nullable<TagEntity[]> | Promise<Nullable<TagEntity[]>>;
    findOneTag(id: number): Nullable<TagEntity> | Promise<Nullable<TagEntity>>;
    findAllCategory(categoryFilter?: Nullable<CategoryFilter>): Nullable<CategoryEntity[]> | Promise<Nullable<CategoryEntity[]>>;
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
    createVideo(createVideoDto: CreateVideoDto): VideoEntity | Promise<VideoEntity>;
    updateVideo(updateVideoInput: UpdateVideoInput): VideoEntity | Promise<VideoEntity>;
    removeVideo(id: number): VideoEntity | Promise<VideoEntity>;
    createTag(createTagInput: CreateTagInput): TagEntity | Promise<TagEntity>;
    updateTag(updateTagInput: UpdateTagInput): TagEntity | Promise<TagEntity>;
    removeTag(id: number): TagEntity | Promise<TagEntity>;
    createCategory(createCategoryInput: CreateCategoryInput): CategoryEntity | Promise<CategoryEntity>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): CategoryEntity | Promise<CategoryEntity>;
    removeCategory(id: number): CategoryEntity | Promise<CategoryEntity>;
    initializeMultipartUpload(initMultiPartDto: InitMultiPartDto): InitMultiPartEntity | Promise<InitMultiPartEntity>;
    getMultipartPreSignedUrls(multiPartPreSignedUrlDto: MultiPartPreSignedUrlDto): IProcessingMultipartUploadEntity | Promise<IProcessingMultipartUploadEntity>;
    finalizeMultipartUpload(mapMultiPartFinalDto: MapMultiPartFinalDto): Nullable<Void> | Promise<Nullable<Void>>;
    login(loginInput: LoginInput): UserEntity | Promise<UserEntity>;
    logout(): ObjectMessage | Promise<ObjectMessage>;
}

export type DateTime = any;
export type JSON = any;
export type Void = any;
type Nullable<T> = T | null;
