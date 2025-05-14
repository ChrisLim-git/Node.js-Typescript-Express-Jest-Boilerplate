import { IBaseEntity } from '../interfaces/base'

export abstract class BaseRepo<T extends IBaseEntity> {
    // to save data in run-time app memory
    public items: T[] = []
    protected idCount = 0
    protected generateId = (): number => ++this.idCount

    create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
        const newItem = {
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...item
        } as T

        this.items.push(newItem)
        return newItem
    }

    getAll(): T[] {
        return this.items
    }

    getById(id: number): T | null {
        return this.items.find(i => i.id === id) || null
    }

    update(id: number, updateData: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): T | null {
        const index = this.items.findIndex(i => i.id === id)
        if (index === -1)
            return null

        const updated = {
            ...this.items[index],
            ...updateData,
            updatedAt: new Date()
        } as T

        this.items[index] = updated
        return updated
    }

    delete(id: number): boolean {
        const index = this.items.findIndex(i => i.id === id)

        this.items.splice(index, 1)

        return true
    }
}
