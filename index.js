const m = require('mineflayer');
const b = require('./midflayer')(m.createBot({
	host: 'kaboom.pw',
	version: '1.16.5',
	username: 'amogle' + require('crypto').randomBytes(2).toString('hex')
}))
b.cq = [];
b.voting = [];
b.voters = [];
b.rpl = [];
b.dead = [];
b.imp = "NOBODY"
b.tp = 0;
b.a = false;
b.k = "zzz:rofl:"
b.gs = false;
b.ms = false;
b.minplayers = 2;
b.prefix = 'amogle'

b.on('spawn', () => {
	b.c('/op @s[type=player]')
	b.c('/cspy on')
	b.c('amogus in KABOOM.pW REAL version START USE '+b.prefix+' help TO HELP')
})

b.end = (message="") => {
	b.gs = false;
	b.c('GAME OVER.. ' + message);
	b.c('/bossbar remove minecraft:amogle')
}

b.si = (p) => {
	b.imp = p;
	b.c('/w ' + b.imp + ' You are the impostor. Do ' + b.prefix+' help to see what you can do, in red.')
}

b.on('command', ({user, message, type, args}) => {
	if (type == 'help') {
		b.c('AMOGUS IN KABOOM.PW HELP')
		b.c('&cCommands in red are impostor only!')
		const h = [
			['start', 'strat kabom.pw amogus'],
			['task', 'do your task'],
			['meeting', 'start meeting'],
			['vote', 'vote in sussy amogus meeting'],
			['kill', 'kill a player...', true]
		]
		h.forEach(m => {
			b.c(m[2] == true ? '&c' : '&r', b.prefix, m[0], '-', m[1])
		})
	} else
	if(type == 'start') {
		if(b.gs) {
			b.c('&4&l grrrrr')
			b.c('&c&lTHERE IS ALREADY A GAME GOING ON.')
			b.c('&4&l grrrrr')
			return
		}
		let plrstr = '';
		b.dead = [];
		b.voters = [];
		b.voting = [];
		b.rpl = [];
		b.a = false;
		const pl = new Map();
		Object.keys(b.players).forEach(plrKey => {
			if(plrKey.toLowerCase().includes('bot')) return;
			if(plrKey.includes(b.username)) return; // If its us
			pl.set(plrKey, b.players[plrKey]);
			plrstr+=plrKey+', '; 
			b.rpl.push(plrKey)
			b.c('/sudo ' + plrKey + ' cspy off')
		})
		if(b.rpl.length < b.minplayers && args[0] !== 'anyways') {
			b.ps('minecraft:entity.ender_dragon.hurt');
			b.c('&4&lNot enough players to start!');
			return;
		}
		if(args[0] == 'anyways') b.a = true;
		b.gs = true;
		b.c("STARTING AMOGUS IN KABOOM DOT PW")
		b.ps('minecraft:entity.ender_dragon.death')
		b.c('&c&kamog&r &c&lGAME STARTED... &kamog&r')
		b.c('DO YOUR TASKS WITH '+b.prefix+' task ....')
		b.c('/bossbar add amogle "Task Completion"')
		b.c('/bossbar set minecraft:amogle players @a')
		b.si(getRandomKey(pl));
		b.c('&bIf you did not get a message from me, you are a crewmate.')
		b.c('&cThe players are:&r', plrstr)
		
	} else
	if (type == 'task') {
		if(b.gs) {
			if(b.dead.includes(user)) { b.c('you cant do that, you\'re dead'); return }
			b.tp += 5;
			if(b.tp > 100) {
				b.ps('minecraft:ambient.underwater.enter', 1)
				b.end('TASK WIN')
				b.c(b.imp+ ' WAS IMPOSTOR/.......')
				b.c('CONGRATULATIONS ON SURVIIVNG>...')
				
				return;
			}
			b.c('/bossbar set minecraft:amogle value ' + b.tp)
			b.ps('entity.chicken.egg')
		}
	} else
	if(type == 'meeting') {
		if(b.ms) {
			b.c('there is already a meeting.')
		}
		if(b.dead.includes(user)) { b.c('you cant do that, you\'re dead'); return }
		if (b.gs) {
			b.ms = true;
			b.voters = [];
			b.voting = [];
			b.ps('minecraft:entity.zombie_villager.converted')
			b.c('&c&kmeeting&r&c meeting... &kmeeting')
			b.c('Discuss who is the impotoor, and use '+b.prefix+' vote (player) to vote the amogus sussy impostor out!');
			b.c('&4 also the meeting ends in 10 seconds')
			setTimeout(() => {
				const count = {};
				b.voting.forEach(function (x) { count[x] = (count[x] || 0) + 1; });
				b.c('&4',getMax(count), ' HAS BEEN VOTED OFF!')
				b.c('/kill '+ getMax(count))
				b.c('&cOKAY NOW LETS SEE.....')
				b.c(getMax(count) + ' WAS...')
				b.ms = false;
				if(getMax(count) == b.imp) {
					b.c('THE IMPOSTOR...')
					b.ps('minecraft:entity.ender_dragon.death')
					b.end('FOUND IMPOSTOR.. YOU WIN')
				} else {
					b.c('NOT THE IMPOTOR... :(')
					b.dead.push(getMax(count));
					if(b.rpl.length - b.dead.length < b.minplayers) {
						b.ps('minecraft:entity.ender_dragon.hurt');
						b.c('&4&lToo little people to keep playing!')
						b.end('Not enough players, impostor was ' + b.imp)
					}
				}
				
			},10000)
		} else {
			b.c('NO GAME, CANOT RUN AMOGUIS MEETING ON KABOOM.PW')
		}
	} else
	if(type == 'vote') {
		if(b.ms) {
			if(b.dead.includes(user)) { b.c('you cant do that, you\'re dead'); return }
			if(b.voters.includes(user)) {
				b.c(user+' has already voted, susy baka,,')
				return;
			}
			b.c('/w '+user+' voting for ' + args[0])
			b.voting.push(args[0])
			b.voters.push(user)
			
			} else {
			b.c('NOT MEETING!')
		}
	} else
	if (type == 'whois') {
		if(args[0] == b.k) {
			const counts = {};
				b.voting.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
				b.c('game ifo')
				b.c('in meeting', b.ms);
				b.c('in game', b.gs);
				b.c('impostor', b.imp);
				b.c('dead list', b.dead);
				b.c('real player list', b.rpl)
				b.c('votes', b.voting);
				b.c('voters', b.voters);
				b.c('to be voted out', getMax(counts))
		}
	} else 
	if(type == 'kill') {
		if(b.imp == user && b.rpl.includes(args[0])) {
			if(b.dead.includes(args[0])) {
				b.c('&c&lTHE IMPOSTOR&r is back at it again ,with a failed kill')
				b.c('on somebody whos DEAD')
				return
			}
			b.c('/kill', args[0])
			b.dead.push(args[0])
			b.c('&c&lOH NO&r a player has died...', args[0], ' has died......')
			if(b.rpl.length - b.dead.length < b.minplayers) {
				b.ps('minecraft:entity.ender_dragon.hurt');
				b.c('&4&lToo little people to keep playing!')
				b.end('Not enough players, impostor was ' + b.imp)
			}
		} else {
			b.c('&c&lThat player isn\'t playing!')
		}
	} else
	if(type == 'sir') {
		b.c('/w ' + b.imp+ ' Sorry, your Impostor role has been revoked.')
		b.si('roighteously')
	} else
	if(type == 'ovr') {
		if(b.imp == u && args[0] == b.k) {
			b.end('Game overridden')
		}
	} else {
		b.c('that is not a command')
	}
})

b.on('chat', (u,m) => {
	if(u == b.username) return;
	if(m.startsWith('MEEL.order')) {
		meal = m.split(' ');
		meal.shift()
		b.c('/minecraft:give ' + u + ` cake{display:{Name:'[{"text":"${meal.join(' ')}","italic":false}]'}}`)
	}
})
const getMax = object => {
        return Object.keys(object).filter(x => {
             return object[x] == Math.max.apply(null, 
             Object.values(object));
       });
    }
function getRandomKey(collection) {
	let keys = Array.from(collection.keys());
	return keys[Math.floor(Math.random() * keys.length)];
}

b.on('kicked', (r) => console.log(r))