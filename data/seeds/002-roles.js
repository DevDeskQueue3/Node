exports.seed = function (knex) {
	return knex('roles')
		.truncate()
		.then(function () {
			return knex('roles').insert([
				{
					userID: 1,
					role: 'STUDENT',
				},
				{
					userID: 2,
					role: 'STUDENT',
				},

				{
					userID: 3,
					role: 'STUDENT',
				},
				{
					userID: 4,
					role: 'STUDENT',
				},
			]);
		});
};
