const pacientTriage = {};

pacientTriage.contracts = {
    iSymptomHandler: class {
        constructor(nextHandler) {
            this.nextHandler = nextHandler;
        }
        handleSymptom = (pacient) => {}
    }
};

pacientTriage.entities = {
    bloodPressure: class {
        constructor(systolic, diastolic) {
            this.systolic = systolic;
            this.diastolic = diastolic;
        }
    },
    bracelet: {
        Green: 0,
        Yellow: 1,
        Red: 3
    },        
    symptoms: {
        chestPain: 'Chest pain',
        numbnessInArm: 'Numbness in arm'
    },
    pacient: class {
        constructor(name, age){
            this.name = name;
            this.age = age;
        }

        doCheckin = (healthUserNumber) =>{
            this.healthUserNumber = healthUserNumber;
        };

        addSymptoms = (symptoms, bloodPressure, temperature) => {
            this.symptoms = symptoms;
            this.bloodPressure = bloodPressure;
            this.temperature = temperature;
        };

        mustRequireHospitalization = (requiresHospitalization) => {
            this.requiresHospitalization = requiresHospitalization;
        };

        defineBracelet = (bracelet) => {
            this.bracelet = bracelet;
        };
    },
    nurse: class {
        chain = new pacientTriage.evaluationChainHandler();
        constructor(chain){
            this.chain = chain;
        }

        evaluateSymptoms = (pacient) =>{
            this.chain.evaluateSymptoms(pacient);
        };
     }
};

pacientTriage.handlers = {
    defaultHandler: class extends pacientTriage.contracts.iSymptomHandler{
        constructor() {
            super(null);
        }

        handleSymptom = (pacient) =>{
            pacient.DefineBracelet(pacientTriage.entities.bracelet.Green);
        };
    },
    heartBurnHandler: class extends pacientTriage.contracts.iSymptomHandler{
        constructor(nextHandler) {
            super(nextHandler);
        }

        handleSymptom = (pacient) =>{
            if(pacient.symptoms.length === 1 &&
               pacient.symptoms.includes(pacientTriage.entities.symptoms.chestPain))
            {
                pacient.defineBracelet(pacientTriage.entities.bracelet.Yellow);
            }
            else{
                this.nextHandler.handleSymptom(pacient);
            }
       };
    },
    heartAttackHandler: class extends pacientTriage.contracts.iSymptomHandler{
        constructor(nextHandler) {
            super(nextHandler);
        }

        handleSymptom = (pacient) =>{
            if(pacient.symptoms.includes(pacientTriage.entities.symptoms.chestPain) &&
               pacient.symptoms.includes(pacientTriage.entities.symptoms.numbnessInArm))
            {
                pacient.defineBracelet(pacientTriage.entities.bracelet.Red);
            }
            else{
                this.nextHandler.handleSymptom(pacient);
            }
       };
    },
};

pacientTriage.evaluationChainHandler = class {
    constructor(){
        this.chain = new pacientTriage.handlers.heartAttackHandler(
            new pacientTriage.handlers.heartBurnHandler(
                new pacientTriage.handlers.defaultHandler()
            )
        );
    }

    evaluateSymptoms = (pacient) =>{
        this.chain.handleSymptom(pacient);
    };
};

pacientTriage.tester = {
    test:() => {
        return true;
    }
};

module.exports = pacientTriage;
