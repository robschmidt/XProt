/**
 * Spectrum.js
 * 
 * This file contains the Spectrum class which when implemented represents a peptide spectrum
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.jsprot
 * @subpackage peptide
*/

Ext.namespace('mpimp.jsprot.peptide');

//###################################################################
/**
 * @class mpimp.jsprot.peptide.Spectrum
 * The Spectrum class represents a peptide spectrum
 * @constructor
 * @param {object} config The configuration object
 */
mpimp.jsprot.peptide.Spectrum = function(config)
{
	/**
	 * @cfg {Array} spectrum
	 * The spectrum can be set initially as an array of (objects containg properties mass and intensity) e.g. [{mass: 234.56, intensity: 4.5},...]
	 */
	this.spectrum = [];
	
	/**
	 * @cfg {Object} peptide
	 * A peptide object the spectrum belongs to
	 */
	this.peptide = null;
	
	Ext.apply(this, config);
}

//###################################################################
/**
 * Annotates the specified spectrum on mass base. This function compares masses from the specified spectrum with the annotation array masses.
 * On match, the sequence will be annotated with the annoations from annotation array.
 * @param {Object} annotations An array of objects containing properties for mass, intensity and annotation
 * @param {Object} massprop The objects property where the mass can be found
 * @param {Object} intensityprop The objects property where the intensity can be found
 * @param {Object} annotationprop The objects property where the annotation can be found
 * @param {Object} threshold The mass threshold to use when comparing with the spectrum
 * @param {Object} thresholdtype The mass treshold type ('percent', 'ppm' or 'da')
 * @return Returns an array of objects similar to the objects of the provided annotations array with the same properties. The return array contains ALL
 * mass/intensity pairs from the original spectrum but the matching pairs are annotated.
 */
mpimp.jsprot.peptide.Spectrum.prototype.annotateSpectrum = function(annotations, massprop, intensityprop, annotationprop, threshold, thresholdtype)
{
	var arrReturn = [];
	var dblFactor;
	var dblInt;
	var dblMass;
	var dblMassMax;
	var dblMassMin;
	var k;
	var l = annotations.length;
	var varEntry;
	
	if (thresholdtype === 'da') {
		dblFactor = threshold;
	}
	
	for (var i=0,j= this.spectrum.length; i<j; i++) {
		dblMass = this.spectrum[i].mass;
		dblInt = this.spectrum[i].intensity;
		
		if (thresholdtype === 'ppm') {
			dblFactor = 0.000001 * threshold * dblMass;
		}
		if (thresholdtype === 'percent') {
			dblFactor = 0.01 * threshold * dblMass;
		}
		
		dblMassMin = dblMass - dblFactor;
		dblMassMax = dblMass + dblFactor;

		strAnnot = '';
		for (k=0; k<l; k++) {
			varEntry = annotations[k];
			
			if (varEntry[massprop] >= dblMassMin && varEntry[massprop] <= dblMassMax) {
				strAnnot += varEntry[annotationprop]+' ';
			}
		}
		
		if (strAnnot !== '') {
			strAnnot = strAnnot.substr(0, strAnnot.length-1);
		}
		
		varTemp = {};
		varTemp[massprop] = dblMass;
		varTemp[intensityprop] = dblInt;
		varTemp[annotationprop] = strAnnot;
		arrReturn.push(varTemp);
	}
	
	return arrReturn;
}

//###################################################################
/**
 * Reads a spectrum from a string
 * @param {String} spectrum The string to read the spectrum from
 * @param {String} valueseparator The string separating the mass and intensity value. Default is ":"
 * @param {String} entryseparator The string separating the spectrum entries. Default is " "
 * @return True on success, false on error
 */
mpimp.jsprot.peptide.Spectrum.prototype.setSpectrumByString = function(spectrum, valueseparator, entryseparator)
{
	var loc = 'mpimp.jsprot.peptide.Spectrum.setSpectrumByString';
	
	arrReturn = [];
	
	if (!spectrum || spectrum === '') {
		this.toLog('error', loc, 'USpectrum not valid', 'The specified spectrum is not a valid string.', '');
		return false;
	}
	
	var mass = 0;
	var inte = 0;
	var entry = '';
	var arrEntry = null;
	var arrEntries = spectrum.split(entryseparator);
	for (var i=0,j=arrEntries.length; i<j; i++) {
		entry = arrEntries[i];
		if (entry.indexOf(valueseparator) < 0) {
			this.toLog('error', loc, 'Invalid spectrum entry', 'An invalid spectrum entry was found during parse.', '');
			return false;
		}
		
		arrEntry = entry.split(valueseparator);
		if (arrEntry.length !== 2) {
			this.toLog('error', loc, 'Invalid number of values', 'A spectrum entry with more or less values than 2 detected. Spectrum entries must contain only two values (mass and intensity).', '');
			return false;
		}
		
		mass = parseFloat(arrEntry[0]);
		inte = parseFloat(arrEntry[1]);
		
		if (isNaN(mass) === true || isNaN(inte) === true) {
			this.toLog('error', loc, 'Non-numeric value', 'A non-numeric value (mass or intensity) has been detected while parsing.', '');
			return false;
		}
		
		arrReturn.push({
			mass: mass,
			intensity: inte
		});
	}
	
	this.spectrum = arrReturn;
	return true;	
}