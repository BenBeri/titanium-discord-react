import { Injectable, NestMiddleware } from '@nestjs/common';
import {DiscordService} from "../services/discord.service";

@Injectable()
export class DiscordMiddleware implements NestMiddleware {

  constructor(private discordService: DiscordService) {}

  async use(req: any, res: any, next: () => void) {
    if (req.cookies.discord_token) {
      const data = await this.discordService.getUser(req.cookies.discord_token);
      if (data) {
        req.discordUser = data;
      }
    }
    console.log('here');
    next();
  }
}
