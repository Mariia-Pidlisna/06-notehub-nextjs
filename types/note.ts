type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'

export interface Note {
    id: number,
    title: string,
    content: string,
    tag: Tag,
    createdAt: string,
    updatedAt: string,
}

export interface NewNote {
    title: string,
    content: string,
    tag: Tag,
}