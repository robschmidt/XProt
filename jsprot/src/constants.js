/* constants.js
 * 
 * This file contains constant data of amino acids and chemical elements
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.4
 * @package mpimp.jsprot
 * @subpackage
*/

Ext.namespace('mpimp.jsprot.constants');

//###################################################################
/**
 * The AminoAcids array contains all amino acids and its weights and additional information
 * Source: http://education.expasy.org/student_projects/isotopident/htdocs/aa-list.html
 * Source for mec: http://pubs.acs.org/doi/abs/10.1021/jf070337l?prevSearch=kuipers&searchHistoryKey=
 */
mpimp.jsprot.constants.AminoAcids = [
{
	"id" : "aa_A",
	"shortcut" : "A",
	"name" : "alanine",
	"weight_monoiso" : 71.03711,
	"weight_ave" : 71.0788,
	"15N_mass_add" : 0.99999,
	"mec" : 32
},
{	"id" : "aa_C",
	"shortcut" : "C",
	"name" : "cysteine",
	"weight_monoiso" : 103.00919,
	"weight_ave" : 103.1388,
	"15N_mass_add" : 0.99999,
	"mec" : 225
},
{	"id" : "aa_D",
	"shortcut" : "D",
	"name" : "aspartic acid",
	"weight_monoiso" : 115.02694,
	"weight_ave" : 115.0886,
	"15N_mass_add" : 0.99999,
	"mec" : 58
},
{	"id" : "aa_E",
	"shortcut" : "E",
	"name" : "glutamatic acid",
	"weight_monoiso" : 129.04259,
	"weight_ave" : 129.1155,
	"15N_mass_add" : 0.99999,
	"mec" : 78
},
{	"id" : "aa_F",
	"shortcut" : "F",
	"name" : "phenylalanine",
	"weight_monoiso" : 147.06841,
	"weight_ave" : 147.1766,
	"15N_mass_add" : 0.99999,
	"mec" : 5200
},
{	"id" : "aa_G",
	"shortcut" : "G",
	"name" : "glycine",
	"weight_monoiso" : 57.02146,
	"weight_ave" : 57.0519,
	"15N_mass_add" : 0.99999,
	"mec" : 21
},
{	"id" : "aa_H",
	"shortcut" : "H",
	"name" : "histidine",
	"weight_monoiso" : 137.05891,
	"weight_ave" : 137.1411,
	"15N_mass_add" : 2.99997,
	"mec" : 5125
},
{	"id" : "aa_I",
	"shortcut" : "I",
	"name" : "isoleucine",
	"weight_monoiso" : 113.08406,
	"weight_ave" : 113.1594,
	"15N_mass_add" : 0.99999,
	"mec" : 45
},
{	"id" : "aa_K",
	"shortcut" : "K",
	"name" : "lysine",
	"weight_monoiso" : 128.09496,
	"weight_ave" : 128.1741,
	"15N_mass_add" : 1.99998,
	"mec" : 41
},
{	"id" : "aa_L",
	"shortcut" : "L",
	"name" : "leucine",
	"weight_monoiso" : 113.08406,
	"weight_ave" : 113.1594,
	"15N_mass_add" : 0.99999,
	"mec" : 45
},
{	"id" : "aa_M",
	"shortcut" : "M",
	"name" : "methionine",
	"weight_monoiso" : 131.04049,
	"weight_ave" : 131.1926,
	"15N_mass_add" : 0.99999,
	"mec" : 980
},
{	"id" : "aa_N",
	"shortcut" : "N",
	"name" : "asparagine",
	"weight_monoiso" : 114.04293,
	"weight_ave" : 114.1038,
	"15N_mass_add" : 1.99998,
	"mec" : 136
},
{	"id" : "aa_P",
	"shortcut" : "P",
	"name" : "proline",
	"weight_monoiso" : 97.05276,
	"weight_ave" : 97.1167,
	"15N_mass_add" : 0.99999,
	"mec" : 2675 //P1 = 30
},
{	"id" : "aa_Q",
	"shortcut" : "Q",
	"name" : "glutamine",
	"weight_monoiso" : 128.05858,
	"weight_ave" : 128.1307,
	"15N_mass_add" : 1.99998,
	"mec" : 142
},
{	"id" : "aa_R",
	"shortcut" : "R",
	"name" : "arginine",
	"weight_monoiso" : 156.10111,
	"weight_ave" : 156.1875,
	"15N_mass_add" : 3.99996,
	"mec" : 102
},
{	"id" : "aa_S",
	"shortcut" : "S",
	"name" : "serine",
	"weight_monoiso" : 87.03203,
	"weight_ave" : 87.0782,
	"15N_mass_add" : 0.99999,
	"mec" : 34
},
{	"id" : "aa_T",
	"shortcut" : "T",
	"name" : "threonine",
	"weight_monoiso" : 101.04768,
	"weight_ave" : 101.1051,
	"15N_mass_add" : 0.99999,
	"mec" : 41
},
{	"id" : "aa_U",
	"shortcut" : "U",
	"name" : "selenocysteine",
	"weight_monoiso" : 150.9536355878,
	"weight_ave" : 150.03790,
	"15N_mass_add" : 0.99999,
	"mec" : 0
},
{	"id" : "aa_V",
	"shortcut" : "V",
	"name" : "valine",
	"weight_monoiso" : 99.06841,
	"weight_ave" : 99.1326,
	"15N_mass_add" : 0.99999,
	"mec" : 43
},
{	"id" : "aa_W",
	"shortcut" : "W",
	"name" : "tryptophan",
	"weight_monoiso" : 186.07931,
	"weight_ave" : 186.2132,
	"15N_mass_add" : 1.99998,
	"mec" : 29050
},
{	"id" : "aa_Y",
	"shortcut" : "Y",
	"name" : "tyrosine",
	"weight_monoiso" : 163.06333,
	"weight_ave" : 163.1760,
	"15N_mass_add" : 0.99999,
	"mec" : 5375
}];

//###################################################################
/**
 * The elements array contains chemical elements and their weights
 */
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
/**
 * The elemtents array contains physical elements and their weights
 */
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
/**
 * The Modifications array contains all possible modifications
 * Based on: http://www.unimod.org
 * mod_target possible values: "X" = a single amino acid; "X,Y,Z" = amino acid X or Y or Z; "?" = any valid amino acid; 
 * "X+Y+Z" = amino acid X and Y and Z; "*" = all valid amino acids
 * The first three mod_target values target a single amino acid, the last two target several or all amino acids
 * mod_type possible values: "addition", "subtraction", "function"
 * mod_function returns the mass (might be negative) to add to the sequence mass
 */
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
/**
 * The modificationsflags array contains all known flags for modifications for usage within a peptide sequence. Each flag is mapped to
 * a corresponding modification accession number. Explanation of modification flag entry attributes:
 * flag: The flag to search for as normal string
 * regexpattern: The flag to search for as pattern for regular expression, means all regex metacharacters (^, *, (, ... ) must be masked by \
 * accession: The accession number, this flag belongs to
 * target: The flags target amino acid
 */
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

	