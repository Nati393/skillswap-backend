import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Conectado a MongoDB');

  const db = mongoose.connection.db!;
  const users = await db.collection('users').find({}).toArray();
  console.log(`Encontrados ${users.length} usuarios`);

  for (const user of users) {
    const alreadyHashed = user.password?.startsWith('$2b$');
    if (alreadyHashed) {
      console.log(`⏭ ${user.email} — ya tiene hash, se omite`);
      continue;
    }
    const hashed = await bcrypt.hash(user.password, 10);
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { password: hashed } }
    );
    console.log(`✓ ${user.email} — contraseña actualizada`);
  }

  console.log('Migración completa');
  await mongoose.disconnect();
}

migrate().catch(console.error);