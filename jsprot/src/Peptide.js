/**
 * Peptide.js
 * 
 * This file contains the peptide class which, when implemented represents a single peptide
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.3
 * @package mpimp.jsprot
 * @subpackage
*/


Ext.namespace('mpimp.jsprot');

//###################################################################
/**
 * The class constructor
 * @param {object} config The configuration object
 */
mpimp.jsprot.Peptide = function(config)
{
	if (!config) {
		config = {sequence:''};
	}
	
	this.Sequence = config.sequence ? String(config.sequence) : '';
	this.NTerminus = '';
	this.CTerminus = '';
	
	mpimp.jsprot.Peptide.superclass.constructor.call(this, {});
}

mpimp.jsprot.Peptide = Ext.extend(mpimp.jsprot.Peptide, mpimp.jsprot.XProtBase, {});

//###################################################################
/**
 * Retrieves the mass of an amino acid in sequence specified by index
 * @param {String} weighttype The weighttype to use (monoisotopic or average)
 * @param {Number} index The zero-based index of the amino acid in the sequence
 * @return {Number} Either the monoisotopic or the average mass of the peptide
 */
mpimp.jsprot.Peptide.prototype.getIndexMass = function(weighttype, index)
{
	var loc = 'mpimp.jsprot.Peptide.getIndexMass';
	var strAa;
	
	if (index >= this.Sequence.length) {
		this.toLog('error', loc, 'Index out of bounds', 'Specified index is out of sequence bounds.', '');
		return -1;
	}
	strAa = this.Sequence.substr(index, 1);
	
	return this.getAminoAcidMass(strAa, weighttype);
}

//###################################################################
/**
 * Retrieves the theoretical mass / z 
 * @param {String} weighttype The weight type to use for calculation (monoisotopic or average)
 * @param {Number} charge The charge (z) to use for calculation
 * @return {Number} The theoretical mass or -1 on error
 */
mpimp.jsprot.Peptide.prototype.getTheoreticalMCR = function(weighttype, charge)
{
	var dblPepMass = this.getMass(weighttype);
	return (dblPepMass+1) / charge;
}

//###################################################################
/**
 * Retrieves the mass of the C-Terminus 
 * @param {String} weighttype The weighttype to use for calculation (monoisotopic or average)
 * @return {Number} The mass of the C-Terminus or -1 on error
 */
mpimp.jsprot.Peptide.prototype.getCTerminusMass = function(weighttype)
{
	var loc = 'mpimp.jsprot.Peptide.getCTerminusMass';
	
	if (this.CTerminus !== '') {
		return this.getFormulaMass(this.CTerminus, weighttype);
	}
	this.toLog('error', loc, 'CTerminus not set', 'Failed to calculate the CTerminus mass. CTerminus not set.', '');
	return -1;
}

//###################################################################
/**
 * Retrieves the calculated mass of this peptide
 * @param {String} weighttype The weighttype to use for calculation (monoisotopic or average)
 * @return {Number} The theoretical peptide mass or -1 on error
 */
mpimp.jsprot.Peptide.prototype.getMass = function(weighttype)
{
	var loc = 'mpimp.jsprot.Peptide.getMass';
	
	var dblMass = 0;
	var dblTempMass = 0;
	var strAa;
	
	if (!this.Sequence || this.Sequence === '') {
		return 0;
	}
	
	//-- Terminus masses --
	if (this.NTerminus !== '') {
		dblTempMass = this.getFormulaMass(this.NTerminus, weighttype);
		if (dblTempMass === -1) {
			this.toLog('error', loc, 'Method error', 'Method (this.getFormulaMass) failed to complete successfully for NTerminus: '+this.NTerminus, '');
			return -1
		}
		dblMass += dblTempMass;
	}
	if (this.CTerminus !== '') {
		dblTempMass = this.getFormulaMass(this.CTerminus, weighttype);
		if (dblTempMass === -1) {
			this.toLog('error', loc, 'Method error', 'Method (this.getFormulaMass) failed to complete successfully for CTerminus: '+this.CTerminus, '');
			return -1
		}
		dblMass += dblTempMass;
	}
	
	//-- Amino acids --
	for (var i=0,j=this.Sequence.length; i<j; i++) {
		strAa = this.Sequence[i];
		dblTempMass = this.getIndexMass(weighttype, i);
		dblMass += dblTempMass;
	}
	
	return dblMass;
}

/**
 * Retrieves the molar extinction coefficent (molar absorption coefficent)
 * It is based on: http://pubs.acs.org/doi/abs/10.1021/jf070337l?prevSearch=kuipers&searchHistoryKey=
 * @return The MEC or -1 on error
 */
mpimp.jsprot.Peptide.prototype.getMec = function()
{
	if (!this.Sequence || this.Sequence === '') {
		return -1;
	}
	
	var intCoefPeptide = 923 * this.Sequence.length;
	
	
	
};

//###################################################################
/**
 * Retrieves the mass of the N-Terminus
 * @param {String} weighttype The weighttype to use for calculation (monoisotopic or average)
 * @return {Number} The mass of the N-Terminus or -1 on error
 */
mpimp.jsprot.Peptide.prototype.getNTerminusMass = function(weighttype)
{
	var loc = 'mpimp.jsprot.Peptide.getNTerminusMass';
	
	if (this.NTerminus !== '') {
		return this.getFormulaMass(this.NTerminus, weighttype);
	}
	this.toLog('error', loc, 'NTerminus not set', 'Failed to calculate the NTerminus mass. NTerminus not set.', '');
	return -1;
}

//###################################################################
/**
 * Validates a sequnece (checks for non amino-acids and special characters)
 * @param {String} sequence The sequnece to check for validation
 */
mpimp.jsprot.Peptide.prototype.validateSequence = function(sequence)
{
	var numReturn = sequence.search(/[^ARNDCEQGHILKMFPSTWYV]/g);

	if (numReturn > -1) {
		return false;
	}
	
	return true;
}