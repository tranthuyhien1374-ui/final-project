const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
// Load environment variables
dotenv.config();

cloudinary.config({
  cloud_name: 'dfpmnrfgs',
  api_key: '458557849972695',       
  api_secret: 'jgX1TtzyUZ2OWexvBRnAhUP14rM'
});

// Middleware
app.use(cors({
  origin: 'http://localhost:4200' // Cho phép frontend từ localhost:4200
}));
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to MongoDB');
    // Log tên database
    console.log('Database:', mongoose.connection.db.databaseName);
    // Log danh sách collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Định nghĩa schema và model cho Story
const storySchema = new mongoose.Schema({
  title: String,
  author: String,
  authorId: Number,
  status: String,
  image: String,
  genres: [String],
  views: Number,
  description: String,
  progress: String
});

// Chỉ định rõ tên collection là 'stories'
const Story = mongoose.model('Story', storySchema, 'stories');

// Định nghĩa schema và model cho Chapter
const chapterSchema = new mongoose.Schema({
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' }, // storyId là ObjectId
  chapterNumber: Number,
  title: String,
  content: String,
  date: String
});

// Chỉ định rõ tên collection là 'chapters'
const Chapter = mongoose.model('Chapter', chapterSchema, 'chapters');

// Định nghĩa schema và model cho Comment
const commentSchema = new mongoose.Schema({
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' }, // storyId là ObjectId
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', default: null }, // chapterId là ObjectId
  username: String,
  content: String,
  timestamp: String
});

// Chỉ định rõ tên collection là 'comments'
const Comment = mongoose.model('Comment', commentSchema, 'comments');

// Route: Lấy danh sách tất cả truyện
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    console.log('Fetched stories:', stories); // Log dữ liệu trả về
    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: 'No stories found' });
    }
    res.json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Route: Lọc truyện theo genres, status, progress
app.get('/api/stories/filter', async (req, res) => {
  try {
    const { genres, status, progress } = req.query;
    let query = {};
    let sort = {};

    if (genres) {
      query.genres = { $in: genres.split(',') };
    }

    if (status) {
      if (status === 'Mới nhất') {
        query.status = { $in: ['Mới nhất'] };
      } else if (status === 'Truyện hot') {
        query.status = 'Truyện hot';
        sort = { views: -1 };
      } else {
        query.status = status;
      }
    }

    if (progress) {
      if (progress === 'Đã hoàn thành') {
        query.progress = { $in: ['Đã hoàn thành'] };
      } else if (progress === 'Đang ra') {
        query.progress = { $in: ['Đang ra']};
      } else {
        query.status = progress;
      }
    }

    const stories = await Story.find(query).sort(sort);
    // console.log('Filtered stories:', stories);
    res.json(stories);
  } catch (err) {
    console.error('Error filtering stories:', err);
    res.status(500).json({ error: 'Failed to filter stories' });
  }
});

