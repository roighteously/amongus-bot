module.exports = (bot, prefix) => {
	bot.addBoolSetting = (settingName) => {
		bot[settingName] = false;
	}
	bot.addArray = (settingName) => {
		bot[settingName] = [];
	}
	bot._oc = bot.chat;
	bot.addArray('_cq')
	bot.addArray('_ps')
	bot.prefix = prefix;
	bot.c = (...message) => bot._cq.push(message.join(' '))
	bot.ps = (s, p=2) => {
		bot.c('/stopsound @a')
		bot.c('/playsound '+s+' master @a ~ ~ ~ 999999999 '+p)
	}
	
	bot.on('spawn', () => {
		setInterval(() => {
			if (!bot._cq.at(0)) return;
			bot.chat(bot._cq[0].toString());
			bot._cq.shift();
		},150)
	})

	bot.on('chat', (user, message) => {
		if(message.startsWith(bot.prefix)) {
			let type = message.split(' ')[1];
			let args = message.split(' ');
			args.shift();
			args.shift(); // Get only the args
			bot.emit('command', {user, message, type, args})
		}
	})
	return bot;
}