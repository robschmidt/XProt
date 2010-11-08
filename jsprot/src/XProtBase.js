/**
 * XProtBase.js
 * 
 * This file contains the base class to be extended by all XProt classes
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.3
 * @package mpimp.jsprot
 * @subpackage
*/


Ext.namespace('mpimp.jsprot');

//###################################################################
/**
 * The class constructor
 * @param {Object} config The configuration object
 */
mpimp.jsprot.XProtBase = function(config)
{
	// private
	this.log = [];
}

//###################################################################
/**
 * Calculates the mass of the element in a chemical formula such as NH3
 * @param {String} formula The formula to calculate the mass of its elements
 * @param {String} weighttype The weight type to return (monoisotopic or average)
 * @return The molecular mass of the formulas elements or -1 on error
 */
mpimp.jsprot.XProtBase.prototype.getFormulaMass = function(formula, weighttype)
{
	var loc = 'mpimp.jsprot.XProtBase.getFormulaMass';
	
	var dblElMass;		//The elements mass
	var dblFormulaMass;
	var intElMult;		//The elements multiplier
	var intLength;		//A helper var to get an elements multiplier
	var strEl;			//A single element in formula
	var strTemp;		//A helper var to get an elements multiplier
	
	if (!formula || String(formula) === '') {
		return -1;
	}
	
	//--- Calculate the mass for the given element ---
	dblFormulaMass = 0;
	for (var i=0,j=formula.length; i<j; i++) {
		
		//-- Elements mass --
		strEl = formula.substr(i, 1).toUpperCase();
		dblElMass = this.getElementMass(strEl, weighttype);
		if (dblElMass === -1) {
			this.toLog('error', loc, 'Method error', 'Method (this.getElementMass) failed to complete successfully.', '');
			return -1;
		}
		
		//-- Calculate the elements multiplier --
		if(i+2 <= formula.length && isNaN(parseInt(formula.substr(i+1, 1))) === false){
			intLength = 1;
			strTemp = formula.substr(i+intLength, 1);
			while(isNaN(parseInt(strTemp)) === false && i+intLength <= formula.length){
				intLength++;
				strTemp = formula.substr(i+intLength, 1);
			}
			intElMult = parseInt(formula.substr(i+1, intLength-1));
			if (isNaN(intElMult) === true) {
				this.toLog('error', loc, 'Not a number', 'The elements ('+strEl+') multiplier is not a number: '+intElMult, '');
				return -1;
			}
			i += intLength-1;
		}
		else{
			intElMult = 1;
			intLength = 0;
		}

		dblFormulaMass += intElMult * dblElMass;
	}
	return dblFormulaMass;
}

//###################################################################
/**
 * Retrieves the mass of an amino acid specified by id or shortcut
 * @param {String} aminoacid The aminoacids id or shortcut
 * @param {String} weighttype The weighttype to return the mass of
 * @return The amino acids mass or -1 on error
 */
mpimp.jsprot.XProtBase.prototype.getAminoAcidMass = function(aminoacid, weighttype)
{
	var loc = 'mpimp.jsprot.XProtBase.getAminoAcidMass';
	
	for (var i=0,j=mpimp.jsprot.constants.AminoAcids.length; i<j; i++) {
		if (mpimp.jsprot.constants.AminoAcids[i].id === aminoacid ||
		mpimp.jsprot.constants.AminoAcids[i].shortcut === aminoacid) {
			switch (weighttype) {
				case 'monoisotopic' :return mpimp.jsprot.constants.AminoAcids[i].weight_monoiso;
				case 'average' : return mpimp.jsprot.constants.AminoAcids[i].weight_ave;
				default : this.toLog('error', loc, 'Unknown weighttype', 'Weighttype ('+weighttype+') is unknown.', ''); return -1;
			}
		}
	}
	return -1;
}

//###################################################################
/**
 * Retrieves the molar extinction coefficent of an amino acid specified by id or shortcut
 * @param {String} aminoacid The aminoacids id or shortcut
 * @return The amino acids molar extinction coefficent or -1 on error
 */
mpimp.jsprot.XProtBase.prototype.getAminoAcidMec = function(aminoacid)
{
	var loc = 'mpimp.jsprot.XProtBase.getAminoAcidMec';
	
	for (var i=0,j=mpimp.jsprot.constants.AminoAcids.length; i<j; i++) {
		if (mpimp.jsprot.constants.AminoAcids[i].id === aminoacid ||
		mpimp.jsprot.constants.AminoAcids[i].shortcut === aminoacid) {
			return mpimp.jsprot.constants.AminoAcids[i].mec;
		}
	}
	return -1;
}


//###################################################################
/**
 * Retrieves the mass of an element specified by id or shortcut
 * @param {String} element The elements id or shortcut
 * @param {String} weighttype The weighttype to return the element mass of
 * @return The elements mass or -1 on error
 */
