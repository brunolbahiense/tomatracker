import type { Translations } from './en'

const pt: Translations = {
  landing: {
    tagline: 'Melhore sua produtividade e faça as coisas acontecerem!',
    cta: 'Estou Pronto'
  },
  timer: {
    play: 'INICIAR',
    pause: 'PAUSAR',
    reset: 'REINICIAR',
    workLabel: 'Foco',
    breakLabel: 'Pausa',
    breakMessage: 'Hora da pausa! Relaxe um pouco e volte em:',
    settingsTitle: 'Configurações',
    colorsLabel: 'Cores',
    themeLabel: 'Tema',
    dark: 'Escuro',
    light: 'Claro',
    aria: {
      countdown: (minutes: number, seconds: number) =>
        `${minutes} minutos e ${seconds} segundos restantes`,
      decreaseWork: 'Diminuir tempo de foco',
      increaseWork: 'Aumentar tempo de foco',
      decreaseBreak: 'Diminuir tempo de pausa',
      increaseBreak: 'Aumentar tempo de pausa',
      muteLabel: 'Alternar som'
    },
    motivationalPhrases: [
      'Um pomodoro de cada vez.',
      'O foco começa aqui.',
      'Foco é um superpoder.',
      'Faça esses 25 minutos valerem.',
      'Pequenos passos, grandes resultados.',
      'Permaneça na zona.',
      'Progresso supera perfeição.',
      'Seu melhor trabalho acontece agora.'
    ]
  },
  notifications: {
    backToWork: 'De volta ao foco!',
    backToWorkBody: (minutes: number) => `Concentre-se por ${minutes} minutos.`,
    breakTime: 'Hora da pausa!',
    breakTimeBody: (minutes: number) => `Descanse por ${minutes} minutos.`
  },
  pomodoroInfo: {
    title: 'A Técnica Pomodoro',
    subtitle: 'Simples, comprovada, eficaz.',
    pillars: [
      {
        icon: '🍅',
        label: '25 min',
        title: 'Foco total',
        description:
          'Trabalhe em uma única tarefa sem interrupções durante um Pomodoro.'
      },
      {
        icon: '☕',
        label: '5 min',
        title: 'Pausa curta',
        description:
          'Levante, respire, descanse a mente antes do próximo ciclo.'
      },
      {
        icon: '🔁',
        label: '× 4',
        title: 'Repita',
        description:
          'A cada 4 Pomodoros, faça uma pausa longa de 15–30 minutos.'
      }
    ]
  },
  footer: {
    madeBy: 'Feito por',
    name: 'Bruno'
  },
  tasks: {
    openLabel: 'Tarefas',
    inputPlaceholder: 'Nova tarefa...',
    completedLabel: 'CONCLUÍDAS',
    downloadButton: '↓ Baixar relatório',
    reportTitle: 'Tomatracker — Relatório de tarefas',
    reportTotal: (count: number) =>
      `Total: ${count} tarefa${count === 1 ? '' : 's'}`,
    deleteLabel: 'Excluir tarefa',
    addLabel: 'Adicionar tarefa'
  }
}

export default pt
