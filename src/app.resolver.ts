import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { SkipAuth } from './common/decorators/skip-auth.decorator';
import { MailService } from './mail/mail.service';

@Resolver()
export class AppResolver {
    constructor(
        private readonly appService: AppService,
        private readonly mailService: MailService,
    ) {}

    @SkipAuth()
    @Query(() => String)
    async getHello() {
        return this.appService.getHello();
    }
}