// Route: Lấy thông tin chi tiết của một truyện
app.get('/api/stories/:id', async (req, res) => {
  try {
    const storyId = new mongoose.Types.ObjectId(req.params.id); // Chuyển id thành ObjectId
    const story = await Story.findById(storyId);
    // console.log('Requested storyId:', storyId); // Log storyId
    // console.log('Fetched story:', story); // Log dữ liệu trả về
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const chapters = await Chapter.find({ storyId: storyId }).sort({ chapterNumber: 1 });
    console.log('Fetched chapters:', chapters);

    const storyWithChapters = {
      _id: story._id,
      title: story.title,
      author: story.author,
      authorId: story.authorId,
      status: story.status,
      image: story.image,
      genres: story.genres,
      views: story.views,
      description: story.description,
      progress: story.progress,
      chapters: chapters.map(ch => ({
        _id: ch._id,
        chapterNumber: ch.chapterNumber,
        title: ch.title,
        date: ch.date
      }))
    };

    res.json(storyWithChapters);
  } catch (err) {
    console.error('Error fetching story:', err);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// Route: Lấy thông tin một chương của truyện
app.get('/api/stories/:storyId/chapters/:chapterNumber', async (req, res) => {
  try {
    // Kiểm tra xem truyện có tồn tại không
    let storyId;
    try {
      storyId = new mongoose.Types.ObjectId(req.params.storyId); // Chuyển storyId thành ObjectId
    } catch (err) {
      return res.status(400).json({ error: 'Invalid storyId format' });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Log tất cả chapters để kiểm tra
    const allChapters = await Chapter.find({ storyId: storyId });
    console.log('All chapters for storyId:', allChapters);

    // Tìm chương trong collection chapters
    const chapterNumber = parseInt(req.params.chapterNumber); // Parse chapterNumber thành số
    console.log('Fetching chapter for storyId:', storyId, 'chapterNumber:', chapterNumber);
    const chapter = await Chapter.findOne({
      storyId: storyId, // Sử dụng ObjectId
      $or: [
        { chapterNumber: chapterNumber }, // So sánh với số
        { chapterNumber: req.params.chapterNumber.toString() } // So sánh với chuỗi
      ]
    });

    // console.log('Requested storyId:', storyId); // Log storyId
    // console.log('Requested chapterNumber:', chapterNumber); // Log chapterNumber
    console.log('Query:', {
      storyId: storyId,
      $or: [
        { chapterNumber: chapterNumber },
        { chapterNumber: req.params.chapterNumber.toString() }
      ]
    }); // Log truy vấn
    console.log('Fetched chapter:', chapter); // Log dữ liệu trả về

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    res.json(chapter);
  } catch (err) {
    console.error('Error fetching chapter:', err);
    res.status(500).json({ error: 'Failed to fetch chapter' });
  }
});

// Route: Lấy danh sách bình luận của một truyện
app.get('/api/stories/:storyId/comments', async (req, res) => {
  try {
    let storyId;
    try {
      storyId = new mongoose.Types.ObjectId(req.params.storyId); // Chuyển storyId thành ObjectId
    } catch (err) {
      return res.status(400).json({ error: 'Invalid storyId format' });
    }

    const comments = await Comment.find({ storyId: storyId, chapterId: null });
    console.log('Requested storyId:', storyId); // Log storyId
    console.log('Fetched story comments:', comments); // Log dữ liệu trả về
    res.json(comments);
  } catch (err) {
    console.error('Error fetching story comments:', err);
    res.status(500).json({ error: 'Failed to fetch story comments' });
  }
});

// Route: Lấy danh sách bình luận của một chương
app.get('/api/stories/:storyId/chapters/:chapterId/comments', async (req, res) => {
  try {
    let storyId, chapterId;
    try {
      storyId = new mongoose.Types.ObjectId(req.params.storyId); // Chuyển storyId thành ObjectId
      chapterId = new mongoose.Types.ObjectId(req.params.chapterId); // Chuyển chapterId thành ObjectId
    } catch (err) {
      return res.status(400).json({ error: 'Invalid storyId or chapterId format' });
    }

    const comments = await Comment.find({ storyId: storyId, chapterId: chapterId });
    console.log('Requested storyId:', storyId); // Log storyId
    console.log('Requested chapterId:', chapterId); // Log chapterId
    console.log('Fetched chapter comments:', comments); // Log dữ liệu trả về
    res.json(comments);
  } catch (err) {
    console.error('Error fetching chapter comments:', err);
    res.status(500).json({ error: 'Failed to fetch chapter comments' });
  }
});



// Route: Thêm một bình luận mới
app.post('/api/comments', async (req, res) => {
  try {
    const commentData = req.body;
    let storyId, chapterId;
    try {
      storyId = new mongoose.Types.ObjectId(commentData.storyId); // Chuyển storyId thành ObjectId
      chapterId = commentData.chapterId ? new mongoose.Types.ObjectId(commentData.chapterId) : null; // Chuyển chapterId thành ObjectId nếu có
    } catch (err) {
      return res.status(400).json({ error: 'Invalid storyId or chapterId format' });
    }

    const newComment = new Comment({
      storyId: storyId,
      chapterId: chapterId,
      username: commentData.username,
      content: commentData.content,
      timestamp: commentData.timestamp
    });
    const savedComment = await newComment.save();
    console.log('Saved comment:', savedComment); // Log dữ liệu trả về
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});