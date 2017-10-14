const fs = require('fs');
const { join } = require('path');

function save($data) {
	fs.writeFile(join(__dirname, 'db.json'), JSON.stringify($data), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

module.exports = $Socket => {
	const $data = require('./db.json');
	let $______db______$ =  $data ? $data : [];
	return $Socket.on('connection', _Socket => {
		_Socket.on('gets', (cb) => {
			fs.readdir(join(__dirname, 'public', 'uploads'), function(err, files) {
				cb($______db______$, files)
			})
		});
		_Socket.on('add', ______________________________ => {
			Object.assign(______________________________, {
				createdAt: Date.now(),
				updatedAt: Date.now()
			});
			$______db______$.unshift(______________________________);
			$Socket.emit('add', ______________________________);
			save($______db______$);
		});
		_Socket.on('update', ______________________________ => {
			Object.keys($______db______$).map($key => {
				if ( ______________________________.createdAt === $______db______$[$key].createdAt ) {
					Object.assign($______db______$[$key], {
						Category: ______________________________.Category,
						updatedAt: Date.now()
					});
				}
			});
			$Socket.emit('update', ______________________________);
			save($______db______$);
		});
		_Socket.on('delete', createdAt => {
			$______db______$ = $______db______$.filter($______________________________ => {
				return $______________________________.createdAt !== createdAt;
			});
			$Socket.emit('delete', createdAt);
			save($______db______$);
		});
	});
};