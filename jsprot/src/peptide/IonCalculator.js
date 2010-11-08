/**
 * IonCalculator.js
 * 
 * This file contains the IonCalculator class which provides functionality to calculate the ions as measured in masspec
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.jsprot
 * @subpackage peptide
*/

Ext.namespace('mpimp.jsprot.peptide');

//###################################################################
/**
 * @class mpimp.jsprot.peptide.IonCalculator
 * The IonCalculator is a class which provides functionality to calculate the ions as measured in a masspec
 * @constructor
 * @param {Object} config The configuration object
 */
mpimp.jsprot.peptide.IonCalculator = function(config)
{
	/**
	 * @cfg {Object} peptide
	 * The peptide object to use for ion calculation
	 */
	this.peptide = null;
	
	/**
	 * @cfg {Object} maxcharge
	 * The maximum charge to calculate
	 */
	this.maxcharge = 1;
	
	/**
	 * @cfg {String} weighttype
	 * The weighttype to use for constants (either monoisotopic or average)
	 */
	this.weighttype = 'monoisotopic';
	
	/**
	 * @cfg {Array} neutralloss
	 * An array of neutral loss formulas to calculate the ion masses of such as H2O or NH3
	 */
	this.neutralloss = [];
	
	/**
	 * @cfg {Array} neutralgain
	 * An array of neutral gain formulas to calculate the ion masses of such as H2O
	 */
	this.neutralgain = [];
	
	/**
	 * @cfg {Ext.XTemplate} customtemplate
	 * An Ext.XTemplate to fill the custom property of the result
	 */
	this.customtemplate = null;
	
	/**
	 * @cfg {Boolean} customonly
	 * True to return only a flat array with custom values
	 */
	this.customonly = false;
	
	Ext.apply(this, config);
	
	// private
	this._leftStartIons = ['a', 'b', 'c', 'd'];
	
	// private
	this._rightStartIons = ['v', 'w', 'x', 'y', 'z'];
	
	// private
	this._tempArray = [];
}

mpimp.jsprot.IonCalculator = Ext.extend(mpimp.jsprot.peptide.IonCalculator, mpimp.jsprot.XProtBase, {});

//###################################################################
/**
 * Adds an object to the result array
 * @param {Number} mass The ion mass
 * @param {String} ion The ion
 * @param {Number} ionindex The ion index
 * @param {Number} charge The chargestate
 * @param {String} flag A flag for additional information such as neutral losses
 */
mpimp.jsprot.peptide.IonCalculator.prototype._addToResult = function(mass, ion, ionindex, charge, flag)
{
	var strCustom = '';
	var objEntry = {
		mass: mass,
		ion: ion,
		index: ionindex,
		charge: charge,
		flag: flag
	};
	
	if (this.customtemplate) {
		strCustom = this.customtemplate.apply(objEntry);
	}
	objEntry.custom = strCustom;
	
	this._tempArray.push(objEntry)
}

//###################################################################
/**
 * Calculates and adds the neutral loss/gain masses to result array
 * @param {String} strAa The current amino acid
 * @param {String} ion The ion currently calculated
 * @param {Number} intIndex The current sequence index
 * @param {Number} charge The current charge
 */
