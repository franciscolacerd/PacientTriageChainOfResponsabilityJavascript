# Pacient Triage - Chain Of Responsability Pattern - Javascript
Chain of Responsability Pattern Javascript implementation of an Hospital Triage System

In this example, HeartAttackHandler checks if the patient has both "Chest pain" and "Numbness in arm" to identify a possible heart attack. If these symptoms are present, the wristband is set to red. Otherwise, evaluation continues with the next handler in the chain.

------

In object-oriented design, the chain-of-responsibility pattern is a behavioral design pattern consisting of a source of command objects and a series of processing objects. Each processing object contains logic that defines the types of command objects that it can handle; the rest are passed to the next processing object in the chain. A mechanism also exists for adding new processing objects to the end of this chain.

![Chain_of_Responsibility_Design_Pattern_UML](https://upload.wikimedia.org/wikipedia/commons/6/6a/W3sDesign_Chain_of_Responsibility_Design_Pattern_UML.jpg)

https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern

------
## How to run

1. Clone project

2. Run to install dependencies
```npm
npm i
```

3. Run to start Jest
```npm
jest
```

------


## Javascript Implementation

### 1. Declare entities 

```javascript
const pacientTriage = {};

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
```

### 2. Declare the handler interface
```javascript
pacientTriage.contracts = {
    iSymptomHandler: class {
        constructor(nextHandler) {
            this.nextHandler = nextHandler;
        }
        handleSymptom = (pacient) => {}
    }
};
```

### 3. Declare concrete handler subclasses
```javascript
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
```

### 4. Declare chain handler
```javascript
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

module.exports = pacientTriage;
```

### 5. Unit test it (Jest)

```javascript
const pacientTriage = require('./pacientTriage');

describe('heartburn test', () => {
    test('handle-heartburn-define-bracelet-yellow', () => {
      // Arrange  
      let pacient = new pacientTriage.entities.pacient('francisco lacerda', 45);
      const symptoms = [pacientTriage.entities.symptoms.chestPain];
      const bloodPressure = new pacientTriage.entities.bloodPressure(120, 80);
      const temperature = 37.1;

      // Act
      pacient.addSymptoms(symptoms, bloodPressure, temperature);

      let nurse = new pacientTriage.entities.nurse(new pacientTriage.evaluationChainHandler());

      nurse.evaluateSymptoms(pacient);

      // Assert
      expect(pacient.bracelet).toBe(pacientTriage.entities.bracelet.Yellow);
    });
});        
```

