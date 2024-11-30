const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3001;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NotSoSecretKey123';

app.use(express.json());

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.db',
});

// User model
const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

sequelize.sync();

app.listen(PORT, () => {
	console.log(`it's alive on http://localhost:${PORT}`);
});

// Register
app.post('/api/register', async (req, res) => {
	try {
		hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			...req.body,
			password: hashedPassword,
		});
		res.status(201).json(user.id);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Login
app.post('/api/login', async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (user && isPasswordCorrect) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				SECRET_KEY,
				{ expiresIn: '1h' }
			);
			res.status(200).json(token);
		} else {
			res.status(401).send('Unauthorized');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});
