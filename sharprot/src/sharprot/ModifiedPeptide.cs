/*
 * ModifiedPeptide.cs
 * 
 * This file contains the ModifiedPeptide class which, when implemented represents a single peptide with modifications
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.sharprot
 * @subpackage 
 */ 
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;

namespace mpimp.sharprot
{
	/// <summary>
	/// This class represents a single peptide with modifications
	/// </summary>
	public class ModifiedPeptide : Peptide
	{
		public List<PepMod> Modifications;
		
		/// <summary>
		/// The class constructor
		/// </summary>
		public ModifiedPeptide()
		{
			this.Modifications = new List<PepMod>();
		}
		
		/// <summary>
		/// The class constructor
		/// </summary>
		/// <param name="config">The configuration object</param>
		/// <see cref="Peptide" />
		public ModifiedPeptide(Hashtable config)
		{
			this.Modifications = new List<PepMod>();
		}
		
		/// <see cref="Peptide.getIndexMass" />
		public override double getIndexMass(string weighttype, int index)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			List<PepMod> arrModifications;
			double dblAddMass = 0;
			double dblMass;
			string strAa;
			
			if (this.Sequence == "") {
				this.toLog("error", loc, "Sequence not set", "Failed to get modification for index. Sequence not set yet.", "");
				return -1;
			}
			if (index >= this.Sequence.Length) {
				this.toLog("error", loc, "Index out of bounds", "Specified index is out of sequence bounds.", "");
				return -1;
			}
			
			strAa = this.Sequence.Substring(index, 1);
			dblMass = base.getIndexMass(weighttype, index);
			arrModifications = this.getIndexModifications(index, weighttype);
			
			foreach (PepMod o in arrModifications) {
				//dblMassTemp = this.getModificationMass(objMod.accession, strAa, index, weighttype);
				dblAddMass += this.getModificationMass(o.accession, strAa, index, weighttype);
			}
			
			return dblMass+dblAddMass;
		}
	
		//###################################################################
		/**
		* Adds 15N modifications for all amino acids
		*/
		public void add15NModifications()
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string strAa;
			
			if (this.Sequence == "") {
				this.toLog("error", loc, "Sequence not set", "Failed to add 15N modifications. Sequence not set yet.", "");
				return;
			}
			
			for (int i=0; i<this.Sequence.Length; i++) {
				strAa = this.Sequence.Substring(i,1);
				this.addModification(new PepMod() {
					accession = 99000,
					index = i,
					aminoacid = strAa,
				});
			}
		}
		
		//###################################################################
		/**
		* Adds a modification to the peptide
		* @param {Object} modification The modification object with the at least the following attributes filled:
		* accession: The modifications accession number
		* position: The position of the modified amino acid starting with 0
		*/
		public void addModification(PepMod modification)
		{
			this.Modifications.Add(modification);
		}
		
		//###################################################################
		/**
		* Retrieves all modifications of an amino acid specified by index in sequence
		* @param {Number} index The index of the amino acid in sequence
		* @param {String} weighttype The weighttypeof the modification mass to retrieve
		* @return Returns an array of 
		*/
		public List<PepMod> getIndexModifications(int index, string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			List<PepMod> arrReturn = new List<PepMod>();
			string strAa;
			
			if (this.Sequence == "") {
				this.toLog("error", loc, "Sequence not set", "Failed to get modification for index. Sequence not set yet.", "");
				return null;
			}
			if (index >= this.Sequence.Length) {
				this.toLog("error", loc, "Index out of bounds", "Specified index is out of sequence bounds.", "");
				return null;
			}
			strAa = this.Sequence.Substring(index, 1);
			
			PepMod modmod;
			Modification? mod;
			List<PepMod> mods = this.Modifications.FindAll(delegate(PepMod o) { return o.index == index; });
			for (int i = 0; i < mods.Count; i++) {
				modmod = mods[i];
				mod = this.getModification(mods[i].accession);
				if (mod == null) {
					this.toLog("error", loc, "Modification error", "Accession number invalid or not available in constants file: "+mods[i].accession.ToString(), "");
					return null;
				}
				modmod.aminoacid = strAa;
				modmod.weighttype = weighttype;
				arrReturn.Add(modmod);
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
		public bool setModifiedSequence(string modifiedsequence)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string strModSeqAcc = modifiedsequence;
			string strFlag = "";
			string strRg = "";
			int numAcc = 0;
			string strTarget = "";
			
			var arrModFlags = this._modflag;
			foreach(Modflag o in this._modflag) {
				strFlag = o.flag;
				strRg = o.regexpattern;
				numAcc = o.accession;
				strTarget = o.target;
				strModSeqAcc = Regex.Replace(strModSeqAcc, strRg, "Xacc:"+numAcc.ToString()+",aa:"+strTarget+"X");
			}
			
			int intPos = strModSeqAcc.IndexOf("Xacc:");
			int intEndPos = 0;
			string strTag = "";
			strTarget = "";
			string strAcc;
			while (intPos > -1) {
				intEndPos = strModSeqAcc.IndexOf("X", intPos+3)+1;
				if (intEndPos == -1) {
					this.Modifications = new List<PepMod>(); //Cleanup
					this.toLog("error", loc, "End tag missing", "Internal parse error: Modifications end tag (X) is missing.", "");
					return false;
				}
				strTag = strModSeqAcc.Substring(intPos, intEndPos-intPos);
				strAcc = strTag.Substring(5, strTag.IndexOf(",")-5);
				if (!int.TryParse(strAcc, out numAcc)) {
			    	this.Modifications = new List<PepMod>(); //Cleanup
					this.toLog("error", loc, "Integer parsing error", "Internal parse error: Accession number could not be parsed as int.", "");
					return false;
			    }
				strTarget = strTag.Substring(strTag.IndexOf(",aa:")+4, 1);
				this.addModification(new PepMod(){
					accession = numAcc,
					index = intPos,
					aminoacid = strTarget
				});
				
				strModSeqAcc = strModSeqAcc.Replace(strTag, strTarget);
				intPos = strModSeqAcc.IndexOf("Xacc:");
			}
			
			bool blnCheck = this.validateSequence(strModSeqAcc);
			if (!blnCheck) {
				this.Modifications = new List<PepMod>(); //Cleanup
				this.toLog("error", loc, "Invalid peptide sequence", "Parse error: Validation of naked sequence failed: "+strModSeqAcc, "");
				return false;
			}
			
			this.Sequence = strModSeqAcc;
			return true;
		}
		
	}
}