mpimp.jsprot.XProtBase.prototype.getElementMass = function(element, weighttype)
{
	var loc = 'mpimp.jsprot.XProtBase.getElementMass';
	
	for (var i=0,j=mpimp.jsprot.constants.Elements.length; i<j; i++) {
		if (mpimp.jsprot.constants.Elements[i].id === element ||
		mpimp.jsprot.constants.Elements[i].shortcut === element) {
			switch (weighttype) {
				case 'monoisotopic' : return mpimp.jsprot.constants.Elements[i].weight_monoiso;
				case 'average' : return mpimp.jsprot.constants.Elements[i].weight_ave;
				default : this.toLog('error', loc, 'Unknown weighttype', 'Weighttype ('+weighttype+') is unknown.', ''); return -1;
			}	
		}
	}
	return -1;
}


//###################################################################
/**
 * Retrieves the mass of an physics element specified by id or shortcut
 * @param {String} physics The physics elements id or shortcut
 * @param {String} weighttype The weighttype to return the element mass of
 * @return The physics mass or -1 on error
 */
mpimp.jsprot.XProtBase.prototype.getPhysicsMass = function(physics, weighttype)
{
	var loc = 'mpimp.jsprot.XProtBase.getPhysicsMass';
	
	for (var i=0,j=mpimp.jsprot.constants.Physics.length; i<j; i++) {
		if (mpimp.jsprot.constants.Physics[i].id === physics ||
		mpimp.jsprot.constants.Physics[i].shortcut === physics) {
			switch (weighttype) {
				case 'monoisotopic' : return mpimp.jsprot.constants.Physics[i].weight_monoiso;
				case 'average' : return mpimp.jsprot.constants.Physics[i].weight_ave;
				default : this.toLog('error', loc, 'Unknown weighttype', 'Weighttype ('+weighttype+') is unknown.', ''); return -1;
			}
		}
	}
	return -1;
}

//###################################################################
/**
 * Retrieves an modification object by accession
 * @param {String} accession The accession of the modification
 * @return The modification object
 */
mpimp.jsprot.XProtBase.prototype.getModification = function(accession)
{
	for (var i = 0, j = mpimp.jsprot.constants.Modifications.length; i < j; i++) {
		if (mpimp.jsprot.constants.Modifications[i].accession === accession) {
			return mpimp.jsprot.constants.Modifications[i];
		}
	}
	
	return null;
}

//###################################################################
/**
 * Retrieves the mass of an element specified by id or shortcut
 * @param {String} accession The accession of the modification
 * @param {String} aminoacid The modified amino acid
 * @param {Number} position The position of the amino acid in sequence (zero-based index)
 * @param {String} weighttype The weighttype to return the element mass of
 * @return The modification mass or -1 on error
 */
mpimp.jsprot.XProtBase.prototype.getModificationMass = function(accession, aminoacid, position, weighttype)
{
	var loc = 'mpimp.jsprot.XProtBase.getModificationMass';
	
	for (var i = 0, j = mpimp.jsprot.constants.Modifications.length; i < j; i++) {
		if (mpimp.jsprot.constants.Modifications[i].accession === accession) {
			if (mpimp.jsprot.constants.Modifications[i].mod_type === 'addition') {
				switch (weighttype) {
					case 'monoisotopic':
						return mpimp.jsprot.constants.Modifications[i].weight_monoiso;
					case 'average':
						return mpimp.jsprot.constants.Modifications[i].weight_ave;
					default:
						this.toLog('error', loc, 'Unknown weighttype', 'Weighttype ('+weighttype+') is unknown.', '');
				}
			}
			if (mpimp.jsprot.constants.Modifications[i].mod_type === 'subtraction') {
				switch (weighttype) {
					case 'monoisotopic':
						return (mpimp.jsprot.constants.Modifications[i].weight_monoiso) * (-1);
					case 'average':
						return (mpimp.jsprot.constants.Modifications[i].weight_ave) * (-1);
					default:
						this.toLog('error', loc, 'Unknown weighttype', 'Weighttype ('+weighttype+') is unknown.', '');
						return -1;
				}
			}
			if (mpimp.jsprot.constants.Modifications[i].mod_type === 'function') {
				return mpimp.jsprot.constants.Modifications[i].mod_function(aminoacid, position);
			}
		}
	}
	
	return -1;
}

//###################################################################
/**
 * Adds an entry to the internal log
 * @param {String} type The log type (error, message, action)
 * @param {String} location The trigger location
 * @param {String} title The title of the log entry
 * @param {String} body The body of the log entry
 * @param {String} number The id of the log entry
 * @protected
 */
mpimp.jsprot.XProtBase.prototype.toLog = function(type, location, title, body, number)
{
	this.log.push({
		type: type,
		location: location,
		title: title,
		body: body,
		number: number
	});
	
	if (typeof console !== 'undefined' && typeof console.log === 'function') {
		console.log('JsProt-'+type+': '+title+' --- '+body+' --- in '+location);
	}
	if (Ext.isAir === true) {
		air.trace('JsProt-'+type+': '+title+' --- '+body+' --- in '+location);
	}
	if (typeof wildpack !== 'undefined' && wildpack.ria && wildpack.ria.ExtRia && wildpack.ria.ExtRia.Log && typeof wildpack.ria.ExtRia.Log.addError === 'function') {
		wildpack.ria.ExtRia.Log.addError('JsProt-'+type+': '+title+' --- '+body+' --- in '+location);
	}
	
}
