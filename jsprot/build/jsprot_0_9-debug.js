/*
 * jsprot 0.9
 * Copyright(c) 2006, Robert Schmidt.
 * 
 * This code is licensed under MITlicense. Use it as you wish, 
 * but keep this copyright intact.
 */



Ext.namespace('mpimp.jsprot.constants');

//###################################################################

mpimp.jsprot.constants.AminoAcids = [
{
	"id" : "aa_A",
	"shortcut" : "A",
	"name" : "alanine",
	"weight_monoiso" : 71.03711,
	"weight_ave" : 71.0788,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_C",
	"shortcut" : "C",
	"name" : "cysteine",
	"weight_monoiso" : 103.00919,
	"weight_ave" : 103.1388,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_D",
	"shortcut" : "D",
	"name" : "aspartic acid",
	"weight_monoiso" : 115.02694,
	"weight_ave" : 115.0886,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_E",
	"shortcut" : "E",
	"name" : "glutamatic acid",
	"weight_monoiso" : 129.04259,
	"weight_ave" : 129.1155,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_F",
	"shortcut" : "F",
	"name" : "phenylalanine",
	"weight_monoiso" : 147.06841,
	"weight_ave" : 147.1766,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_G",
	"shortcut" : "G",
	"name" : "glycine",
	"weight_monoiso" : 57.02146,
	"weight_ave" : 57.0519,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_H",
	"shortcut" : "H",
	"name" : "histidine",
	"weight_monoiso" : 137.05891,
	"weight_ave" : 137.1411,
	"15N_mass_add" : 2.99997
},
{	"id" : "aa_I",
	"shortcut" : "I",
	"name" : "isoleucine",
	"weight_monoiso" : 113.08406,
	"weight_ave" : 113.1594,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_K",
	"shortcut" : "K",
	"name" : "lysine",
	"weight_monoiso" : 128.09496,
	"weight_ave" : 128.1741,
	"15N_mass_add" : 1.99998
},
{	"id" : "aa_L",
	"shortcut" : "L",
	"name" : "leucine",
	"weight_monoiso" : 113.08406,
	"weight_ave" : 113.1594,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_M",
	"shortcut" : "M",
	"name" : "methionine",
	"weight_monoiso" : 131.04049,
	"weight_ave" : 131.1926,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_N",
	"shortcut" : "N",
	"name" : "asparagine",
	"weight_monoiso" : 114.04293,
	"weight_ave" : 114.1038,
	"15N_mass_add" : 1.99998
},
{	"id" : "aa_P",
	"shortcut" : "P",
	"name" : "proline",
	"weight_monoiso" : 97.05276,
	"weight_ave" : 97.1167,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_Q",
	"shortcut" : "Q",
	"name" : "glutamine",
	"weight_monoiso" : 128.05858,
	"weight_ave" : 128.1307,
	"15N_mass_add" : 1.99998
},
{	"id" : "aa_R",
	"shortcut" : "R",
	"name" : "arginine",
	"weight_monoiso" : 156.10111,
	"weight_ave" : 156.1875,
	"15N_mass_add" : 3.99996
},
{	"id" : "aa_S",
	"shortcut" : "S",
	"name" : "serine",
	"weight_monoiso" : 87.03203,
	"weight_ave" : 87.0782,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_T",
	"shortcut" : "T",
	"name" : "threonine",
	"weight_monoiso" : 101.04768,
	"weight_ave" : 101.1051,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_U",
	"shortcut" : "U",
	"name" : "selenocysteine",
	"weight_monoiso" : 150.9536355878,
	"weight_ave" : 150.03790,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_V",
	"shortcut" : "V",
	"name" : "valine",
	"weight_monoiso" : 99.06841,
	"weight_ave" : 99.1326,
	"15N_mass_add" : 0.99999
},
{	"id" : "aa_W",
	"shortcut" : "W",
	"name" : "tryptophan",
	"weight_monoiso" : 186.07931,
	"weight_ave" : 186.2132,
	"15N_mass_add" : 1.99998
},
{	"id" : "aa_Y",
	"shortcut" : "Y",
	"name" : "tyrosine",
	"weight_monoiso" : 163.06333,
	"weight_ave" : 163.1760,
	"15N_mass_add" : 0.99999
}];

