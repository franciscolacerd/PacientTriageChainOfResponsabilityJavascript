// script.test.js
const pacientTriage = require('./pacientTriage');

describe('control test', () => {
    test('call-tester', () => {
        expect(pacientTriage.tester.test()).toBeTruthy();
    });
});


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