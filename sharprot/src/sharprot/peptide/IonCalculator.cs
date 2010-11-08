/*
 * IonCalculator.cs
 * 
 * This file contains the IonCalculator class which provides functionality to calculate the ions as measured in masspec
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.sharprot
 * @subpackage peptide
 */ 
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;

namespace mpimp.sharprot.peptide
{
	/// <summary>
	/// The struct of a MS2 spectrum entry
	/// </summary>
	public struct Ms2Ion
	{
		public double mass;
		public string ion;
		public int index;
		public int charge;
		public string flag;
		public string custom;
	}
	
	/// <summary>
	/// The IonCalculator is a class which provides functionality to calculate the ions as measured in a masspec
	/// </summary>
	public class IonCalculator : XProtBase
	{
		private List<Ms2Ion> _tempArray1;
		private ArrayList _tempArray2;
		private List<string> _leftStartIons = new List<string>() {"a", "b", "c", "d"};
		private List<string> _rightStartIons = new List<string>() {"v", "w", "x", "y", "z"};
		
		/// <summary>
		/// The peptide object to use for ion calculation
		/// </summary>
		public Peptide peptide = null;
		
		/// <summary>
		/// The maximum charge to calculate
		/// </summary>
		public int maxcharge = 1;
		
		/// <summary>
		/// The weighttype to use for constants (either monoisotopic or average)
		/// </summary>
		public string weighttype = "monoisotopic";
		
		/// <summary>
		/// A list of neutral loss formulas to calculate the ion masses of such as H2O or NH3
		/// </summary>
		public List<string> neutralloss;
		
		/// <summary>
		/// A list of neutral gain formulas to calculate the ion masses of such as H2O
		/// </summary>
		public List<string> neutralgain;
		
		/// <summary>
		/// A template string to be filled with values. The string can contain fieldnames which will be replaced by values.
		/// e.g. "Entry for mass {mass}, ion {ion}, position {index}, charge {charge}, flag {flag}".
		/// Possible fields: mass, ion, position, charge, flag. Fields must be declared with brackets {} in the string. 
		/// </summary>
		public string customtemplate = "";
		
		/// <summary>
		/// True to return only a flat array with custom values
		/// </summary>
		public bool customonly = false;
		
		//###################################################################		
		/// <summary>
		/// Add a single ms spectrum entry to the result
		/// </summary>
		/// <param name="mass">The ion mass</param>
		/// <param name="ion">The ion</param>
		/// <param name="ionindex">The ion index</param>
		/// <param name="charge">The chargestate</param>
		/// <param name="flag">A flag for additional information such as neutral losses</param>
		private void _addToResult(double mass, string ion, int ionindex, int charge, string flag)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string strCustom = "";
			
			//Template
			if (this.customtemplate != "") {
				strCustom = this.customtemplate;
				strCustom = strCustom.Replace("{mass}", mass.ToString());
				strCustom = strCustom.Replace("{ion}", ion);
				strCustom = strCustom.Replace("{index}", ionindex.ToString());
				strCustom = strCustom.Replace("{charge}", charge.ToString());
				strCustom = strCustom.Replace("{flag}", flag);
			}
			
			//Specific
			this._tempArray1.Add(new Ms2Ion() {
				mass = mass,
				ion = ion,
				index = ionindex,
				charge = charge,
				flag = flag,
				custom = strCustom
			});
			
			//Convertible
			this._tempArray2.Add(new Hashtable() {
				{"mass",mass},
				{"ion",ion},
				{"index",ionindex},
				{"charge",charge},
				{"flag",flag},
				{"custom",strCustom},
			});
		}
		
		//###################################################################
		/// <summary>
		/// Calculates and adds the neutral loss/gain masses to result array
		/// </summary>
		/// <param name="strAa">The current amino acid</param>
		/// <param name="dblMass">The mass to add the neutral loss/gain mass to</param>
		/// <param name="ion">The ion currently calculated</param>
		/// <param name="ionindex">The current sequence index</param>
		/// <param name="charge">The current charge</param>
		/// <returns></returns>
		private bool _addNeutralLossGainMasses(string strAa, double dblMass, string ion, int ionindex, int charge)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string strFlag;
			
			double dblElH = this.getElementMass("H", this.weighttype);
			double dblElN = this.getElementMass("N", this.weighttype);
			double dblElO = this.getElementMass("O", this.weighttype);
			
			bool blnGainH2O = false;
			bool blnGainNH3 = false;
			bool blnLossNH3 = false;
			bool blnLossH2O = false;
			int i;
			int j;
			
