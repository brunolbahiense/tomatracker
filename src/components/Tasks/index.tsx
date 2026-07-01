'use client'

import { useState, useRef, useEffect } from 'react'
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
  deleteTask
}: TasksProps) {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      if (
        drawerRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      )
        return
      setOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const activeTasks = taskList.filter((task) => !task.done)
  const completedTasks = taskList.filter((task) => task.done)

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
      ...completedTasks.map((task) => `✓ ${task.text} — ${task.completedAt}`),
      '',
      locale.tasks.reportTotal(completedTasks.length)
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tomatracker-${today}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <S.TasksButton
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        $active={open}
      >
        <S.ButtonIcon aria-hidden="true">✓</S.ButtonIcon>
        {locale.tasks.openLabel}
      </S.TasksButton>
      {open && (
        <S.TasksDrawer ref={drawerRef}>
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
