import mongoose from 'mongoose';

// Define the updated schema
const lectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: { type: String, required: true },
  about_me: { type: String, required: true },
  linkedin: { type: String, required: true },
  area: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  tags: { type: [String], required: true }
});

let Lecture;
try {
  // Try to retrieve the existing model if it has already been compiled
  Lecture = mongoose.model('Lecture');

  // Update the existing documents in the collection
//   Lecture.updateMany({}, { $set: { phone: '' } }, { strict: false })
//     .then(() => {
//       console.log('Updated existing documents with the new email field');
//     })
//     .catch((error) => {
//       console.error('Error updating existing documents:', error);
//     });
} catch (error) {
  // If the model doesn't exist, compile and export it
  Lecture = mongoose.model('Lecture', lectureSchema);
}

export default Lecture;