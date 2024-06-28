const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB database");
});

// Define schemas and models

// Contact Form Schema
const contactFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    imageUrl: String,
    author: String,
    date: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// User Schema
const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    phone: String,
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Email Record Schema
const emailRecordSchema = new mongoose.Schema({
    email: String,
    date: { type: Date, default: Date.now }
});

const EmailRecord = mongoose.model('EmailRecord', emailRecordSchema);

// Define CRUD operations

// Function to fetch all entries from contact_form
const getAllContactFormEntries = (callback) => {
    ContactForm.find({}, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const addContactFormEntry = async(entryData) => {
    const newEntry = new ContactForm(entryData);
    return newEntry.save();
};

// Register a user
const addUser = async(userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
};

// Add a blog post
const addBlogPost = (title, category, content, imageUrl) => {
    const blogPost = new BlogPost({ title, category, content, imageUrl });
    return blogPost.save()
        .then(result => {
            return result; // Return the saved document if successful
        })
        .catch(err => {
            throw err; // Throw error if save operation fails
        });
};

const getAllBlogPosts = () => {
    return BlogPost.find() // Assuming BlogPost is your Mongoose model
        .then(posts => {
            return posts; // Return array of blog posts
        })
        .catch(err => {
            throw err; // Throw error if retrieval fails
        });
};


// Get a blog post by ID
const getBlogPostById = (id) => {
    return BlogPost.findById(id).exec(); // Return a promise using .exec() to ensure promise is returned
};

// Update a blog post
const updateBlogPost = (data, callback) => {
    const { id, title, content, author, imagePath } = data;
    BlogPost.findByIdAndUpdate(id, { title, content, author, imagePath }, { new: true }, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};


// Login a user
const loginUser = async(email, password) => {
    try {
        const user = await User.findOne({ email, password }).exec();
        return user; // Return the user object if found
    } catch (error) {
        throw error; // Throw an error if findOne fails
    }
};

// Add email record
const addEmailRecord = (emailData, callback) => {
    const newEmailRecord = new EmailRecord(emailData);
    newEmailRecord.save((err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result._id);
        }
    });
};

// Exporting functions
module.exports = {
    getAllContactFormEntries,
    addContactFormEntry,
    getAllBlogPosts,
    addBlogPost,
    getBlogPostById,
    updateBlogPost,
    addUser,
    loginUser,
    addEmailRecord,
};