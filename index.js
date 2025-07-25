const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');

const db = require("./db/db.js"); // Adjust the path as per your directory structure
const secretKey = process.env.SECRETE_KEY;
// const port = process.env.PORT;


const corsOptions = {
    origin: '*', // Allow all origins for demo purposes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies and other credentials
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Blog APIs
app.post('/api/addblog', async(req, res) => {
    const { title, category, content, imageUrl } = req.body;
    // Check if all required fields are provided
    if (!title || !category || !content) {
        return res.status(400).json({ error: 'Title, category, and content are required' });
    }

    try {
        const result = await db.addBlogPost(title, category, content, imageUrl);
        res.status(200).json({ message: 'Blog created successfully', post: result });
    } catch (err) {
        console.error('Error inserting blog post:', err);
        res.status(500).json({ error: 'Error inserting blog post' });
    }
});

// get all blogposts
app.get('/api/getblogs', async(req, res) => {
    try {
        const blogPosts = await db.getAllBlogPosts();
        res.status(200).json(blogPosts);
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        res.status(500).json({ error: 'Error fetching blog posts' });
    }
});

// get blogpost with id
app.get('/api/blog/:id', async(req, res) => {
    const blogId = req.params.id;
    try {
        const blogPost = await db.getBlogPostById(blogId);
        if (!blogPost) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.status(200).json(blogPost);
        }
    } catch (err) {
        console.error('Error retrieving blog post:', err);
        res.status(500).json({ error: 'Error retrieving blog post' });
    }
});

app.put("/api/updateBlog/:id", (req, res) => {
    const data = {
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        imagePath: req.body.imagePath
    };

    db.updateBlogPost(data, (err, result) => {
        if (err) {
            console.error("Error updating blog post:", err);
            res.status(500).send("Error updating blog post");
        } else {
            res.status(200).send("Blog post updated successfully");
        }
    });
});

app.delete("/api/deleteBlog/:id", (req, res) => {
    const blogId = req.params.id;

    db.deleteBlogPost(blogId, (err, result) => {
        if (err) {
            console.error("Error deleting blog post:", err);
            res.status(500).send("Error deleting blog post");
        } else {
            res.status(200).send("Blog post deleted successfully");
        }
    });
});


// infographics
app.post('/api/addinfographics', async(req, res) => {
    const { title, category, content, imageUrl } = req.body;
    // Check if all required fields are provided
    if (!title || !category || !content) {
        return res.status(400).json({ error: 'Title, category, and content are required' });
    }

    try {
        const result = await db.addInfographics(title, category, content, imageUrl);
        res.status(200).json({ message: 'Infographics created successfully', post: result });
    } catch (err) {
        console.error('Error inserting infographics post:', err);
        res.status(500).json({ error: 'Error inserting infographics post' });
    }
});

// get all infographics
app.get('/api/getinfographics', async(req, res) => {
    try {
        const blogPosts = await db.getAllInfographics();
        res.status(200).json(blogPosts);
    } catch (err) {
        console.error('Error fetching infographics posts:', err);
        res.status(500).json({ error: 'Error fetching infographics posts' });
    }
});

// get blogpost with id
app.get('/api/infographics/:id', async(req, res) => {
    const blogId = req.params.id;
    try {
        const blogPost = await db.getInfographicsById(blogId);
        if (!blogPost) {
            res.status(404).json({ error: 'Infographics not found' });
        } else {
            res.status(200).json(blogPost);
        }
    } catch (err) {
        console.error('Error retrieving infographics:', err);
        res.status(500).json({ error: 'Error retrieving infographics' });
    }
});

app.put("/api/updateBlog/:id", (req, res) => {
    const data = {
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        imagePath: req.body.imagePath
    };

    db.updateinfographics(data, (err, result) => {
        if (err) {
            console.error("Error updating blog post:", err);
            res.status(500).send("Error updating blog post");
        } else {
            res.status(200).send("Blog post updated successfully");
        }
    });
});

// app.delete("/api/deleteinfographics/:id", (req, res) => {
//     const blogId = req.params.id;

//     db.deleteBlogPost(blogId, (err, result) => {
//         if (err) {
//             console.error("Error deleting infographics:", err);
//             res.status(500).send("Error deleting infographics");
//         } else {
//             res.status(200).send("Infographics deleted successfully");
//         }
//     });
// });
// *****************************************************articles********************************************************

// infographics
app.post('/api/addarticles', async(req, res) => {
    const { title, category, content, imageUrl } = req.body;
    // Check if all required fields are provided
    if (!title || !category || !content) {
        return res.status(400).json({ error: 'Title, category, and content are required' });
    }

    try {
        const result = await db.addArticles(title, category, content, imageUrl);
        res.status(200).json({ message: 'Articles created successfully', post: result });
    } catch (err) {
        console.error('Error inserting articles post:', err);
        res.status(500).json({ error: 'Error inserting articles post' });
    }
});

// get all infographics
app.get('/api/getarticles', async(req, res) => {
    try {
        const blogPosts = await db.getAlladdArticles();
        res.status(200).json(blogPosts);
    } catch (err) {
        console.error('Error fetching articles posts:', err);
        res.status(500).json({ error: 'Error fetching articles posts' });
    }
});

