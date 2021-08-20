class User 
{
    constructor()
    {
        this.pattern = [];
        this.counter = 0;
        this.turn = false;
    }

    addNewColor(color)
    {
        switch(color)
        {
            case 'red':
            case 'blue':
            case 'green':
            case 'yellow':
                this.pattern.push(color);
                break;
            default:
                return;
        }
    }

    resetValues()
    {
        this.pattern = [];
        this.counter = 0;
        this.turn = false;
    }
}

const user = new User();

export default user;