class ClassA
{
	private num: number = 0;

	public getNum(): number
	{
		return this.num;
	}
	public unt = new class{
		constructor(public superThis: ClassA)
		{
		}
		public testSetOuterPrivate(target: number)
		{
			this.superThis.num = target;
		}
	}(this)
}

const a1: ClassA = new ClassA();

console.log(a1.getNum());

a1.unt.testSetOuterPrivate(4);
console.log(a1.getNum());