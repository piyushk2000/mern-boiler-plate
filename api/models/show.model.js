import mongoose from 'mongoose';

// const showSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     coverPictureLink: {
//       type: String,
//     },
//     api_link: {
//       type: String,
//     },
//     type: {
//       type: String,
//       enum: ['TV Show', 'Anime', 'Movie'],
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     genre: {
//       type: String,
//     },
//     releaseDate: {
//       type: Date,
//     },
//     sequel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Show',
//     },
//     prequel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Show',
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   },
//   { timestamps: true }
// );

const userShowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
  },
  toWatch: {
    type: Boolean,
    default: false,
  },
  dropped: {
    type: Boolean,
    default: false,
  },
  watching: {
    type: Boolean,
    default: false,
  },
  episode: {
    type: Number,
    default: 0,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
});

// const Show = mongoose.model('Show', showSchema);
const UserShow = mongoose.model('UserShow', userShowSchema);

export { UserShow };
