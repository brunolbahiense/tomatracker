'use client'

import { useState, useRef } from 'react'
import useLocale from 'hooks/useLocale'
import type { Task } from 'hooks/useTasks'
import * as S from './styles'

interface TasksProps {
  taskList: Task[]
  addTask: (text: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export default function Tasks({
  taskList,
  addTask,
  toggleTask,
  deleteTask,
}: TasksProps) {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const activeTasks = taskList.filter((t) => !t.done)
  const completedTasks = taskList.filter((t) => t.done)

  const handleAdd = () => {
    if (!inputValue.trim()) return
    addTask(inputValue)
    setInputValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handleDownload = () => {
    const today = new Date().toISOString().slice(0, 10)
    const lines = [
      locale.tasks.reportTitle,
      today,
      '',
      `${locale.tasks.completedLabel}:`,
      ...completedTasks.map((t) => `✓ ${t.text} — ${t.completedAt}`),
      '',
      locale.tasks.reportTotal(completedTasks.length),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tomatracker-${today}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {open && <S.Backdrop onClick={() => setOpen(false)} />}
      <S.TasksButton
        onClick={() => setOpen((prev) => !prev)}
        $active={open}
        aria-label={locale.tasks.openLabel}
      >
        ✓
      </S.TasksButton>
      {open && (
        <S.TasksDrawer>
          <S.InputRow>
            <S.TaskInput
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={locale.tasks.inputPlaceholder}
            />
            <S.AddButton onClick={handleAdd} aria-label={locale.tasks.addLabel}>
              +
            </S.AddButton>
          </S.InputRow>

          {activeTasks.map((task) => (
            <S.TaskRow key={task.id}>
              <S.Checkbox $done={false} onClick={() => toggleTask(task.id)} />
              <S.TaskText $done={false}>{task.text}</S.TaskText>
              <S.DeleteButton
                onClick={() => deleteTask(task.id)}
                aria-label={locale.tasks.deleteLabel}
              >
                ×
              </S.DeleteButton>
            </S.TaskRow>
          ))}

          {completedTasks.length > 0 && (
            <>
              <S.SectionDivider />
              <S.SectionLabel>{locale.tasks.completedLabel}</S.SectionLabel>
              {completedTasks.map((task) => (
                <S.TaskRow key={task.id}>
                  <S.Checkbox $done={true} onClick={() => toggleTask(task.id)}>
                    ✓
                  </S.Checkbox>
                  <S.TaskText $done={true}>{task.text}</S.TaskText>
                  <S.Timestamp>{task.completedAt ?? ''}</S.Timestamp>
                  <S.DeleteButton
                    onClick={() => deleteTask(task.id)}
                    aria-label={locale.tasks.deleteLabel}
                  >
                    ×
                  </S.DeleteButton>
                </S.TaskRow>
              ))}
              <S.DownloadButton onClick={handleDownload}>
                {locale.tasks.downloadButton}
              </S.DownloadButton>
            </>
          )}
        </S.TasksDrawer>
      )}
    </>
  )
}
