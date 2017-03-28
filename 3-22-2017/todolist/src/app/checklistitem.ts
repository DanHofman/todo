export class Checklistitem {
    public name: string;
    public time: string;
    public type: string;
    public importance: string;
    public id: number;
    constructor(name: string, time: string, importance: string, id: number ) {
        this.name = name;
        this.time = time;
        this.importance = importance;
        this.id = id;
    }
}
