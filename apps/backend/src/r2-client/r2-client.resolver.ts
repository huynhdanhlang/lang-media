import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from '../authentication/interface/graphqlContext.interface';
import {
  IProcessingMultipartUploadEntity,
  InitMultiPartEntity,
} from './entities/r2-client.entity';
import { R2ClientService } from './r2-client.service';
import { UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guard/jwt.guard';
import {
  InitMultiPartDto,
  MapMultiPartFinalDto,
  MultiPartPreSignedUrlDto,
} from './dto/multipart.input';
import { Void } from '../utils/graphql';

@Resolver('r2-client')
export class R2ClientResolver {
  constructor(private readonly r2ClientService: R2ClientService) {}

  @Mutation(() => InitMultiPartEntity)
  @UseGuards(new JwtAuthenticationGuard('initMultiPartDto'))
  async initializeMultipartUpload(
    @Args('initMultiPartDto', {
      nullable: false,
    })
    initMultiPartDto: InitMultiPartDto,
    @Context() ctx: GraphQLContext
  ) {
    const { res } = ctx;
    console.log(initMultiPartDto);
    const { fileExt, filename } = initMultiPartDto;
    const result = await this.r2ClientService.initializeMultipartUpload(
      filename,
      fileExt
    );
    res.send(result);
  }

  @Mutation(() => IProcessingMultipartUploadEntity)
  @UseGuards(new JwtAuthenticationGuard('multiPartPreSignedUrlDto'))
  async getMultipartPreSignedUrls(
    @Args('multiPartPreSignedUrlDto', {
      nullable: false,
    })
    multiPartPreSignedUrlDto: MultiPartPreSignedUrlDto,
    @Context() ctx: GraphQLContext
  ) {
    const { res } = ctx;
    const result = await this.r2ClientService.getMultipartPreSignedUrls(
      multiPartPreSignedUrlDto
    );
    res.send(result);
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(new JwtAuthenticationGuard('mapMultiPartFinalDto'))
  async finalizeMultipartUpload(
    @Args('mapMultiPartFinalDto', {
      nullable: false,
    })
    mapMultiPartFinalDto: MapMultiPartFinalDto,
    @Context() ctx: GraphQLContext
  ) {
    const { res } = ctx;
    await this.r2ClientService.finalizeMultipartUpload(mapMultiPartFinalDto);
    res.send();
  }
}
