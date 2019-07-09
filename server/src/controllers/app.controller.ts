import {Controller, Get, Req, Res} from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {

  @Get('session')
  getHello(@Req() req, @Res() res) {
    if (req.discordUser) {
      res.json(req.discordUser);
    } else {
      res.status(401);
      res.send();
    }
  }
}
