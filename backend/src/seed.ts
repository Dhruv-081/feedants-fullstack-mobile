import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Competition from './models/Competition';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedants';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await Competition.deleteMany({});

    const competitionId = new mongoose.Types.ObjectId('66f0a6d0c9f8a3c0b0a0a0a0');

    await Competition.create({
      _id: competitionId,
      title: 'Feedants Classical Dance',
      tags: ['Dance', 'Multi-Win'],
      winnersCertificateNote: 'Winners get certificate',
      prizePool: 1500,
      entryFee: 99,
      totalSpots: 20,
      bookedSpots: 1,
      judge: {
        name: 'Manju Dubey',
        role: 'Professional Kathak Dancer',
        experience: '12+ Years of Experience',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
        introVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      },
      lifecycle: {
        registrationDeadline: new Date(Date.now() + 86400000 * 2), // 2 days from now
        submissionStart: new Date(Date.now() - 86400000),
        submissionEnd: new Date(Date.now() + 86400000 * 5),
        resultDate: new Date(Date.now() + 86400000 * 7),
      },
      tabs: {
        aboutText: 'Welcome to Feedants Classical Dance Competition! This premier online event invites Kathak, Bharatanatyam, and Odissi enthusiasts from across the globe. Whether you are a seasoned professional or an emerging talent, this platform is designed to showcase your grace, precision, and dedication to traditional arts. Participants are judged on technique, expression, and overall stage presence.',
        judgingParametersText: '1. Technical Precision: Accuracy of movements, footwork (tatkar/adavu), and posture.\n2. Expression (Abhinaya): Ability to convey emotions through facial expressions and mudras.\n3. Rhythm (Laya): Mastery over speed, time signatures, and rhythmic patterns.\n4. Traditional Authenticity: Adherence to the core tenets of the chosen dance form.\n5. Overall Impact: Grace, costume, music choice, and stage presence.',
        rulesAndEligibilityText: '1. Eligibility: Open to all ages and nationalities.\n2. Submission: Video must be a single, unedited shot from a fixed angle.\n3. Duration: Performance must be between 2 and 4 minutes.\n4. Attire: Traditional dance attire relevant to the chosen style is mandatory.\n5. Music: High-quality audio is required; please ensure the beat is clear.\n6. Integrity: Any manipulation of the video or audio will result in immediate disqualification.',
      },
      rewards: [
        { position: '1st Winner', rewardAmount: 550 },
        { position: '2nd Winner', rewardAmount: 300 },
        { position: '3rd Winner', rewardAmount: 240 },
        { position: '4th Winner', rewardAmount: 200 },
        { position: '5th Winner', rewardAmount: 130 },
        { position: '6th Winner', rewardAmount: 80 },
      ],
      previousWinners: [
        { name: 'Riya Shah', position: '1st Winner', videoThumbnail: 'https://via.placeholder.com/150', videoUrl: '#' },
      ],
      status: 'ongoing',
    });

    console.log('Seeded successfully with enhanced descriptions!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
