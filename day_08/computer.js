class Computer {
    constructor(data) {
        this.data = JSON.parse(JSON.stringify(data))
        this.index=0
        this.accumulator=0
        this.terminated=false
        this.lastAccValue=null
    }
    run(){
        if (this.terminated) return
        let row=this.data[this.index]
        this.data[this.index].lastAccValue = this.accumulator
        this.lastAccValue = this.accumulator
        switch (row.command){
            case 'nop':
                this.index++
                break
            case 'acc':
                if(row.sign=='+') this.accumulator += row.amount
                if(row.sign=='-') this.accumulator -= row.amount
                this.index++
                break
            case 'jmp':
                if(row.sign=='+') this.index += row.amount
                if(row.sign=='-') this.index -= row.amount
                break
        }
        if(this.index==this.data.length) this.terminated=true
    }
    isInfiniteLoop(){
        let testComputer = new Computer(this.data)
        while(!testComputer.terminated && !testComputer.data[testComputer.index].lastAccValue){
            testComputer.run()
        }
        return testComputer.terminated ? testComputer.accumulator : true
    }
}
module.exports = Computer