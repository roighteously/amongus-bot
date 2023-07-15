module.exports = (bot, prefix) => {
	bot.addBoolSetting = (settingName) => {
		bot[settingName] = false;
	}
	bot.addArray = (settingName) => {
		bot[settingName] = [];
	}
	bot.runcmd = (cmd) => {
		bot._client.write('update_command_block', { location: { x: bot._between(Math.floor(bot.entity.position.x) + 1, Math.floor(bot.entity.position.x) - 15), y: 0, z: bot._between(Math.floor(bot.entity.position.z) + 1, Math.floor(bot.entity.position.z) - 15) }, command: cmd, mode: 1, flags: 0b100 });
	}
	bot._between = (min, max) => {
		return Math.floor(
			Math.random() * (max - min) + min
		)
	}
	bot._oc = bot.chat;
	bot.addArray('_cq')
	bot.addArray('_ps')
	bot.prefix = prefix;
	bot.c = (...message) => bot._cq.push(message.join(' '))
	bot.ps = (s, p=2) => {
		bot.runcmd('/stopsound @a')
		bot.runcmd('/playsound '+s+' master @a ~ ~ ~ 999999999 '+p)
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