import { CronJob } from 'cron';
import { envConfig } from '../env/development';

const CRON_INTERVAL: string = '*/10 * * * *';

/**
 * @export
 * @class Cron
 */
 export default class Cron {
    /**
     * @private
     * @static
     * @memberof Cron
     */

    private static cronJobInterval(): void {
        new CronJob(CRON_INTERVAL, (): void => {
            console.log(`Cronjob: hi i'm cron you can fix me.`)
        },
            null,
            true);

    }

    /**
     * @static
     * @memberof Cron
     */
    static init(): void {
        Cron.cronJobInterval();
    }


}

