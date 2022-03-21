import { Telegraf } from "telegraf";

const Telegraf = () => {

    const bot = new Telegraf('5255515716:AAHhYyT6t4wybQ-TWVLBEUQg67T6u-2dEeI');

    bot.start((ctx) => {
        ctx.reply('Welcome!')
    });

    bot.launch();

    return (
        <></>
    );
}
 
export default Telegraf;