import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  schedule: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'in-person'],
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  notes: {
    type: String,
  },
  videoLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
