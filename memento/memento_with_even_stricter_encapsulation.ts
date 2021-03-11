interface IMemento
{
	restore();
}

interface IOriginator
{
	save(): IMemento;
}

class ConcreteMemento implements IMemento
{
	private _originator: ConcreteOriginator;
	private readonly _state: number;

	public constructor(originator: ConcreteOriginator, state: number)
	{
		this._originator = originator;
		this._state = state;
	}

	public restore()
	{
		this._originator.setState(this._state);
	}

}

class ConcreteOriginator implements IOriginator
{
	private _state: number;

	public constructor()
	{
		this._state = 4;
	}

	public save(): IMemento
	{
		return new ConcreteMemento(this, this._state)
	}

	public setState(state: number)
	{
		this._state = state;
	}
//имитируем некоторые действия в бизнес логике
	public doSomething(input: number)
	{
		this._state = input;
	}
//метод для проверки состояний хозяина (в паттерне не участвует)
	public get state()
	{
		return this._state;
	}
}

class CareTaker
{
	private _history: Array<IMemento>;

	constructor()
	{
		this._history = [];
	}

	public undo()
	{
		if (this._history.length < 1)
		{
			console.log("Слышь, бэкапов нет!")
		} else
		{
			this._history[this._history.length - 1].restore();
			this._history.pop();
		}
	}
	public backup(memento : IMemento)
	{
		this._history.push(memento)
	}
}

//client code
const originator = new ConcreteOriginator();
const caretaker = new CareTaker();
console.log(`стартовое состояние ${originator.state}`);
caretaker.backup(originator.save());
originator.doSomething(10);
console.log(`состояние во время работы ${originator.state}`);
caretaker.backup(originator.save());
originator.doSomething(5);
console.log(`состояние перед откатом, которое не стали сохранять ${originator.state}`);
caretaker.undo();
console.log(`состояние после первого отката ${originator.state}`);
caretaker.undo();
console.log(`состояние после второго отката ${originator.state}`);
caretaker.undo();
console.log(`состояние после третьего отката ${originator.state}`);


