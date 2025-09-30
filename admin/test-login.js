const bcrypt = require('bcryptjs');

async function testLogin() {
  const password = 'admin';
  const hash = '$2a$12$flkLE3r3klhUu.7.ItH1l.q0dwiCkmlNQQUl4pgoLFzV7SQp4e1Za';
  
  console.log('Testing password:', password);
  console.log('Testing hash:', hash);
  console.log('Hash length:', hash.length);
  
  const result = await bcrypt.compare(password, hash);
  console.log('Password match:', result);
  
  // Test creating new hash
  const newHash = await bcrypt.hash(password, 12);
  console.log('New hash:', newHash);
  
  const newResult = await bcrypt.compare(password, newHash);
  console.log('New hash match:', newResult);
}

testLogin().catch(console.error);
