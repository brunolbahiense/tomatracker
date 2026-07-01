import type { Translations } from './en'

const pt: Translations = {
  landing: {
    tagline: 'Melhore sua produtividade e faça as coisas acontecerem!',
    cta: 'Estou Pronto',
  },
  timerPage: {
    description: 'Usando a Técnica Pomodoro para melhorar sua produtividade',
  },
  timer: {
    play: 'INICIAR',
    pause: 'PAUSAR',
    reset: 'REINICIAR',
    workLabel: 'Foco',
    breakLabel: 'Pausa',
    breakMessage: 'Hora da pausa! Relaxe um pouco e volte em:',
    settingsTitle: 'Configurações',
    aria: {
      countdown: (m: number, s: number) =>
        `${m} minutos e ${s} segundos restantes`,
      decreaseWork: 'Diminuir tempo de foco',
      increaseWork: 'Aumentar tempo de foco',
      decreaseBreak: 'Diminuir tempo de pausa',
      increaseBreak: 'Aumentar tempo de pausa',
      muteLabel: 'Alternar som',
    },
    motivationalPhrases: [
      'Um pomodoro de cada vez.',
      'O foco começa aqui.',
      'Foco é um superpoder.',
      'Faça esses 25 minutos valerem.',
      'Pequenos passos, grandes resultados.',
      'Permaneça na zona.',
      'Progresso supera perfeição.',
      'Seu melhor trabalho acontece agora.',
    ],
  },
  notifications: {
    backToWork: 'De volta ao foco!',
    backToWorkBody: (m: number) => `Concentre-se por ${m} minutos.`,
    breakTime: 'Hora da pausa!',
    breakTimeBody: (m: number) => `Descanse por ${m} minutos.`,
  },
  pomodoroInfo: {
    title: 'A Técnica Pomodoro',
    subtitle: 'Como dominá-la!',
    steps: [
      {
        title: '1. Descubra quanto esforço uma atividade exige',
        description:
          'Já se perguntou para onde vai todo o seu tempo? Não se pergunte mais: está tudo na página. Sua lista de tarefas Pomodoro® é uma visão geral visual do tempo que você passou em diversas tarefas.',
      },
      {
        title: '2. Reduza as interrupções',
        description:
          'Geralmente, você pode esperar 25 minutos antes de retornar a ligação de um amigo ou responder um e-mail. Você aprenderá como lidar com as interrupções inevitáveis mantendo o foco na tarefa em questão.',
      },
      {
        title: '3. Estime o esforço para as atividades',
        description:
          'Embora os contornos do Pomodoro® sejam fixos, o que você faz dentro deles pode ser ajustado para maximizar a eficiência. Uma maneira de tornar um Pomodoro® mais eficaz é usar os primeiros minutos para revisar o que você fez antes. Outros métodos são discutidos no livro.',
      },
      {
        title: '4. Torne o Pomodoro mais eficaz',
        description:
          'Embora os contornos do Pomodoro sejam fixos, o que você faz dentro deles pode ser ajustado para maximizar a eficiência. Uma maneira de tornar um Pomodoro® mais eficaz é usar os primeiros minutos para revisar o que você fez antes. Outros métodos são discutidos no livro.',
      },
      {
        title: '5. Estabeleça um cronograma',
        description:
          'Um cronograma define um limite, motivando você a completar uma tarefa dentro de um período de tempo definido. Ele também delimita seu tempo de trabalho do seu tempo livre. Criar um cronograma claro permitirá que você aproveite seu tempo livre sem se preocupar que poderia estar fazendo mais trabalho.',
      },
      {
        title: '6. Defina seus próprios objetivos',
        description:
          'Um cronograma define um limite, motivando você a completar uma tarefa dentro de um período de tempo definido. Ele também delimita seu tempo de trabalho do seu tempo livre. Criar um cronograma claro permitirá que você aproveite seu tempo livre sem se preocupar que poderia estar fazendo mais trabalho.',
      },
    ],
  },
}

export default pt
