const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3000;

app.use(express.json());

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.db',
});

// Import the Book model
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

//Get all books
app.get('/api/books', (req, res) => {
	Book.findAll()
		.then(books => {
			res.status(200).json(books);
		})
		.catch(err => {
			res.status(500).send('Internal Server Error');
		});
});

//Get book by id
app.get('/api/books/:id', (req, res) => {
	Book.findByPk(req.params.id)
		.then(book => {
			if (book) {
				res.status(200).json(book);
			} else {
				res.status(404).send('Book not found');
			}
		})
		.catch(error => {
			res.status(500).send('Internal Server Error');
		});
});

//Add book
app.post('/api/books', (req, res) => {
	Book.create(req.body)
		.then(book => {
			res.status(201).json(book);
		})
		.catch(error => {
			res.status(500).send('Internal Server Error');
		});
});

//Delete book
app.delete('/api/books/:id', (req, res) => {
	Book.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(deleted => {
			if (deleted) {
				res.status(200).json({ deleted: true });
			} else {
				res.status(404).send('Book not found');
			}
		})
		.catch(error => {
			res.status(500).send('Internal Server Error');
		});
});
