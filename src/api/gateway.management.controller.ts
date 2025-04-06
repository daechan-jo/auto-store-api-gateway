import {
  ActiveJobResDto,
  CompletedJobResDto,
  DelayedJobResDto,
  FailedJobResDto,
  JobStatusCountResDto,
  JobStatusResDto,
  ResponseDto,
  WaitingJobResDto,
} from '@daechanjo/models';
import { RabbitMQService } from '@daechanjo/rabbitmq';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Management')
@Controller('/managements')
export class GatewayManagementController {
  constructor(private readonly rabbitmqService: RabbitMQService) {}
  // BaseResponseDto<BaseJobData>
  @Get('queues/status')
  @ApiOperation({
    summary: 'onch queue status count 조회',
    description: '현재 큐의 전체 상태 카운트를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '큐 상태 카운트 정보',
    type: ResponseDto<JobStatusCountResDto>,
  })
  async getStatus() {
    return await this.rabbitmqService.send('onch-queue', 'getStatus', {});
  }

  @Get('queues/waiting')
  @ApiOperation({
    summary: '대기 중인 작업 목록',
    description: '현재 대기 중인 작업 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '대기 중인 작업 목록',
    type: ResponseDto<WaitingJobResDto>,
  })
  async getWaitingJobs() {
    return await this.rabbitmqService.send('onch-queue', 'getWaitingJobs', {});
  }

  @Get('queues/active')
  @ApiOperation({
    summary: '실행 중인 작업 목록',
    description: '현재 실행 중인 작업 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '실행 중인 작업 목록',
    type: ResponseDto<ActiveJobResDto>,
  })
  async getActiveJobs() {
    return await this.rabbitmqService.send('onch-queue', 'getActiveJobs', {});
  }

  @Get('queues/completed')
  @ApiOperation({
    summary: '완료된 작업 목록',
    description: '최근 완료된 작업 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '완료된 작업 목록',
    type: ResponseDto<CompletedJobResDto>,
  })
  async getCompletedJobs() {
    return await this.rabbitmqService.send('onch-queue', 'getCompletedJobs', {});
  }

  @Get('queues/failed')
  @ApiOperation({
    summary: '실패한 작업 목록',
    description: '실패한 작업 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '실패한 작업 목록',
    type: ResponseDto<FailedJobResDto>,
  })
  async getFailedJobs() {
    return await this.rabbitmqService.send('onch-queue', 'getFailedJobs', {});
  }

  @Get('queues/delayed')
  @ApiOperation({
    summary: '지연된 작업 목록',
    description: '지연 실행 예정인 작업 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '지연된 작업 목록',
    type: ResponseDto<DelayedJobResDto>,
  })
  async getDelayedJobs() {
    return await this.rabbitmqService.send('onch-queue', 'getDelayedJobs', {});
  }

  @Get('queues/all')
  @ApiOperation({
    summary: '모든 작업 상태 조회',
    description: '모든 상태의 작업 목록을 한 번에 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 상태의 작업 목록',
    type: ResponseDto<JobStatusResDto>,
  })
  async getAllJobs() {
    return await this.rabbitmqService.send('onch-queue', 'getAllJobs', {});
  }

  @Delete('queues/:jobId')
  @ApiOperation({
    summary: '작업 삭제',
    description: '특정 작업을 큐에서 삭제합니다.',
  })
  @ApiParam({
    name: 'jobId',
    description: '삭제할 작업의 ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: '작업 삭제 결과',
    type: ResponseDto,
  })
  async deleteJob(@Param('jobId') jobId: string) {
    return await this.rabbitmqService.send('onch-queue', 'deleteJob', { data: jobId });
  }
}
