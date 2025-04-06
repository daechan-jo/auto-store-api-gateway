import { ProductRegistrationReqDto, ResponseDto } from '@daechanjo/models';
import { RabbitMQService } from '@daechanjo/rabbitmq';
import { UtilService } from '@daechanjo/util';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('/registers')
export class GatewayRegisterController {
  constructor(
    private readonly rabbitmqService: RabbitMQService,
    private readonly utilService: UtilService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '제품 등록 요청',
    description: '제품 등록 작업을 onch-queue에 추가합니다.',
  })
  @ApiBody({
    type: ProductRegistrationReqDto,
    description: '등록할 제품 정보',
  })
  @ApiResponse({
    status: 201,
    description: '작업이 큐에 성공적으로 추가됨',
    type: ResponseDto,
  })
  async productRegistration(@Body() data: ProductRegistrationReqDto) {
    await this.rabbitmqService.emit('register-queue', 'productRegistration', {
      jobId: '',
      jobType: '',
      data: data,
    });

    return {
      success: true,
    };
  }
}
