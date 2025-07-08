class TaskQueue {
  private queue = new Map<string, () => Promise<unknown>>()
  private isProcessing = false

  public addTask(key: string, task: () => Promise<unknown>): void {
    if (this.queue.has(key)) {
      console.warn(`Task with key "${key}" already exists. Overwriting.`)
    }
    this.queue.set(key, task)
    this.processQueue()
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return

    this.isProcessing = true
    try {
      for (const [key, task] of this.queue.entries()) {
        try {
          await task()
        } catch (error) {
          console.error(`Error processing task with key "${key}":`, error)
        } finally {
          this.queue.delete(key)
        }
      }
    } finally {
      this.isProcessing = false
    }
  }
}

export const fileNameChagneQueue = new TaskQueue()
