interface IMemento
{

}

class Originator
{
	private _state: number;

	public constructor()
	{
		this._state = 4;
	}
	public save(): IMemento
	{
		return new ConcreteMemento(this._state);
	}

	public restore(memento: IMemento)
	{
		const cm = <ConcreteMemento>memento;
		this._state = cm.state;
	}

	public doSomething(input: number)
	{
		this._state = input;
	}

	public get state()
	{
		return this._state;
	}
}

class ConcreteMemento implements IMemento
{
	private readonly _state: number;

	public constructor(state: number)
	{
		this._state = state;
	}

	public get state()
	{
		return this._state
	}
}

class CareTaker
{
	private _originator: Originator;
	private _history: Array<IMemento>;

	constructor(originator : Originator)
	{
		this._originator = originator;
		this._history = [];
	}

	public backup()
	{
		const memento = this._originator.save();
		//console.log(memento);
		this._history.push(memento)
	}

	public undo()
	{
		if (this._history.length < 1)
		{
			console.log("Слышь, бэкапов нет!")
		} else
		{
			this._originator.restore(this._history.pop());
		}
	}
}

const originator = new Originator();
console.log(originator.state);
const careTaker = new CareTaker(originator);
careTaker.backup();
originator.doSomething(10);
careTaker.backup();
originator.doSomething(5);
console.log(originator.state);
careTaker.undo();
console.log(originator.state);
careTaker.undo();
console.log(originator.state);
careTaker.undo();
console.log(originator.state);
