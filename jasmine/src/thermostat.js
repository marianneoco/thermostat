'use strict';

function Thermostat(){
  this.DEFAULT_TEMP = 20;
  this.temperature = this.DEFAULT_TEMP;
  this.powerSaving = true;
  this.MINIMUM_TEMPERATURE = 10;
  this.MAX_TEMP_PSM_OFF = 32;
  this.MAX_TEMP_PSM_ON = 25;
  this.LOW_USAGE_TEMP = 18;
  this.HIGH_USAGE_TEMP = 25;
}

Thermostat.prototype.up = function(){
  if(this.powerSaving === true && this.temperature + 1 > this.MAX_TEMP_PSM_ON){
    throw new Error("Maximum temperature is " + this.MAX_TEMP_PSM_ON + " degrees");
  }
  else if(this.powerSaving === false && this.temperature + 1 > this.MAX_TEMP_PSM_OFF){
    throw new Error("Maximum temperature is " + this.MAX_TEMP_PSM_OFF + " degrees");
  }
  else{
    this.temperature = this.temperature + 1
  }
}

Thermostat.prototype.down = function(){
  if(this.temperature - 1 >= this.MINIMUM_TEMPERATURE){
    this.temperature = this.temperature - 1
  }
  else{
    throw new Error("Minimum temperature is " + this.MINIMUM_TEMPERATURE + " degrees");
  }
}

Thermostat.prototype.powerSavingOff = function(){
  this.powerSaving = false;
}

Thermostat.prototype.powerSavingOn = function(){
  this.powerSaving = true;
}

Thermostat.prototype.reset = function(){
  this.temperature = this.DEFAULT_TEMP;
}

Thermostat.prototype.energyUsageCheck = function(){
  if(this.temperature <= this.LOW_USAGE_TEMP){
    return "low";
  }
  else if(this.LOW_USAGE_TEMP < this.temperature && this.temperature < this.HIGH_USAGE_TEMP){
    return "medium";
  }
  else{
    return "high";
  }
}
