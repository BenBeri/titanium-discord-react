import {Controller, Get, Req, Res} from '@nestjs/common';
import {DiscordService} from "../services/discord.service";

@Controller('discord')
export class DiscordController {

    constructor(private discordService: DiscordService){}

    @Get('login')
    public login(@Res() res) {
        const baseUrl = 'https://discordapp.com/api/oauth2/authorize?client_id=';
        res.redirect(`${baseUrl}${process.env.DISCORD_CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${process.env.DISCORD_REDIRECT_URL}`);
    }

    @Get('logout')
    public logout(@Req() req, @Res() res) {
        res.clearCookie('discord_token');
        res.redirect('/');
    }

    @Get('callback')
    public async callback(@Res() res, @Req() req) {
        if (!req.query.code) {
            throw new Error('Code was not provided from the auth');
        }

        const code = req.query.code;
        const response = await this.discordService.getToken(code);
        res.cookie('discord_token', response.access_token, {httpOnly: false});
        res.redirect('/');
    }
}