mpimp.jsprot.peptide.IonCalculator.prototype._addNeutralLossGainMasses = function(strAa, dblMass, ion, ionindex, charge)
{
	var loc = 'mpimp.jsprot.peptide.IonCalculator._addNeutralLossGainMasses';
	var dblElH = this.getElementMass('H', this.weighttype);
	var dblElN = this.getElementMass('N', this.weighttype);
	var dblElO = this.getElementMass('O', this.weighttype);
	
	var blnGainH2O = false;
	var blnGainNH3 = false;
	var blnLossNH3 = false;
	var blnLossH2O = false;
	var i;
	var j;
	
	j=this.neutralgain.length;
	for (i=0; i<j; i++) {
		blnGainH2O = this.neutralgain[i] === 'H2O' ? true : blnGainH2O;
		blnGainNH3 = this.neutralgain[i] === 'NH3' ? true : blnGainNH3;
	}
	j=this.neutralloss.length
	for (i=0; i<j; i++) {
		blnLossH2O = this.neutralloss[i] === 'H2O' ? true : blnLossH2O;
		blnLossNH3 = this.neutralloss[i] === 'NH3' ? true : blnLossNH3;
	}
	
	switch(ion){
		case 'a' :
			if (blnLossNH3 === true && (strAa === 'K' || strAa === 'N' || strAa === 'Q' || strAa === 'R')) {
				dblMass =  dblMass - (dblElN + (dblElH * 3));
				strFlag = '-NH3';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			return true;

		case 'b':
			if (blnLossNH3 === true && (strAa === 'K' || strAa === 'N' || strAa === 'Q' || strAa === 'R')) {
				dblMass =  dblMass - (dblElN + (dblElH * 3));
				strFlag = '-NH3';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			if (blnLossH2O === true && (strAa === 'D' || strAa === 'E' || strAa === 'S' || strAa === 'T')) {
				dblMass =  dblMass - (dblElO + (dblElH * 2));
				strFlag = '-H2O';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			if (blnGainH2O === true && (strAa === 'H' || strAa === 'K' || strAa === 'N' || strAa === 'R')) {
				dblMass =  dblMass + (dblElO + (dblElH * 2));
				strFlag = '+H2O';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			if(blnGainH2O === true && blnLossNH3 === true && (strAa === 'K' || strAa === 'N' || strAa === 'R')) {
				
				dblMass = dblMass + dblElO - dblElN + dblElH;
				strFlag = '+H2O -NH3';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			return true;

		case 'y':
			if (blnLossNH3 === true && (strAa === 'K' || strAa === 'N' || strAa === 'Q' || strAa === 'R')) {
				dblMass =  dblMass - (dblElN + (dblElH * 3));
				
				strFlag = '-NH3';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			if (blnLossH2O === true && (strAa === 'D' || strAa === 'E' || strAa === 'S' || strAa === 'T')) {
				dblMass =  dblMass - (dblElO + (dblElH * 2));
				strFlag = '-H2O';
				this._addToResult(dblMass, ion, ionindex, charge, strFlag);
			}
			return true;
	}
	
	return true;
}

//###################################################################
/**
 * Calculates the ion modifier mass
 * @param {String} strAa The amino acid to get the ion modifier of
 * @param {String} ion The ion to retrieve the modifier mass of
 * @return A mass to be added/substracted to/from the amino acid mass
 */
mpimp.jsprot.peptide.IonCalculator.prototype._getIonModifierMass = function(strAa, ion)
{
	var loc = 'mpimp.jsprot.peptide.IonCalculator._getIonModifierMass';
	var dblTemp;
	
	var dblAaMass = this.getAminoAcidMass(strAa, this.weighttype);
	var dblElC = this.getElementMass('C', this.weighttype);
	var dblElH = this.getElementMass('H', this.weighttype);
	var dblElN = this.getElementMass('N', this.weighttype);
	var dblElO = this.getElementMass('O', this.weighttype);
	var dblElS = this.getElementMass('S', this.weighttype);

	switch(ion) {
		case 'a': return (-1) * (dblElC + dblElO + dblElH);
		case 'b': return (-1) * dblElH;
		case 'c': return dblElN + (dblElH * 2);
		case 'd':
			dblTemp = (-1) * dblAaMass;
			if (strAa === 'K' || strAa === 'N' || strAa === 'R') {
				return dblTemp + dblElN + ((dblElC * 2) + (dblElH * 4));
			} else {
				return 0;
			}
		case 'v':
			dblTemp = (-1) * dblAaMass;
			if (strAa === 'H' || strAa === 'K' || strAa === 'N' || strAa === 'R') {
				return dblTemp + (dblElC * 2) + (dblElH * 2) + dblElN + dblElO;
			} else {
				return 0;
			}

		case 'w':
			dblTemp = (-1) * dblAaMass;
			if (strAa === 'K' || strAa === 'N' || strAa === 'R') {
				return dblTemp + (dblElC * 3) + (dblElH * 3) + dblElO;
			} else {
				return 0;
			}

		case 'x': return dblElC + dblElO - dblElH; 
		case 'y': return dblElH;
		case 'z': return (-1) * (dblElN + dblElH);
		default: break;
	}
	
	this.toLog('error', loc, 'Unknown ion', 'Failed to calculate the ions modifier mass. Ion ('+ion+') unknown.', '');
	return -1;
}


//###################################################################
/**
 * Process a single amino acid
 * @param {String} strAa The amino acid to process
 * @param {Number} dblCurrentMass The overall mass so far
 * @param {String} ion The ion to calculate
 * @param {Number} ionindex The ion index beginning with 1 no matter of left or right starting
 * @param {Number} index The true zero-based index of the current amino acid
 * @return The plain amino acid mass to be added to the overall mass
 */
mpimp.jsprot.peptide.IonCalculator.prototype._processAminoAcid = function(strAa, dblCurrentMass, ion, ionindex, index)
{
	var loc = 'mpimp.jsprot.peptide.IonCalculator._processAminoAcid';
	
	var dblIonModifier = 0;
	var dblMassTemp = 0;
	var dblMassBase = 0;
	var intMaxCharge = this.maxcharge;
	var j;
	var dblProtonMass = this.getPhysicsMass('P', this.weighttype);
	var dblMassNeutralLG;
	var dblAaMass;
	
	dblAaMass = this.peptide.getIndexMass(this.weighttype, index); //Retrieves the amino acid + modifications
	dblCurrentMass += dblAaMass;
	
	dblIonModifier = this._getIonModifierMass(strAa, ion);
	if (dblIonModifier === -1) {
		this.toLog('error', loc, 'Method error', 'Method (this._getIonModifierMass) failed to complete successfully.', '');
		return false;
	}
	
	//-- Fix maxcharge for leading and trailing amino acids --
	if (ionindex < intMaxCharge) {
		intMaxCharge = ionindex;
	}
	
	dblMassBase = dblCurrentMass + dblIonModifier;
	for (var i=1; i <= intMaxCharge; i++) {
		
		//-- Base charged (i) mass --
		dblMassBase += dblProtonMass;
		dblMassTemp = dblMassBase / i;
		this._addToResult(dblMassTemp, ion, ionindex, i, '');
		
		//-- Neutral loss/gain masses --
		this._addNeutralLossGainMasses(strAa, dblMassTemp, ion, ionindex, i);
	}
	
	return dblAaMass;
}

//###################################################################
/**
 * Calculate all masses for specified ion
 * @param {String} ion The ion to calculate the masses of (a,b,c,d,v,w,x,y,z)
 * @return An array of objects describing the ions e.g. {mass: 124.54, ion: b1, charge: 2, flag: -H2O}
 */
mpimp.jsprot.peptide.IonCalculator.prototype.calculateIon = function(ion)
{
	var loc = 'mpimp.jsprot.peptide.IonCalculator.calculateIon';
	
	this._tempArray = [];
	var dblCurrentMass = 0;
	var strAa = '';
	var strSeq = this.peptide.Sequence;
	var i;
	
	if(this._leftStartIons.indexOf(ion) > -1) {
		dblCurrentMass = this.peptide.getNTerminusMass(this.weighttype);
		
		for(i=0,j=strSeq.length-1; i<j; i++) {
			strAa = strSeq[i];
			dblCurrentMass += this._processAminoAcid(strAa, dblCurrentMass, ion, i+1, i);
		}
	}
	
	if(this._rightStartIons.indexOf(ion) > -1) {
		dblCurrentMass = this.peptide.getCTerminusMass(this.weighttype);
		
		for(i=strSeq.length-1; i>0; i--) {
			strAa = strSeq[i];
			dblCurrentMass += this._processAminoAcid(strAa, dblCurrentMass, ion, strSeq.length-i, i);
		}
	}
	
	return this._tempArray;
}