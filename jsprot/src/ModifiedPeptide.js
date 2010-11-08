/**
 * ModifiedPeptide.js
 * 
 * This file contains the ModifiedPeptide class which, when implemented represents a single peptide with modifications
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
mpimp.jsprot.ModifiedPeptide = function(config)
{
	this.Modifications = [];
	mpimp.jsprot.ModifiedPeptide.superclass.constructor.call(this, config);
}

mpimp.jsprot.ModifiedPeptide = Ext.extend(mpimp.jsprot.ModifiedPeptide, mpimp.jsprot.Peptide,
{
	//###################################################################
	/**
	 * Retrieves the index mass including all modifications
	 * @param {String} weighttype The weighttype to use for masses
	 * @param {Number} index The index of the amino acid in sequence
	 * @return The total mass of the amino acid including all modifications
	 */
	getIndexMass: function(weighttype, index)
	{
		var loc = 'mpimp.jsprot.ModifiedPeptide.getMass';
		var arrModifications;
		var dblAddMass = 0;
		var dblMass;
		var objMod;
		var strAa;
		
		if (!this.Sequence || this.Sequence === '') {
			this.toLog('error', loc, 'Sequence not set', 'Failed to get modification for index. Sequence not set yet.', '');
			return;
		}
		if (index >= this.Sequence.length) {
			this.toLog('error', loc, 'Index out of bounds', 'Specified index is out of sequence bounds.', '');
			return -1;
		}
		
		strAa = this.Sequence.substr(index, 1);
		dblMass = mpimp.jsprot.ModifiedPeptide.superclass.getIndexMass.call(this, weighttype, index);
		arrModifications = this.getIndexModifications(index, weighttype);
		
		for (var i=0, j=arrModifications.length; i<j; i++) {
			objMod = arrModifications[i];
			dblMassTemp = this.getModificationMass(objMod.accession, strAa, index, weighttype);
			dblAddMass += this.getModificationMass(objMod.accession, strAa, index, weighttype);
		}
		
		return dblMass+dblAddMass;
	}
});

//###################################################################
/**
 * Adds 15N modifications for all amino acids
 */
mpimp.jsprot.ModifiedPeptide.prototype.add15NModifications = function()
{
	var loc = 'mpimp.jsprot.ModifiedPeptide.add15NModifications';
	var strAa;
	
	if (!this.Sequence || this.Sequence === '') {
		this.toLog('error', loc, 'Sequence not set', 'Failed to add 15N modifications. Sequence not set yet.', '');
		return;
	}
	
	for (var i=0,j=this.Sequence.length; i<j; i++) {
		strAa = this.Sequence[i];
		this.addModification({
			accession: 99000,
			position: i
		});
	}
}

//###################################################################
/**
 * Adds a modification to the peptide
 * @param {Object} modification The modification object with the following attributes:
 * accession: The modifications accession number
 * position: The position of the modified amino acid starting with 0
 */
mpimp.jsprot.ModifiedPeptide.prototype.addModification = function(modification)
{
	this.Modifications.push(modification);
}

//###################################################################
/**
 * Retrieves all modifications of an amino acid specified by index in sequence
 * @param {Number} index The index of the amino acid in sequence
 * @param {String} weighttype The weighttypeof the modification mass to retrieve
 * @return Returns an array of 
 */
mpimp.jsprot.ModifiedPeptide.prototype.getIndexModifications = function(index, weighttype)
{
	var loc = 'mpimp.jsprot.ModifiedPeptide.getIndexModifications';
	var arrReturn = [];
	var intAcc;
	var strAa;
	
	if (!this.Sequence || this.Sequence === '') {
		this.toLog('error', loc, 'Sequence not set', 'Failed to get modification for index. Sequence not set yet.', '');
		return;
	}
	if (index >= this.Sequence.length) {
		this.toLog('error', loc, 'Index out of bounds', 'Specified index is out of sequence bounds.', '');
		return -1;
	}
	strAa = this.Sequence.substr(index, 1);
	
	for (var i=0, j=this.Modifications.length; i<j; i++) {
		if (this.Modifications[i].position === index) {
			intAcc = this.Modifications[i].accession;
			objMod = this.getModification(intAcc);
			Ext.apply(objMod, {
				aminoacid: strAa,
				weighttype: weighttype,
				index: index
			});
			arrReturn.push(objMod);
		}
	}
	
	return arrReturn;
}

//###################################################################
/**
 * Use this method to parse a sequence with included modification marks in order to get the naked sequence as well as all of the modifications.
 * @param {String} modifiedsequence The modified sequence
 * @return True if successully processed, false else. If method finish without errors, the Sequence attribute will be set 
 * and the the modifications added
 */
mpimp.jsprot.ModifiedPeptide.prototype.setModifiedSequence = function(modifiedsequence)
{
	var loc = 'mpimp.jsprot.ModifiedPeptide.setModifiedSequence';
	var strModSeqAcc = modifiedsequence;
	
	var arrModFlags = mpimp.jsprot.constants.ModificationFlags;
	for (var i=0,j=arrModFlags.length; i<j; i++) {
		strFlag = arrModFlags[i].flag;
		strRg = arrModFlags[i].regexpattern;
		numAcc = arrModFlags[i].accession;
		strTarget = arrModFlags[i].target;
		strModSeqAcc = strModSeqAcc.replace(new RegExp(strRg, 'g') , 'Xacc:'+String(numAcc)+',aa:'+strTarget+'X');
	}
	
	intPos = strModSeqAcc.indexOf('Xacc:');
	intEndPos = 0;	
	while (intPos > -1) {
		intEndPos = strModSeqAcc.indexOf('X', intPos+3)+1;
		if (intEndPos === -1) {
			this.Modifications = []; //Cleanup
			this.toLog('error', loc, 'End tag missing', 'Parse error: Modifications end tag (X) is missing.', '');
			return false;
		}
		strTag = strModSeqAcc.substring(intPos, intEndPos);
		strAcc = strTag.substring(5, strTag.indexOf(','));
		numAcc = parseInt(strAcc);
		strTarget = strTag.substring(strTag.indexOf(',aa:')+4, strTag.length-1);
		if (isNaN(numAcc) === true) {
			this.Modifications = []; //Cleanup
			this.toLog('error', loc, 'Invalid accession', 'Parse error: Accession is not of type number.', '');
			return false;
		}
		
		this.addModification({
			accession: numAcc,
			position: intPos
		});
		
		strModSeqAcc = strModSeqAcc.replace(strTag, strTarget);
		intPos = strModSeqAcc.indexOf('Xacc:');
	}
	
	blnCheck = this.validateSequence(strModSeqAcc);
	if (blnCheck !== true) {
		this.Modifications = []; //Cleanup
		this.toLog('error', loc, 'Invalid peptide sequence', 'Parse error: Validation of naked sequence failed: '+strModSeqAcc, '');
		return false;
	}
	
	this.Sequence = strModSeqAcc;
	return true;
}