			j=this.neutralgain.Count;
			for (i=0; i<j; i++) {
				blnGainH2O = this.neutralgain[i] == "H2O" ? true : blnGainH2O;
				blnGainNH3 = this.neutralgain[i] == "NH3" ? true : blnGainNH3;
			}
			j=this.neutralloss.Count;
			for (i=0; i<j; i++) {
				blnLossH2O = this.neutralloss[i] == "H2O" ? true : blnLossH2O;
				blnLossNH3 = this.neutralloss[i] == "NH3" ? true : blnLossNH3;
			}
			
			switch(ion){
				case "a" :
					if (blnLossNH3 == true && (strAa == "K" || strAa == "N" || strAa == "Q" || strAa == "R")) {
						dblMass =  dblMass - (dblElN + (dblElH * 3));
						strFlag = "-NH3";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					return true;
		
				case "b":
					if (blnLossNH3 == true && (strAa == "K" || strAa == "N" || strAa == "Q" || strAa == "R")) {
						dblMass =  dblMass - (dblElN + (dblElH * 3));
						strFlag = "-NH3";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					if (blnLossH2O == true && (strAa == "D" || strAa == "E" || strAa == "S" || strAa == "T")) {
						dblMass =  dblMass - (dblElO + (dblElH * 2));
						strFlag = "-H2O";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					if (blnGainH2O == true && (strAa == "H" || strAa == "K" || strAa == "N" || strAa == "R")) {
						dblMass =  dblMass + (dblElO + (dblElH * 2));
						strFlag = "+H2O";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					if(blnGainH2O == true && blnLossNH3 == true && (strAa == "K" || strAa == "N" || strAa == "R")) {
						
						dblMass = dblMass + dblElO - dblElN + dblElH;
						strFlag = "+H2O -NH3";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					return true;
		
				case "y":
					if (blnLossNH3 == true && (strAa == "K" || strAa == "N" || strAa == "Q" || strAa == "R")) {
						dblMass =  dblMass - (dblElN + (dblElH * 3));
						strFlag = "-NH3";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					if (blnLossH2O == true && (strAa == "D" || strAa == "E" || strAa == "S" || strAa == "T")) {
						dblMass =  dblMass - (dblElO + (dblElH * 2));
						strFlag = "-H2O";
						this._addToResult(dblMass, ion, ionindex, charge, strFlag);
					}
					return true;
			}
			
			return true;
		}
		
		//###################################################################
		/// <summary>
		/// Calculates the ion modifier mass
		/// </summary>
		/// <param name="strAa">The amino acid to get the ion modifier of</param>
		/// <param name="ion">The ion to retrieve the modifier mass of</param>
		/// <returns>A mass to be added/substracted to/from the amino acid mass</returns>
		private double _getIonModifierMass(string strAa, string ion)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			double dblTemp;
			
			double dblAaMass = this.getAminoAcidMass(strAa, this.weighttype);
			double dblElC = this.getElementMass("C", this.weighttype);
			double dblElH = this.getElementMass("H", this.weighttype);
			double dblElN = this.getElementMass("N", this.weighttype);
			double dblElO = this.getElementMass("O", this.weighttype);
			double dblElS = this.getElementMass("S", this.weighttype);
		
			switch(ion) {
				case "a": return (-1) * (dblElC + dblElO + dblElH);
				case "b": return (-1) * dblElH;
				case "c": return dblElN + (dblElH * 2);
				case "d":
					dblTemp = (-1) * dblAaMass;
					if (strAa == "K" || strAa == "N" || strAa == "R") {
						return dblTemp + dblElN + ((dblElC * 2) + (dblElH * 4));
					} else {
						return 0;
					}
				case "v":
					dblTemp = (-1) * dblAaMass;
					if (strAa == "H" || strAa == "K" || strAa == "N" || strAa == "R") {
						return dblTemp + (dblElC * 2) + (dblElH * 2) + dblElN + dblElO;
					} else {
						return 0;
					}
		
				case "w":
					dblTemp = (-1) * dblAaMass;
					if (strAa == "K" || strAa == "N" || strAa == "R") {
						return dblTemp + (dblElC * 3) + (dblElH * 3) + dblElO;
					} else {
						return 0;
					}
		
				case "x": return dblElC + dblElO - dblElH; 
				case "y": return dblElH;
				case "z": return (-1) * (dblElN + dblElH);
				default: break;
			}
			
			this.toLog("error", loc, "Unknown ion", "Failed to calculate the ions modifier mass. Ion ("+ion.ToString()+") unknown.", "");
			return -1;
		}
		
		//###################################################################
		/// <summary>
		/// Process a single amino acid
		/// </summary>
		/// <param name="strAa">The amino acid to process</param>
		/// <param name="dblCurrentMass">The overall mass so far</param>
		/// <param name="ion">The ion to calculate</param>
		/// <param name="ionindex">The ion index beginning with 1 no matter of left or right starting</param>
		/// <param name="index">The true zero-based index of the current amino acid</param>
		/// <returns></returns>
		public double _processAminoAcid(string strAa, double dblCurrentMass, string ion, int ionindex, int index)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			
			double dblIonModifier = 0;
			double dblMassTemp = 0;
			double dblMassBase = 0;
			int intMaxCharge = this.maxcharge;
			double dblProtonMass = this.getPhysicsMass("P", this.weighttype);
			double dblAaMass;
			
			dblAaMass = this.peptide.getIndexMass(this.weighttype, index); //Retrieves the amino acid + modifications
			dblCurrentMass += dblAaMass;
			
			dblIonModifier = this._getIonModifierMass(strAa, ion);
			if (dblIonModifier == -1) {
				this.toLog("error", loc, "Method error", "Method (this._getIonModifierMass) failed to complete successfully.", "");
				return -1;
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
				this._addToResult(dblMassTemp, ion, ionindex, i, "");
				
				//-- Neutral loss/gain masses --
				this._addNeutralLossGainMasses(strAa, dblMassTemp, ion, ionindex, i);
			}
			
			return dblAaMass;
		}
		
		//###################################################################
		/// <summary>
		/// The class constructor
		/// </summary>
		public IonCalculator()
		{
			this._tempArray1 = new List<Ms2Ion>();
			this._tempArray2 = new ArrayList();
			this.neutralgain = new List<string>();
			this.neutralloss = new List<string>();
		}
		
		//###################################################################
		/// <summary>
		/// The class constructor
		/// </summary>
		/// <param name="config">The configuration object</param>
		public IonCalculator(Hashtable config)
		{
			this.neutralgain = new List<string>();
			this.neutralloss = new List<string>();
			
			this.weighttype = config.ContainsKey("weighttype") ? config["weighttype"].ToString() : this.weighttype;
			this.customtemplate = config.ContainsKey("customtemplate") ? config["customtemplate"].ToString() : this.customtemplate;
			
			if (config.ContainsKey("peptide") && config["peptide"] is Peptide) {
				this.peptide = (Peptide)config["peptide"];
			}
			if (config.ContainsKey("maxcharge") && config["maxcharge"] is int) {
				this.maxcharge = (int)config["maxcharge"];
			}
			if (config.ContainsKey("neutralloss") && config["neutralloss"] is List<string>) {
				this.neutralloss = (List<string>)config["neutralloss"];
			}
			if (config.ContainsKey("neutralgain") && config["neutralgain"] is List<string>) {
				this.neutralgain = (List<string>)config["neutralgain"];
			}
			if (config.ContainsKey("customonly") && config["customonly"] is bool) {
				this.customonly = (bool)config["customonly"];
			}
			
			this._tempArray1 = new List<Ms2Ion>();
			this._tempArray2 = new ArrayList();
		}
		
		//###################################################################
		/**
		 * Calculate all masses for specified ion
		 * @param {String} ion The ion to calculate the masses of (a,b,c,d,v,w,x,y,z)
		 * @return An array of objects describing the ions e.g. {mass: 124.54, ion: b1, charge: 2, flag: -H2O}
		 */
		public List<Ms2Ion>calculateIon(string ion)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			
			this._tempArray1 = new List<Ms2Ion>();
			this._tempArray2 = new ArrayList();
			double dblCurrentMass = 0;
			string strAa = "";
			string strSeq = this.peptide.Sequence;
			int i;
			int j;
			
			if(this._leftStartIons.Contains(ion)) {
				dblCurrentMass = this.peptide.getNTerminusMass(this.weighttype);
				
				for(i=0,j=strSeq.Length-1; i<j; i++) {
					strAa = strSeq.Substring(i,1);
					dblCurrentMass += this._processAminoAcid(strAa, dblCurrentMass, ion, i+1, i);
				}
			}
			
			if(this._rightStartIons.Contains(ion)) {
				dblCurrentMass = this.peptide.getCTerminusMass(this.weighttype);
				
				for(i=strSeq.Length-1; i>0; i--) {
					strAa = strSeq.Substring(i,1);
					dblCurrentMass += this._processAminoAcid(strAa, dblCurrentMass, ion, strSeq.Length-i, i);
				}
			}
			
			return this._tempArray1;
		}
		
		
		
	}
}
