'use strict';

describe("Thermostat", function(){
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

describe("temperature adjustment", function(){

  it('should have a default temperaure of 20 degrees', function(){
    expect(thermostat.temperature).toEqual(20);
  });

  it('temperature can be increased', function(){
    thermostat.up();
    expect(thermostat.temperature).toEqual(21);
  });

  it('temperature can be decreased', function(){
    thermostat.down();
    expect(thermostat.temperature).toEqual(19);
  });

  it('has a minimum temperature of 10 degrees', function(){
    expect(function(){
      for(let i = 0; i < 11; i++){
        thermostat.down();
      }
    }).toThrowError("Minimum temperature is 10 degrees")
  });

  it('can reset the temperature to 20 degrees', function(){
    thermostat.up();
    thermostat.reset();
    expect(thermostat.temperature).toEqual(20);
  })
})

describe("power saving mode", function(){

  it('has a power saving mode which is on by default', function(){
    expect(thermostat.powerSaving).toBeTrue();
  })

  it('has a power saving mode which can be turned off', function(){
    thermostat.powerSavingOff();
    expect(thermostat.powerSaving).toBeFalse();
  })

  it('has a power saving mode which can be turned off and turned on again', function(){
    thermostat.powerSavingOff();
    thermostat.powerSavingOn();
    expect(thermostat.powerSaving).toBeTrue();
  })

  it("has a maxiumum temperature of 25 degrees when power saving is on", function(){
    expect(function(){
      for(let i = 0; i < 6; i++){
        thermostat.up();
      }
    }).toThrowError("Maximum temperature is 25 degrees")
  })

  it("has a maximum temperature of 32 degrees when power saving is off", function(){
    thermostat.powerSavingOff();
    expect(function(){
      for(let i = 0; i < 13; i++){
        thermostat.up();
      }
    }).toThrowError("Maximum temperature is 32 degrees")
  })

})

describe("energy usage", function(){

  it("can indicate energy usage when low", function(){
    for(let i = 0; i < 3; i++){
      thermostat.down();
    }
    expect(thermostat.energyUsageCheck()).toEqual("low-usage")
  })

  it("can indicate energy usage when medium which is the default", function(){
    expect(thermostat.energyUsageCheck()).toEqual("medium-usage")
  })

  it("can indicate energy usage when high", function(){
    thermostat.powerSavingOff();
    for(let i = 0; i < 11; i++){
      thermostat.up()
    }
    expect(thermostat.energyUsageCheck()).toEqual("high-usage")
  })

})

})
