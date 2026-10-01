const questions = [
    { text: 'Quando você tem um tempo livre, o que mais gosta de fazer?', options: [
        ['Criar, desenhar ou inventar coisas', 'criatividade'], ['Resolver problemas e descobrir como as coisas funcionam', 'logica'], ['Conversar, ajudar ou entender outras pessoas', 'pessoas'], ['Organizar planos, liderar ou colocar projetos em prática', 'gestao']
    ] },
    { text: 'Qual atividade na escola mais desperta sua curiosidade?', options: [
        ['Artes, literatura ou redação', 'criatividade'], ['Matemática, física ou tecnologia', 'logica'], ['Biologia, sociologia ou filosofia', 'pessoas'], ['História, geografia ou projetos', 'gestao']
    ] },
    { text: 'Em um trabalho em grupo, qual papel costuma assumir?', options: [
        ['A pessoa das ideias e da apresentação visual', 'criatividade'], ['Quem pesquisa e resolve a parte difícil', 'logica'], ['Quem escuta e mantém todo mundo unido', 'pessoas'], ['Quem divide as tarefas e cuida dos prazos', 'gestao']
    ] },
    { text: 'Que tipo de impacto você gostaria de causar?', options: [
        ['Inspirar pessoas através de histórias e experiências', 'criatividade'], ['Criar soluções para problemas do mundo', 'logica'], ['Melhorar diretamente a vida de alguém', 'pessoas'], ['Fazer iniciativas importantes acontecerem', 'gestao']
    ] },
    { text: 'Como você prefere aprender algo novo?', options: [
        ['Experimentando e colocando minha personalidade', 'criatividade'], ['Entendendo a lógica por trás', 'logica'], ['Trocando ideias com outras pessoas', 'pessoas'], ['Testando na prática e vendo resultados', 'gestao']
    ] },
    { text: 'Qual ambiente de trabalho parece mais interessante?', options: [
        ['Um estúdio, agência ou espaço cultural', 'criatividade'], ['Um laboratório, escritório de tecnologia ou oficina', 'logica'], ['Uma escola, clínica ou espaço de acolhimento', 'pessoas'], ['Uma empresa, evento ou projeto movimentado', 'gestao']
    ] },
    { text: 'O que mais combina com seu jeito de pensar?', options: [
        ['Imaginação e sensibilidade', 'criatividade'], ['Curiosidade e pensamento analítico', 'logica'], ['Empatia e comunicação', 'pessoas'], ['Iniciativa e visão estratégica', 'gestao']
    ] },
    { text: 'Se pudesse resolver um desafio hoje, qual escolheria?', options: [
        ['Dar uma cara nova a algo que já existe', 'criatividade'], ['Criar uma ferramenta mais inteligente', 'logica'], ['Ajudar alguém a superar uma dificuldade', 'pessoas'], ['Tirar uma grande ideia do papel', 'gestao']
    ] }
];

const careers = {
    criatividade: { name: 'Design e Comunicação', icon: '✦', area: 'perfil criativo', description: 'Você transforma ideias em experiências que conectam pessoas. Áreas como Design, Publicidade, Arquitetura, Produção audiovisual e Jornalismo podem combinar com seu olhar.' },
    logica: { name: 'Tecnologia e Inovação', icon: '⌘', area: 'perfil explorador', description: 'Você gosta de entender sistemas e encontrar soluções. Considere caminhos como Desenvolvimento de software, Engenharia, Ciência de dados, Segurança da informação e Pesquisa.' },
    pessoas: { name: 'Cuidado e Desenvolvimento', icon: '♡', area: 'perfil humano', description: 'Sua escuta e empatia podem transformar vidas. Psicologia, Medicina, Enfermagem, Educação, Serviço social e Fisioterapia são possibilidades para explorar.' },
    gestao: { name: 'Negócios e Liderança', icon: '↗', area: 'perfil realizador', description: 'Você tem energia para organizar, decidir e fazer acontecer. Administração, Empreendedorismo, Marketing, Direito, Economia e Gestão de projetos podem ser bons caminhos.' }
};

let currentQuestion = 0;
let answers = [];
const $ = (selector) => document.querySelector(selector);

function startQuiz() { currentQuestion = 0; answers = []; showPage('quiz-page'); renderQuestion(); }
function showPage(id) { document.querySelectorAll('.page').forEach(page => page.classList.remove('active')); $( '#' + id).classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function renderQuestion() {
    const question = questions[currentQuestion];
    const number = String(currentQuestion + 1).padStart(2, '0');
    $('#question-number').textContent = number;
    $('#progress-text').innerHTML = `pergunta ${number} <span>/ ${String(questions.length).padStart(2, '0')}</span>`;
    $('#progress').style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    $('#question-title').textContent = question.text;
    $('#prev-btn').style.display = currentQuestion > 0 ? 'block' : 'none';
    $('#next-btn').innerHTML = currentQuestion === questions.length - 1 ? 'ver meu resultado <span>→</span>' : 'continuar <span>→</span>';
    $('#options-container').innerHTML = question.options.map(([label, value], index) => `<button class="option ${answers[currentQuestion] === value ? 'selected' : ''}" onclick="selectOption(this, '${value}')"><span class="option-marker">✓</span>${label}</button>`).join('');
}
function selectOption(element, value) { answers[currentQuestion] = value; document.querySelectorAll('.option').forEach(option => option.classList.remove('selected')); element.classList.add('selected'); }
function nextQuestion() { if (!answers[currentQuestion]) { $('#options-container').animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 220 }); return; } if (currentQuestion < questions.length - 1) { currentQuestion++; renderQuestion(); } else renderResults(); }
function previousQuestion() { if (currentQuestion > 0) { currentQuestion--; renderQuestion(); } }
function renderResults() {
    const scores = answers.reduce((total, answer) => { total[answer] = (total[answer] || 0) + 1; return total; }, {});
    const ranked = Object.keys(careers).sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
    $('#recommendations-container').innerHTML = ranked.slice(0, 3).map(key => { const career = careers[key]; return `<article class="recommendation-card"><div class="card-heading"><span class="card-icon">${career.icon}</span><div><span class="area-label">${career.area}</span><h3>${career.name}</h3></div></div><p>${career.description}</p></article>`; }).join('');
    showPage('results-page');
}
function restartQuiz() { currentQuestion = 0; answers = []; showPage('welcome-page'); }
