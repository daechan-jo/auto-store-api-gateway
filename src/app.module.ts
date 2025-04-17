import { PlaywrightModule } from '@daechanjo/playwright';
import { RabbitMQModule } from '@daechanjo/rabbitmq';
import { UtilModule } from '@daechanjo/util';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GatewayManagementController } from './api/gateway.management.controller';
import { GatewayRegisterController } from './api/gateway.register.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV !== 'PROD'
          ? '/Users/daechanjo/codes/project/auto-store/.env'
          : undefined,
    }),
    UtilModule,
    PlaywrightModule,
    RabbitMQModule,
  ],
  controllers: [GatewayRegisterController, GatewayManagementController],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    setTimeout(async () => {}, 100);
  }
}
