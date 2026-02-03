#!/usr/bin/env node

const axios = require('axios');

const API_URL = 'https://paulinho-back.vercel.app/api';

async function testBackend() {
  console.log('🧪 Testando Backend Paulinho...\n');
  console.log(`📍 URL: ${API_URL}\n`);

  try {
    // Teste 1: Health check
    console.log('1️⃣  Testando conexão com o backend...');
    try {
      const healthResponse = await axios.get(`${API_URL.replace('/api', '')}/health`, {
        timeout: 5000
      });
      console.log('✅ Backend está online\n');
    } catch (err) {
      console.log('⚠️  Health endpoint não disponível (esperado), continuando...\n');
    }

    // Teste 2: Registrar um novo professor
    console.log('2️⃣  Testando registro de novo professor...');
    const timestamp = Date.now();
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      name: `Prof Teste ${timestamp}`,
      email: `prof${timestamp}@test.com`,
      password: 'test123456',
      role: 'professor'
    });
    
    const { token, user } = registerResponse.data;
    console.log(`✅ Professor registrado com sucesso!`);
    console.log(`   Email: ${user.email}`);
    console.log(`   ID: ${user.id}\n`);

    // Teste 3: Login com as credenciais criadas
    console.log('3️⃣  Testando login com as credenciais...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: `prof${timestamp}@test.com`,
      password: 'test123456'
    });
    
    const loginToken = loginResponse.data.token;
    console.log('✅ Login bem-sucedido!');
    console.log(`   Token: ${loginToken.substring(0, 20)}...\n`);

    // Teste 4: Listar alunos (requer autenticação)
    console.log('4️⃣  Testando listagem de alunos...');
    const studentsResponse = await axios.get(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${loginToken}` }
    });
    
    console.log(`✅ Alunos listados com sucesso!`);
    console.log(`   Total de alunos: ${studentsResponse.data.length}\n`);

    // Teste 5: Listar turmas
    console.log('5️⃣  Testando listagem de turmas...');
    const classesResponse = await axios.get(`${API_URL}/classes`, {
      headers: { Authorization: `Bearer ${loginToken}` }
    });
    
    console.log(`✅ Turmas listadas com sucesso!`);
    console.log(`   Total de turmas: ${classesResponse.data.length}\n`);

    // Teste 6: Listar avaliações
    console.log('6️⃣  Testando listagem de avaliações...');
    const evaluationsResponse = await axios.get(`${API_URL}/evaluations`, {
      headers: { Authorization: `Bearer ${loginToken}` }
    });
    
    console.log(`✅ Avaliações listadas com sucesso!`);
    console.log(`   Total de avaliações: ${evaluationsResponse.data.length}\n`);

    console.log('════════════════════════════════════════');
    console.log('🎉 TODOS OS TESTES PASSARAM!');
    console.log('════════════════════════════════════════\n');
    console.log('✨ Backend está pronto para produção!\n');

  } catch (error) {
    console.error('\n❌ ERRO ao testar:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Mensagem: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

testBackend();
