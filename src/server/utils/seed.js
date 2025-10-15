import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Hospital from '../models/hospitalModel.js';
import Appointment from '../models/appointmentModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedDB = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await Hospital.deleteMany({});
    await Appointment.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = await User.insertMany([
      { email: 'john.doe@example.com', passwordHash: hashedPassword, role: 'user', profile: { name: 'John Doe' } },
      { email: 'jane.smith@example.com', passwordHash: hashedPassword, role: 'doctor', profile: { name: 'Jane Smith', license: '12345' } },
      { email: 'admin@hospital.com', passwordHash: hashedPassword, role: 'hospital_admin', profile: { name: 'Admin User' } },
      { email: 'super.admin@mindwave.com', passwordHash: hashedPassword, role: 'super_admin', profile: { name: 'Super Admin' } },
    ]);

    const hospital = await Hospital.create({
      name: 'City Hospital',
      address: '123 Main St',
      contact: '555-1234',
      adminId: users[2]._id,
    });

    await Appointment.insertMany([
      { patientId: users[0]._id, doctorId: users[1]._id, hospitalId: hospital._id, schedule: new Date('2025-11-15T10:00:00Z'), type: 'video' },
      { patientId: users[0]._id, doctorId: users[1]._id, hospitalId: hospital._id, schedule: new Date('2025-11-22T14:00:00Z'), type: 'in-person' },
    ]);

    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
