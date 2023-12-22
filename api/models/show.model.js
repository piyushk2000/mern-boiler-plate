import mongoose from 'mongoose';

const showSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      coverPictureLink: {
        type: String,
      },

      api_link: {
        type: String,
      },
      type: {
        type: String,
        enum: ['TV Show', 'Anime', 'Movie'],
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
      },
      releaseDate: {
        type: Date,
      },
      sequel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
      },
      prequel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      
      timestamps: true,
    },
);

const Show = mongoose.model('Show', showSchema);

export default Show;
