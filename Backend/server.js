const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const examRoutes = require('./routes/examRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const resultRoutes = require('./routes/resultRoutes');





const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/analytics', analyticsRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
