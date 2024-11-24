interface Note {
    id: string;
    content: string;
    author: string;
}

export class NoteManager {
    private notes: Note[] = [];

    // Method to create a new note
    public createNote(content: string, author: string): Note {
        const newNote: Note = {
            id: this.generateId(),
            content,
            author,
        };
        this.notes.push(newNote);
        return newNote;
    }

    // Method to update an existing note
    public updateNote(id: string, content: string): Note | null {
        const note = this.notes.find((n) => n.id === id);
        if (note) {
            note.content = content;
            return note;
        }
        return null;
    }

    // Method to get all notes
    public getAllNotes(): Note[] {
        return this.notes;
    }

    // Private method to generate unique IDs
    private generateId(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();;
    }
}