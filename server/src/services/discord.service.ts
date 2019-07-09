import {HttpService, Injectable} from '@nestjs/common';

const btoa = require('btoa');

@Injectable()
export class DiscordService {

    constructor(private http: HttpService){}

    async getToken(code: string) {
        const credentials = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_SECRET}`);
        const headers = {
            Authorization: `Basic ${credentials}`
        };

        const baseUrl = 'https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=';
        console.log(credentials);
        console.log(code);
        const url = `${baseUrl}${code}&redirect_uri=${process.env.DISCORD_REDIRECT_URL}`;

        console.log(url);
        const response = await this.http.post(url, {}, {headers}).toPromise();

        return response.data;
    }

    async getUser(token) {
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const response = await this.http.get(process.env.DISCORD_GET_USER_URL, {headers}).toPromise();
        return response.data;
    }
}
