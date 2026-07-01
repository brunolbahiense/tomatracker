import { useState, useEffect } from 'react'

export interface Task {
  id: string
  text: string
  done: boolean
  completedAt: string | null
}

const STORAGE_KEY = 'tt_task_list'

const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

const useTasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    setTaskList(loadTasks())
  }, [])

  const updateTaskList = (nextTaskList: Task[]) => {
    setTaskList(nextTaskList)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTaskList))
  }

  const addTask = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    updateTaskList([
      ...taskList,
      { id: crypto.randomUUID(), text: trimmed, done: false, completedAt: null }
    ])
  }

  const toggleTask = (id: string) => {
    updateTaskList(
      taskList.map((task) => {
        if (task.id !== id) return task
        const done = !task.done
        const now = new Date()
        const completedAt = done
          ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
          : null
        return { ...task, done, completedAt }
      })
    )
  }

  const deleteTask = (id: string) => {
    updateTaskList(taskList.filter((task) => task.id !== id))
  }

  return { taskList, addTask, toggleTask, deleteTask }
}

export default useTasks
