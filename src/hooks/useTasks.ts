import { useState, useEffect } from 'react'

export interface Task {
  id: string
  text: string
  done: boolean
  completedAt: string | null
}

const STORAGE_KEY = 'tt_task_list'

const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

const useTasks = () => {
  const [taskList, setTaskList] = useState<Task[]>(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList))
  }, [taskList])

  const addTask = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTaskList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, done: false, completedAt: null }
    ])
  }

  const toggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const done = !t.done
        const now = new Date()
        const completedAt = done
          ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
          : null
        return { ...t, done, completedAt }
      })
    )
  }

  const deleteTask = (id: string) => {
    setTaskList((prev) => prev.filter((t) => t.id !== id))
  }

  return { taskList, addTask, toggleTask, deleteTask }
}

export default useTasks