//###################################################################

mpimp.jsprot.constants.Elements = [
{
	"id" : "elem_H",
	"shortcut" : "H",
	"name" : "Hydrogen",
	"weight_monoiso" : 1.0078250321,
	"weight_ave" : 1.00794
},{	
	"id" : "elem_C",
	"shortcut" : "C",
	"name" : "Carbon",
	"weight_monoiso" : 12.0000000000,
	"weight_ave" : 12.0107
},{
	"id" : "elem_N",
	"shortcut" : "N",
	"name" : "Nitrogen",
	"weight_monoiso" : 14.0030740052,
	"weight_ave" : 14.0067
},{
	"id" : "elem_O",
	"shortcut" : "O",
	"name" : "Oxygen",
	"weight_monoiso" : 15.9949146221,
	"weight_ave" : 15.9994
},{
	"id" : "elem_S",
	"shortcut" : "S",
	"name" : "Sulfur",
	"weight_monoiso" : 31.97207069,
	"weight_ave" : 32.065
}];

//###################################################################

mpimp.jsprot.constants.Physics = [
{
	"id" : "phys_P",
	"shortcut" : "P",
	"name" : "Proton",
	"weight_monoiso" : 1.0072764669,
	"weight_ave" : 1.0072764669
},{	
	"id" : "phys_N",
	"shortcut" : "N",
	"name" : "Neutron",
	"weight_monoiso" : 1.0086649156,
	"weight_ave" : 1.0086649156
},{
	"id" : "phys_E",
	"shortcut" : "E",
	"name" : "Electron",
	"weight_monoiso" : 0.0005485799,
	"weight_ave" : 0.0005485799
}];


//###################################################################

mpimp.jsprot.constants.Modifications = [
{
	"accession" : 21,
	"name" : "Phospho",
	"description" : "Phosphorylation",
	"weight_monoiso" : 79.966331,
	"weight_ave" : 79.9799,
	"mod_target" : "S,T,Y",	//S or T or Y
	"mod_type" : 'addition'
},{
	"accession" : 4,
	"name" : "Carbamidomethyl",
	"description" : "Carbamidomethyl",
	"weight_monoiso" : 57.021464,
	"weight_ave" : 57.0513,
	"mod_target" : "C",
	"mod_type" : 'addition'
},{
	"accession" : 35,
	"name" : "Oxidation",
	"description" : "Oxidation or Hydroxylation",
	"weight_monoiso" : 15.994915,
	"weight_ave" : 15.9994,
	"mod_target" : "M",
	"mod_type" : 'addition'
},{
	"accession" : 99000,
	"name" : "15N_X",
	"description" : "Xx15N",
	"weight_monoiso" : -1,
	"weight_ave" : -1,
	"mod_target" : "*",
	"mod_type" : 'function',
	"mod_function" : function(aminoacid, position) {
		switch(aminoacid) {
			case 'R' : return 3.99996;
			case 'H' : return 2.99997;
			case 'K' : return 1.99998;
			case 'N' : return 1.99998;
			case 'Q' : return 1.99998;
			case 'W' : return 1.99998;
			default : return 0.99999;
		}
	}
},{
	"accession" : 99001,
	"name" : "15N_1",
	"description" : "1x15N",
	"weight_monoiso" : 0.99999,
	"weight_ave" : 0.99999,
	"mod_target" : "A,D,C,E,G,I,L,M,F,P,S,T,Y,V",
	"mod_type" : 'addition'
},{
	"accession" : 99002,
	"name" : "15N_2",
	"description" : "2x15N",
	"weight_monoiso" : 1.99998,
	"weight_ave" : 1.99998,
	"mod_target" : "K,N,Q,W",
	"mod_type" : 'addition'
},{
	"accession" : 99003,
	"name" : "15N_3",
	"description" : "3x15N",
	"weight_monoiso" : 2.99997,
	"weight_ave" : 2.99997,
	"mod_target" : "H",
	"mod_type" : 'addition'
},{
	"accession" : 99004,
	"name" : "15N_4",
	"description" : "4x15N",
	"weight_monoiso" : 3.99996,
	"weight_ave" : 3.99996,
	"mod_target" : "R",
	"mod_type" : 'addition'
}];

