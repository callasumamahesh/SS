import connectDb from '../../../lib/db';

export async function POST(req, res) {
  try {
    await connectDb(); // Establish the DB connection

  } catch (error) {

  }
}
