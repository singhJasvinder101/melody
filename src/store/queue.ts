import { create } from "zustand"

type QueueState = {
    activeQueueId: string | null,
    setActiveQueueId: (id: string) => void,
}

export const queueState = create<QueueState>()(set => ({
    activeQueueId: null,
    setActiveQueueId: (id) => set({ activeQueueId: id }),
}))

export const useQueue = () => queueState(state => state)

