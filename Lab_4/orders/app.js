const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3002;
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NotSoSecretKey123';

app.use(express.json());

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.db',
});

// Book model
const Order = sequelize.define(
	'Order',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		bookId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		count: {
			type: DataTypes.INTEGER,
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

function verifyToken(req, res, next) {
	const token = req.header('Authorization');
	if (!token)
		return res.status(403).json('A token is required for authentication');
	try {
		const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
		req.userId = decoded.id;
		req.email = decoded.email;
		next();
	} catch (error) {
		res.status(401).json('Invalid token');
	}
}

//Get all orders for a user
app.get('/api/orders/:id', verifyToken, async (req, res) => {
	try {
		const orders = await Order.findAll({
			where: {
				userId: req.params.id,
			},
		});
		if (orders.length > 0) {
			res.status(200).json(orders);
		} else {
			res.status(404).send('Orders not found');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Add order
app.post('/api/orders', verifyToken, async (req, res) => {
	try {
		const bookExists = await fetch(
			`http://localhost:3000/api/books/${req.body.bookId}`
		);
		if (bookExists.status === 404) {
			return res.status(404).send('Book not found');
		}

		const order = await Order.create({
			userId: req.userId,
			bookId: req.body.bookId,
			count: req.body.count,
		});
		res.status(201).json(order);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Delete order
app.delete('/api/orders/:id', verifyToken, async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.id);
		if (order) {
			if (order.userId !== req.userId) {
				return res.status(403).send('Order does not belong to user');
			}
			await order.destroy();
			res.status(200).send('Order deleted');
		} else {
			res.status(404).send('Order not found');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

// Patch order
app.patch('/api/orders/:id', verifyToken, async (req, res) => {
	try {
		const bookExists = await fetch(
			`http://localhost:3000/api/books/${req.body.bookId}`
		);
		if (bookExists.status === 404) {
			return res.status(404).send('Book not found');
		}

		const order = await Order.findByPk(req.params.id);
		if (order) {
			if (order.userId !== req.userId) {
				return res.status(403).send('Order does not belong to user');
			}
			await order.update({
				bookId: req.body.bookId,
				count: req.body.count,
			});
			res.status(200).json(order);
		} else {
			res.status(404).send('Order not found');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});