//###################################################################

mpimp.jsprot.constants.ModificationFlags = [
{ "flag" : "(oxM)", regexpattern: "\\(oxM\\)", "accession" : 35, target: "M" },
{ "flag" : "M*", regexpattern: "M\\*", "accession" : 35, target: "M" },
{ "flag" : "(*C)", regexpattern: "\\(\\*C\\)", "accession" : 4, target: "C" },
{ "flag" : "M#", regexpattern: "M#", "accession" : 35, target: "M" },
{ "flag" : "S#", regexpattern: "S#", "accession" : 21, target: "S" },
{ "flag" : "T#", regexpattern: "T#", "accession" : 21, target: "T" },
{ "flag" : "Y#", regexpattern: "Y#", "accession" : 21, target: "Y" },
{ "flag" : "S@", regexpattern: "S@", "accession" : 21, target: "S" },
{ "flag" : "T@", regexpattern: "T@", "accession" : 21, target: "T" },
{ "flag" : "Y@", regexpattern: "Y@", "accession" : 21, target: "Y" },
{ "flag" : "S^", regexpattern: "S\\^", "accession" : 21, target: "S" },
{ "flag" : "T^", regexpattern: "T\\^", "accession" : 21, target: "T" },
{ "flag" : "Y^", regexpattern: "Y\\^", "accession" : 21, target: "Y" },
{ "flag" : "(pS)", regexpattern: "\\(pS\\)", "accession" : 21, target: "S" },
{ "flag" : "(pT)", regexpattern: "\\(pT\\)", "accession" : 21, target: "T" },
{ "flag" : "(pY)", regexpattern: "\\(pY\\)", "accession" : 21, target: "Y" },
{ "flag" : "(s)", regexpattern: "\\(s\\)", "accession" : 21, target: "S" },
{ "flag" : "(t)", regexpattern: "\\(t\\)", "accession" : 21, target: "T" },
{ "flag" : "(y)", regexpattern: "\\(y\\)", "accession" : 21, target: "Y" },
{ "flag" : "(S)", regexpattern: "\\(S\\)", "accession" : 21, target: "S" },
{ "flag" : "(T)", regexpattern: "\\(T\\)", "accession" : 21, target: "T" },
{ "flag" : "(Y)", regexpattern: "\\(Y\\)", "accession" : 21, target: "Y" }];

	



Ext.namespace('mpimp.jsprot');

//###################################################################

mpimp.jsprot.XProtBase = function(config)
{
	// private
	this.log = [];
}

//###################################################################

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




Ext.namespace('mpimp.jsprot');

//###################################################################

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

mpimp.jsprot.Peptide.prototype.getTheoreticalMCR = function(weighttype, charge)
{
	var dblPepMass = this.getMass(weighttype);
	return (dblPepMass+1) / charge;
}

//###################################################################

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

//###################################################################

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

mpimp.jsprot.Peptide.prototype.validateSequence = function(sequence)
{
	var numReturn = sequence.search(/[^ARNDCEQGHILKMFPSTWYV]/g);

	if (numReturn > -1) {
		return false;
	}
	
	return true;
}



Ext.namespace('mpimp.jsprot');

//###################################################################

mpimp.jsprot.ModifiedPeptide = function(config)
{
	this.Modifications = [];
	mpimp.jsprot.ModifiedPeptide.superclass.constructor.call(this, config);
}

