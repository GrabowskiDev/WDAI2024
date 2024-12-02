require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');

app.use(express.json());

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.db',
});

// Book model
const Book = sequelize.define(
	'Book',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		publishedYear: {
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
		const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
		req.userId = decoded.id;
		req.email = decoded.email;
		next();
	} catch (error) {
		res.status(401).json('Invalid token');
	}
}

//Get all books
app.get('/api/books', async (req, res) => {
	try {
		const books = await Book.findAll();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

//Get book by id
app.get('/api/books/:id', async (req, res) => {
	try {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			res.status(200).json(book);
		} else {
			res.status(404).send('Book not found');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

//Add book
app.post('/api/books', verifyToken, async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json(book.id);
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

//Delete book
app.delete('/api/books/:id', verifyToken, async (req, res) => {
	try {
		const deleted = await Book.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (deleted) {
			res.status(200).send(req.params.id);
		} else {
			res.status(404).send('Book not found');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});