// get blogpost with id
app.get('/api/articles/:id', async(req, res) => {
    const blogId = req.params.id;
    try {
        const blogPost = await db.getaddArticlesById(blogId);
        if (!blogPost) {
            res.status(404).json({ error: 'Articles not found' });
        } else {
            res.status(200).json(blogPost);
        }
    } catch (err) {
        console.error('Error retrieving articles:', err);
        res.status(500).json({ error: 'Error retrieving articles' });
    }
});

app.put("/api/updateArticles/:id", (req, res) => {
    const data = {
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        imagePath: req.body.imagePath
    };

    db.updateaddArticles(data, (err, result) => {
        if (err) {
            console.error("Error updating blog post:", err);
            res.status(500).send("Error updating blog post");
        } else {
            res.status(200).send("Articles updated successfully");
        }
    });
});

// **********************************************************************************************************************
// Contact APIs
app.get("/api/getContact", (req, res) => {
    db.getAllContactFormEntries((err, entries) => {
        if (err) {
            res.status(500).send("Error fetching contact form entries");
        } else {
            res.json(entries);
        }
    });
});

app.post('/api/postContact', async(req, res) => {
    try {
        const { name, email, phone, companyName, message, countryCode } = req.body;

        // Nodemailer Configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS // Your email password or app password
            }
        });

        // Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "amolspatil018@gmail.com", // Change this to your receiving email
            subject: `Proposal Request from ${name} - ${companyName}`,
            html: `
                <h3>Proposal Request from ${name} - ${companyName}</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});



app.put("/api/updateContact/:id", (req, res) => {
    const contactId = req.params.id;
    const data = req.body;

    db.updateContactFormEntry(contactId, data, (err, result) => {
        if (err) {
            res.status(500).send("Error updating contact entry");
        } else {
            res.status(200).send("Contact entry updated successfully");
        }
    });
});

app.delete("/api/deleteContact/:id", (req, res) => {
    const contactId = req.params.id;

    db.deleteContactFormEntry(contactId, (err, result) => {
        if (err) {
            res.status(500).send("Error deleting contact entry");
        } else {
            res.status(200).send("Contact entry deleted successfully");
        }
    });
});

// User APIs
app.post("/api/register", async(req, res) => {
    const { firstName, lastName, email, password, phone, role } = req.body;

    try {
        if (!firstName || !lastName || !email || !password || !phone || !role) {
            return res.status(400).send("All fields are required.");
        }

        const entryData = { firstName, lastName, email, password, phone, role };

        const newUser = await db.addUser(entryData);

        const token = jwt.sign({ email: newUser.email, name: `${newUser.firstName} ${newUser.lastName}` }, secretKey, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully.", token, name: `${newUser.firstName} ${newUser.lastName}` });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user.");
    }
});


app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`Login attempt with email: ${email}`); // Log the email for debugging

        const user = await db.loginUser(email, password);

        if (!user) {
            return res.status(401).json({ message: "User not found or incorrect credentials." });
        }

        const token = jwt.sign({ email: user.email, name: `${user.firstName} ${user.lastName}` }, secretKey, { expiresIn: "1h" });

        res.status(200).json({ message: "User logged in successfully.", token, name: `${user.firstName} ${user.lastName}` });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
});


app.put("/api/updateUser/:id", (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    db.updateUser(userId, data, (err, result) => {
        if (err) {
            res.status(500).send("Error updating user");
        } else {
            res.status(200).send("User updated successfully");
        }
    });
});

app.delete("/api/deleteUser/:id", (req, res) => {
    const userId = req.params.id;

    db.deleteUser(userId, (err, result) => {
        if (err) {
            res.status(500).send("Error deleting user");
        } else {
            res.status(200).send("User deleted successfully");
        }
    });
});

// Nodemailer APIs
app.post('/api/send-email', async(req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: "amolspatil018@gmail.com",
        subject: `New Signup from ${email}`,
        text: `You have a new signup with the email: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);

        db.addEmailRecord({ email }, (err, insertId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving email data to database');
                return;
            }
            console.log('Email data saved to database with ID:', insertId);
            res.redirect("thanks.html");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.post('/api/downloadmedia-kit', async(req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.MAIL_TO,
        subject: `Download Media-Kit PDF : ${email}`,
        text: `You have a new download the media-kit pdf with the email: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);

        db.addEmailRecord({ email }, (err, insertId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving email data to database');
                return;
            }
            setTimeout(() => {
                res.redirect("thanks.html");
            }, 0);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.post('/api/downloadcase-studies', async(req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.MAIL_TO,
        subject: `Download Case-Studies PDF : ${email}`,
        text: `You have a new download the case-studies pdf with the email: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);

        db.addEmailRecord({ email }, (err, insertId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving email data to database');
                return;
            }
            setTimeout(() => {
                res.redirect("thanks.html");
            }, 0);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.get('/', (req, res) => {
    res.send('Your server is runing on......')

})

app.listen(9000, () => {
    console.log(`Server is running on port 9000`)
});