mpimp.jsprot.ModifiedPeptide = Ext.extend(mpimp.jsprot.ModifiedPeptide, mpimp.jsprot.Peptide,
{
	//###################################################################
	
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

mpimp.jsprot.ModifiedPeptide.prototype.addModification = function(modification)
{
	this.Modifications.push(modification);
}

//###################################################################

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



Ext.namespace('mpimp.jsprot.peptide');

//###################################################################

mpimp.jsprot.peptide.IonCalculator = function(config)
{
	
	this.peptide = null;
	
	
	this.maxcharge = 1;
	
	
	this.weighttype = 'monoisotopic';
	
	
	this.neutralloss = [];
	
	
	this.neutralgain = [];
	
	
	this.customtemplate = null;
	
	
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


Ext.namespace('mpimp.jsprot.peptide');

//###################################################################

mpimp.jsprot.peptide.Spectrum = function(config)
{
	
	this.spectrum = [];
	
	
	this.peptide = null;
	
	Ext.apply(this, config);
}

//###################################################################

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

mpimp.jsprot.peptide.Spectrum.prototype.setSpectrumByString = function(spectrum, valueseparator, entryseparator)
{
	var loc = 'mpimp.jsprot.peptide.Spectrum.setSpectrumByString';
	
	arrReturn = [];
	
	if (!spectrum || spectrum === '') {
		this.toLog('error', loc, 'USpectrum not valid', 'The specified spectrum is not a valid string.', '');
		return false
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


Ext.namespace('mpimp.jsprot.ui');

//###################################################################

mpimp.jsprot.ui.Spectrum = function(config)
{
	
	this.drawer = null;
	
	
	this.renderTo = null;
	
	
	this.spectrum = [];
	
	
	this.massproperty = 'mass';
	
	
	this.intensityproperty = 'intensity';
	
	
	this.annotationproperty = 'annotation';
	
	Ext.apply(this, config);
	
	if (this.drawer && typeof this.drawer.init === 'function') {
		return this.drawer.init(this);
	}
	
	mpimp.jsprot.ui.Spectrum.superclass.constructor.call(this, {});
}

mpimp.jsprot.ui.Spectrum = Ext.extend(mpimp.jsprot.ui.Spectrum, mpimp.jsprot.XProtBase, {});

//###################################################################

mpimp.jsprot.ui.Spectrum.prototype.draw = function()
{
	var loc = 'mpimp.jsprot.ui.Spetrum.draw';
	
	if (this.drawer && typeof this.drawer.draw === 'function') {
		return this.drawer.draw();
	} else {
		this.toLog('error', loc, 'Invalid drawer object', 'The provided drawer is not valid (missing draw function?!).', '');
	}
}



Ext.namespace('mpimp.jsprot.ui.spectrum');

//###################################################################

mpimp.jsprot.ui.spectrum.GoogleVisDrawer = function(config)
{
	
	this.width = 600;
	
	
	this.height = 300;
		
	
	this.colors = ['#888', '#00f'];
	
	
	this.legend = 'none';
	
	
	this.isVertical = false;
	
	
	this.showValueLabels = true;
	
	
	this.showCategoryLabels = true;
	
	
	this.title = null;
	
	Ext.apply(this, config);
	
	this.spectrum = null;
}

//###################################################################

mpimp.jsprot.ui.spectrum.GoogleVisDrawer.prototype.init = function(spectrum)
{
	if (!google || !google.visualization) {
		return false;
	}
	
	this.spectrum = spectrum;
}

//###################################################################

mpimp.jsprot.ui.spectrum.GoogleVisDrawer.prototype.draw = function()
{
	var strAnnot;
	var dblInt;
	var dblMass;
	
	//-- Google visualisation --
	if (!google || !google.visualization) {
		return false;
	}
	
	var arrSpectrum = this.spectrum.spectrum;

	var objDataTab = new google.visualization.DataTable();
	objDataTab.addColumn('string', 'Mass');
	objDataTab.addColumn('number', 'Intensity');
	objDataTab.addColumn('number', 'Intensity with ion annotation');
	objDataTab.addRows(arrSpectrum.length);
	
	var arrTemp;
	for (var i=0; i<arrSpectrum.length; i++) {
		strAnnot = arrSpectrum[i][this.spectrum.annotationproperty];
		dblInt = arrSpectrum[i][this.spectrum.intensityproperty];
		dblMass = arrSpectrum[i][this.spectrum.massproperty];
		
		
		if (strAnnot && strAnnot !== '') {
			objDataTab.setValue(i, 0, strAnnot+' '+String(dblMass));
			objDataTab.setValue(i, 1, 0);
			objDataTab.setValue(i, 2, dblInt);
		} else {
			objDataTab.setValue(i, 0, String(dblMass));
			objDataTab.setValue(i, 1, dblInt);
			objDataTab.setValue(i, 2, 0);
		}
	}
	
	var objChart = new google.visualization.ColumnChart(this.spectrum.renderTo);
	objChart.draw(objDataTab, this);
}


