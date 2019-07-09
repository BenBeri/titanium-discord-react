import {HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from '../controllers/app.controller';
import {AppService} from '../services/app.service';
import {DiscordController} from "../controllers/discord.controller";
import {DiscordService} from "../services/discord.service";
import {DiscordMiddleware} from "../middlewares/discord.middleware";

@Module({
  imports: [HttpModule],
  controllers: [AppController, DiscordController],
  providers: [AppService, DiscordService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(DiscordMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
