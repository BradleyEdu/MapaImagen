export class Casilla {
    public Id: number;
    public Title: string;
    public Descripcion: string;
    public Manda: string[];
    public MainRoles: string[];
    public Tools: {Description: string, Url: string};
    public Process: {Description: string, Url: string};

    constructor() {
        this.Id = 0;
        this.Title = "";
        this.Descripcion = "";
        this.Manda = [];
        this.MainRoles = [];
        this.Tools = {Description: '',Url: ''};
        this.Process = {Description: '',Url: ''};
    }
}