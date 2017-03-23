export class Checklistitem {
    public name: string;
    public time: string;
    public checked: boolean;
    public importance: string;
    public id: number;
    constructor(name: string, time: string, importance: string, id: number ) {
        this.name = name;
        this.time = time;
        this.importance = importance;
        this.checked = false;
        this.id = id;
    }
}
